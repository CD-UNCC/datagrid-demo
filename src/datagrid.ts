import {autoinject, bindable, children, Container, noView, processContent, View, ViewCompiler, ViewResources, ViewSlot} from "aurelia-framework";
import {autobind, throttle} from "core-decorators";
import {CssAnimator} from "aurelia-animator-css";
import {Deferred} from "./util/deferred";
import {attachView} from "./util/templating";

/**
 * The datagrid component can be used to display complex datasets. Specify the
 * columns to display using <column> tags.
 * Example:
 *
 *   <datagrid rows.bind="myDataset">
 *     <column field="name"></column>
 *     <column field="comments" sortable="false">
 *       ${row.comments | newlines}
 *     </column>
 *     <column field="customer reference"></column>
 *     <column field="deadline" searchable="false" sorter.bind="myDateSorter">
 *   </datagrid>
 *
 * See the @bindable properties on the Datagrid and Column classes for all
 * available configuration options.
 */
@autoinject
export class Datagrid {

	/**
	 * Defines the locale to use for sorting strings, defaults to browser default.
	 */
	public static LOCALE: string;

	/**
	 * Defines the maximum number of rows to display in 'static mode'. In static
	 * mode all rows are displayed without scrolling and there is no searching.
	 */
	private static MAX_ROWS_IN_STATIC_MODE = 10;

	@children("column")
	public columns: Column[] = [];

	/**
	 * The data to display, given as rows of simple objects.
	 */
	@bindable
	public rows: any[];

	/**
	 * Set to false to disable sorting in the entire datagrid. You can also
	 * disable sorting for individual columns: see Column.sortable.
	 */
	@bindable
	public sortable = true;

	/**
	 * Column to sort on when the grid is first rendered, identified by field.
	 * If not set the first sortable column will be used to sort.
	 */
	@bindable
	public defaultSortColumn: string;

	/**
	 * Order to sort in when the grid is first rendered.
	 */
	@bindable
	public defaultSortOrder: "asc" | "desc" = "asc";

	/**
	 * Set to false to disable searching for this datagrid.
	 */
	@bindable
	public searchable = true;

	/**
	 * Text to use as placeholder in searchbox.
	 */
	@bindable
	public searchInputPlaceholder: string = "";

	/**
	 * Set to false to disable animation when first showing the datagrid.
	 */
	@bindable
	public animate = true;

	/**
	 * You can use this in your cell templates to reference the binding context
	 * in which the datagrid is used.
	 */
	public parent: any;

	public searchTerm: string = "";
	public searchResults: any[];

	public rowsSortable = false;
	public sortColumn: Column;
	public sortOrder: "asc" | "desc";

	public showFooter = false;

	public rendered = false;

	private staticMode = true;

	public bodyElement: HTMLElement;
	private body = {
		scrollListener: <EventListener>null,
		borderHeight: <number>null,
		viewSlot: new Deferred<ViewSlot>(),
		viewAttached: new Deferred<void>()
	};

	public headerElement: HTMLElement;
	private header = {
		viewSlot: new Deferred<ViewSlot>()
	};

	public footerElement: HTMLElement;
	private footer = {
		viewSlot: new Deferred<ViewSlot>()
	};

	constructor(private animator: CssAnimator, private container: Container,
		private element: Element, private viewCompiler: ViewCompiler,
		private viewResources: ViewResources) {
	}

	private bind(bindingContext: any) {
		this.parent = bindingContext;

		if (this.rows !== undefined) {
			this.rowsChanged();
		}
		/* TODO: Workaround until aurelia-binding issue #347 is resolved. */
		if (typeof this.animate === "string") {
			this.animate = (<any>this.animate).toLowerCase() === "false" ? false : true;
		}
		if (typeof this.searchable === "string") {
			this.searchable = (<any>this.searchable).toLowerCase() === "false" ? false : true;
		}
		if (typeof this.sortable === "string") {
			this.sortable = (<any>this.sortable).toLowerCase() === "false" ? false : true;
		}
	}

	private attached() {
		this.body.viewSlot.resolve(new ViewSlot(this.bodyElement, true));
		this.header.viewSlot.resolve(new ViewSlot(this.headerElement, true));
		this.footer.viewSlot.resolve(new ViewSlot(this.footerElement, true));
	}

	private columnsChanged() {
		let waitForColumnBindings = this.columns.reduce(
			(promise, column) => <any>promise.then(<any>column.waitForBinding()),
			Promise.resolve()
		);
		waitForColumnBindings.then(() => {
			this.processColumns();
			this.columns.forEach(column => column.element.addEventListener("update", this.processColumns.bind(this)));
		});
	}

	private rowsChanged() {
		this.body.viewAttached.promise.then(() => this.refresh());
	}

	private refresh() {
		this.staticMode = this.rows.length <= Datagrid.MAX_ROWS_IN_STATIC_MODE;

		this.searchResults = this.rows;

		this.rowsSortable = (this.sortable && this.rows.length > 1);
		if (this.rowsSortable) {
			if (!this.sortColumn) {
				if (this.defaultSortColumn) {
					this.sortColumn = this.columns.find(column => column.field && column.field.indexOf(this.defaultSortColumn) !== -1);
				} else {
					this.sortColumn = this.columns.find(column => column.sortable);
				}
				if (this.sortColumn) {
					this.sortOrder = this.defaultSortOrder;
					this.sortColumn.sortedOrder = this.sortOrder;
				}
			}
			if (this.sortColumn) {
				this.sort();
			}
		}

		let innerWrapper = <HTMLElement>this.element.querySelector(".inner-wrapper");
		innerWrapper.classList.remove("quarter", "half", "threequarters", "full", "overflowing")
		if (this.rows.length <= Datagrid.MAX_ROWS_IN_STATIC_MODE / 4) {
			innerWrapper.classList.add("quarter");
		} else if (this.rows.length <= Datagrid.MAX_ROWS_IN_STATIC_MODE / 2) {
			innerWrapper.classList.add("half");
		} else if (this.rows.length <= Datagrid.MAX_ROWS_IN_STATIC_MODE * 3 / 5) {
			innerWrapper.classList.add("threequarters");
		} else {
			innerWrapper.classList.add("full");
			if (this.rows.length > Datagrid.MAX_ROWS_IN_STATIC_MODE) {
				innerWrapper.classList.add("overflowing");
			}
		}

		if (!this.staticMode) {
			if (this.body.scrollListener) {
				this.bodyElement.removeEventListener("scroll", this.body.scrollListener);
			}
			this.bodyElement.scrollTop = 0;
			this.bodyElement.classList.add("scrollable-bottom");
			this.body.scrollListener = this.onBodyScroll;
			this.bodyElement.addEventListener("scroll", this.body.scrollListener);
		}

		if (this.animate && !innerWrapper.classList.contains("au-entered") && !innerWrapper.classList.contains("au-enter") ) {
			/* Opening-animation on next tick */
			setTimeout(() => this.animator.enter(innerWrapper).then(() => this.rendered = true));
		} else {
			this.rendered = true;
		}
	}

	@autobind
	@throttle(100)
	private onBodyScroll() {
		if (this.body.borderHeight === null) {
			this.body.borderHeight = 0;
			let styles = getComputedStyle(this.bodyElement);
			this.body.borderHeight += parseInt(styles.borderTopWidth, 10);
			this.body.borderHeight += parseInt(styles.borderBottomWidth, 10);
		}

		let scrollBottom = this.bodyElement.scrollHeight - this.bodyElement.offsetHeight + this.body.borderHeight;

		if (scrollBottom === 0) {
			this.bodyElement.classList.remove("scrollable-top");
			this.bodyElement.classList.remove("scrollable-bottom");
			return;
		}

		if (this.bodyElement.scrollTop === 0) {
			this.bodyElement.classList.remove("scrollable-top");
		} else {
			this.bodyElement.classList.add("scrollable-top");
		}
		if (this.bodyElement.scrollTop === scrollBottom) {
			this.bodyElement.classList.remove("scrollable-bottom");
		} else {
			this.bodyElement.classList.add("scrollable-bottom");
		}
	}

	onColumnHeaderClick(column: Column) {
		if (!column.sortable || !this.rowsSortable) {
			return;
		}

		if (column === this.sortColumn) {
			this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
		} else {
			this.sortColumn.sortedOrder = null;
			this.sortColumn = column;
			this.sortOrder = "asc";
		}
		this.sortColumn.sortedOrder = this.sortOrder;
		this.sort();
	}

	search() {
		if (!this.searchable) {
			return;
		}

		let term = this.searchTerm.trim(),
			termLower = term.toLowerCase();

		this.searchResults = !term ? this.rows : this.rows.filter(row => {
			return this.columns.some(column => {
				if (!column.searchable) {
					return false;
				}
				let values = column.field.map(veld => row[veld]);
				if (column.matcher) {
					return column.matcher.bind(this.parent)(term, values);
				}
				for (let i in values) {
					let value = String(values[i]);
					if (value.toLowerCase().indexOf(termLower) !== -1) {
						return true;
					}
				}
				return false;
			});
		});

		if (!this.staticMode) {
			/* Wait for body update */
			setTimeout(this.onBodyScroll, 1);
		}
	}

	private sort() {
		let sorter: (aWaardes: any[], bWaardes: any[]) => number = this.sortColumn.sorter;
		if (sorter) {
			sorter = sorter.bind(this.parent);
		} else {
			sorter = (aValues: any[], bValues: any[]) => {
				for (let i in aValues) {
					/* Sort empty values to top */
					if (aValues[i] === undefined && bValues[i] !== undefined) {
						return -1;
					} else if (bValues[i] === undefined && aValues[i] !== undefined) {
						return 1;
					}
					if (typeof aValues[i] === "string") {
						let comp = aValues[i].localeCompare(bValues[i], Datagrid.LOCALE);
						if (comp != 0) {
							return comp;
						}
					} else if (aValues[i] != bValues[i]) {
						return aValues[i] < bValues[i] ? -1 : 1;
					}
				}
				return 0;
			}
		}
		let fields = this.sortColumn.field;
		let order = this.sortOrder === "asc" ? 1 : -1;
		this.searchResults.sort((aRow: any, bRow: any) => {
			let aValues = fields.map(field => aRow[field]);
			let bValues = fields.map(field => bRow[field]);
			return sorter(aValues, bValues) * order;
		});
	}

	private processColumns() {
		if (this.columns.length > 0 && this.columns[0].rowHeader !== false
			&& !this.columns.some(column => column.rowHeader)) {
			this.columns[0].rowHeader = true;
		}

		this.compileRowTemplate();
		this.compileHeaderTemplate();

		this.showFooter = this.columns.some(column => column.footer !== undefined && column.footer.trim().length > 0);
		if (this.showFooter) {
			this.compileFooterTemplate();
		}
	}

	private compileRowTemplate() {
		let row = document.createElement("tr");
		row.setAttribute("repeat.for", "row of searchResults");
		let view = this.columnsToView((column: Column, index: number) => {
			const el = column.rowHeader ? "th" : "td";
			return `<${el} class.bind="columns[${index}].cellClass">${column.cellTemplate}</${el}>`;
		}, row);

		this.body.viewSlot.promise.then((viewSlot) => {
			attachView(view, viewSlot).then(() => {
				if (!this.body.viewAttached.isResolved()) {
					this.body.viewAttached.resolve();
				}
			});
		});
	}

	private compileHeaderTemplate() {
		let view = this.columnsToView((column: Column, index: number) => {
			return `<th class="\${columns[${index}].headerClass} \${columns[${index}].sortable && rowsSortable ? 'sortable' : ''} \${columns[${index}].sortedOrder && rowsSortable ? 'sorted ' + columns[${index}].sortedOrder : ''}"
				click.trigger="onColumnHeaderClick(columns[${index}])">
				${column.header || ''}
				<svg if.bind="columns[${index}].sortable && rowsSortable" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792">
					<path d="M1408 704q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"/>
					<path d="M1408 1088q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"/>
				</svg>
			</th>`;
		});
		this.header.viewSlot.promise.then((viewSlot) => attachView(view, viewSlot));
	}

	private compileFooterTemplate() {
		let view = this.columnsToView((column: Column, index: number) => {
			return `<td class="\${columns[${index}].footerClass} \${columns[${index}].sortable && rowsSortable ? 'sortable' : ''} \${columns[${index}].sortedOrder && rowsSortable ? 'sorted ' + columns[${index}].sortedOrder : ''}">
				${column.footer || ''}
			</td>`;
		});

		this.footer.viewSlot.promise.then((viewSlot) => attachView(view, viewSlot));
	}

	private columnsToView(templateMapper: (column: Column, index: number) => string, row?: HTMLElement): View {
		if (!row) {
			row = document.createElement("tr");
		}
		row.innerHTML = this.columns.map((column, index) => templateMapper(column, index)).join("\n");

		let template = document.createDocumentFragment();
		template.appendChild(row);
		let view = this.viewCompiler.compile(template, this.viewResources).create(this.container);
		view.bind(this);

		return view;
	}
}

@autoinject
@noView
@processContent(false)
export class Column {

	/**
	 * The header to display above this column. This can be set by binding or by
	 * placing a <header> tag in the <column> content. If both are defined, the
	 * bound value is used.
	 */
	@bindable
	public header: string;

	/**
	 * CSS class for the column header. May be set by binding or as a 'class'
	 * attribute on the <header> tag. If both are defined, the bound value is
	 * used.
	 */
	@bindable
	public headerClass: string;

	/**
	 * Optional footer to display beneath the column. This can be set by binding
	 * or by placing a <footer> tag in the <column> content. If both are
	 * defined, the bound value is used.
	 */
	@bindable
	public footer: string;

	/**
	 * CSS class for the column footer. May be set by binding or as a 'class'
	 * attribute on the <footer> tag. If both are defined, the bound value is
	 * used.
	 */
	@bindable
	public footerClass: string;

	/**
	 * CSS class for all cells in this column.
	 */
	@bindable
	public cellClass: string;

	/**
	 * The row property or properties to show in this column. Multiple fields
	 * can be separated with spaces. If no fields are supplied, the column can't
	 * be searched or sorted, and by default will have an empty template.
	 */
	@bindable
	public field: string[];

	/**
	 * Indicates that the cells in this column are the row headers. If no column
	 * is marked as the row header, then the first column will be used as row
	 * header unless you explicitly mark it <code>row-header="false"</code>.
	 */
	@bindable
	public rowHeader: boolean;

	/**
	 * Set to false to exclude data in this column from searches.
	 */
	@bindable
	public searchable = true;

	/**
	 * Custom matcher to search data in this column for a search term. The
	 * matcher will be called for each row with the (raw) search term and the
	 * values of the row for each field in order. See Column.field.
	 */
	@bindable
	public matcher: (term: string, waardes: any[]) => boolean;

	/**
	 * Set to false to disable sorting for this column.
	 */
	@bindable
	public sortable = true;

	/**
	 * Custom sorter to sort data in this column in ascending order. The sorter
	 * is called with two arrays of equal length, containing for two rows the
	 * values for this column's fields. See Column.field. The sorter should
	 * return a negative number to indicate that the first row is sorted before
	 * the second, a positive number to indicate that the second row is sorted
	 * before the first, or zero not to change the sort order of both rows.
	 */
	@bindable
	public sorter: (aValues: any[], bValues: any[]) => number;

	/**
	 * The template used to render each cell in this column. By default each of
	 * this column's fields will be rendered this way:
	 *
	 *   <span field="[$field]">row[$field]</span>
	 *
	 * where `$field` is the rendered field.
	 *
	 * To override this template, define a template in the <column> contents.
	 * Within cell templates the active row is bound to `row` and the binding
	 * context within which the datagrid is placed is bound to `parent`.
	 */
	public cellTemplate: string;

	public sortedOrder: string;

	private bound = new Deferred<void>();

	constructor(public element: Element) {
		let header = this.element.querySelector("header");
		if (header) {
			this.header = header.innerHTML;
			this.headerClass = header.className;
			header.remove();
		}
		let footer = this.element.querySelector("footer");
		if (footer) {
			this.footer = footer.innerHTML;
			this.footerClass = footer.className;
			footer.remove();
		}

		this.cellTemplate = this.element.innerHTML;
		this.element.innerHTML = "";
	}

	private bind() {
		/* TODO: Workaround until aurelia/binding issue #347 is resolved. */
		if (typeof this.field === "string") {
			this.field = (<any>this.field).split(" ");
		}
		if (typeof this.rowHeader === "string") {
			this.rowHeader = (<any>this.rowHeader).toLowerCase() === "true";
		}
		if (typeof this.searchable === "string") {
			this.searchable = (<any>this.searchable).toLowerCase() === "true";
		}
		if (typeof this.sortable === "string") {
			this.sortable = (<any>this.sortable).toLowerCase() === "true";
		}

		if (this.field && (!this.cellTemplate || !this.cellTemplate.trim())) {
			this.cellTemplate = "";
			this.field.forEach(field => {
				this.cellTemplate += `<span field="${field}">\${row.${field}}`;
			});
		}
		if (!this.field) {
			this.searchable = false;
			this.sortable = false;
		}
		this.bound.resolve();
	}

	propertyChanged() {
		if (this.bound.isResolved()) {
			this.element.dispatchEvent(new CustomEvent("update"));
		}
	}

	waitForBinding() {
		return this.bound.promise;
	}
}
