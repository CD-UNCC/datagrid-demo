var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "core-decorators", "aurelia-animator-css", "./util/deferred", "./util/templating"], function (require, exports, aurelia_framework_1, core_decorators_1, aurelia_animator_css_1, deferred_1, templating_1) {
    "use strict";
    var Datagrid = (function () {
        function Datagrid(animator, container, element, viewCompiler, viewResources) {
            this.animator = animator;
            this.container = container;
            this.element = element;
            this.viewCompiler = viewCompiler;
            this.viewResources = viewResources;
            this.columns = [];
            this.sortable = true;
            this.defaultSortOrder = "asc";
            this.searchable = true;
            this.searchInputPlaceholder = "";
            this.animate = true;
            this.searchTerm = "";
            this.rowsSortable = false;
            this.showFooter = false;
            this.rendered = false;
            this.staticMode = true;
            this.body = {
                scrollListener: null,
                borderHeight: null,
                viewSlot: new deferred_1.Deferred(),
                viewAttached: new deferred_1.Deferred()
            };
            this.header = {
                viewSlot: new deferred_1.Deferred()
            };
            this.footer = {
                viewSlot: new deferred_1.Deferred()
            };
        }
        Datagrid.prototype.bind = function (bindingContext) {
            this.parent = bindingContext;
            if (this.rows !== undefined) {
                this.rowsChanged();
            }
            if (typeof this.animate === "string") {
                this.animate = this.animate.toLowerCase() === "false" ? false : true;
            }
            if (typeof this.searchable === "string") {
                this.searchable = this.searchable.toLowerCase() === "false" ? false : true;
            }
            if (typeof this.sortable === "string") {
                this.sortable = this.sortable.toLowerCase() === "false" ? false : true;
            }
        };
        Datagrid.prototype.attached = function () {
            this.body.viewSlot.resolve(new aurelia_framework_1.ViewSlot(this.bodyElement, true));
            this.header.viewSlot.resolve(new aurelia_framework_1.ViewSlot(this.headerElement, true));
            this.footer.viewSlot.resolve(new aurelia_framework_1.ViewSlot(this.footerElement, true));
        };
        Datagrid.prototype.columnsChanged = function () {
            var _this = this;
            var waitForColumnBindings = this.columns.reduce(function (promise, column) { return promise.then(column.waitForBinding()); }, Promise.resolve());
            waitForColumnBindings.then(function () {
                _this.processColumns();
                _this.columns.forEach(function (column) { return column.element.addEventListener("update", _this.processColumns.bind(_this)); });
            });
        };
        Datagrid.prototype.rowsChanged = function () {
            var _this = this;
            this.body.viewAttached.promise.then(function () { return _this.refresh(); });
        };
        Datagrid.prototype.refresh = function () {
            var _this = this;
            this.staticMode = this.rows.length <= Datagrid.MAX_ROWS_IN_STATIC_MODE;
            this.searchResults = this.rows;
            this.rowsSortable = (this.sortable && this.rows.length > 1);
            if (this.rowsSortable) {
                if (!this.sortColumn) {
                    if (this.defaultSortColumn) {
                        this.sortColumn = this.columns.find(function (column) { return column.field && column.field.indexOf(_this.defaultSortColumn) !== -1; });
                    }
                    else {
                        this.sortColumn = this.columns.find(function (column) { return column.sortable; });
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
            var innerWrapper = this.element.querySelector(".inner-wrapper");
            innerWrapper.classList.remove("quarter", "half", "threequarters", "full", "overflowing");
            if (this.rows.length <= Datagrid.MAX_ROWS_IN_STATIC_MODE / 4) {
                innerWrapper.classList.add("quarter");
            }
            else if (this.rows.length <= Datagrid.MAX_ROWS_IN_STATIC_MODE / 2) {
                innerWrapper.classList.add("half");
            }
            else if (this.rows.length <= Datagrid.MAX_ROWS_IN_STATIC_MODE * 3 / 5) {
                innerWrapper.classList.add("threequarters");
            }
            else {
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
            if (this.animate && !innerWrapper.classList.contains("au-entered") && !innerWrapper.classList.contains("au-enter")) {
                setTimeout(function () { return _this.animator.enter(innerWrapper).then(function () { return _this.rendered = true; }); });
            }
            else {
                this.rendered = true;
            }
        };
        Datagrid.prototype.onBodyScroll = function () {
            if (this.body.borderHeight === null) {
                this.body.borderHeight = 0;
                var styles = getComputedStyle(this.bodyElement);
                this.body.borderHeight += parseInt(styles.borderTopWidth, 10);
                this.body.borderHeight += parseInt(styles.borderBottomWidth, 10);
            }
            var scrollBottom = this.bodyElement.scrollHeight - this.bodyElement.offsetHeight + this.body.borderHeight;
            if (scrollBottom === 0) {
                this.bodyElement.classList.remove("scrollable-top");
                this.bodyElement.classList.remove("scrollable-bottom");
                return;
            }
            if (this.bodyElement.scrollTop === 0) {
                this.bodyElement.classList.remove("scrollable-top");
            }
            else {
                this.bodyElement.classList.add("scrollable-top");
            }
            if (this.bodyElement.scrollTop === scrollBottom) {
                this.bodyElement.classList.remove("scrollable-bottom");
            }
            else {
                this.bodyElement.classList.add("scrollable-bottom");
            }
        };
        Datagrid.prototype.onColumnHeaderClick = function (column) {
            if (!column.sortable || !this.rowsSortable) {
                return;
            }
            if (column === this.sortColumn) {
                this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
            }
            else {
                this.sortColumn.sortedOrder = null;
                this.sortColumn = column;
                this.sortOrder = "asc";
            }
            this.sortColumn.sortedOrder = this.sortOrder;
            this.sort();
        };
        Datagrid.prototype.search = function () {
            var _this = this;
            if (!this.searchable) {
                return;
            }
            var term = this.searchTerm.trim(), termLower = term.toLowerCase();
            this.searchResults = !term ? this.rows : this.rows.filter(function (row) {
                return _this.columns.some(function (column) {
                    if (!column.searchable) {
                        return false;
                    }
                    var values = column.field.map(function (veld) { return row[veld]; });
                    if (column.matcher) {
                        return column.matcher.bind(_this.parent)(term, values);
                    }
                    for (var i in values) {
                        var value = String(values[i]);
                        if (value.toLowerCase().indexOf(termLower) !== -1) {
                            return true;
                        }
                    }
                    return false;
                });
            });
            if (!this.staticMode) {
                setTimeout(this.onBodyScroll, 1);
            }
        };
        Datagrid.prototype.sort = function () {
            var sorter = this.sortColumn.sorter;
            if (sorter) {
                sorter = sorter.bind(this.parent);
            }
            else {
                sorter = function (aValues, bValues) {
                    for (var i in aValues) {
                        if (aValues[i] === undefined && bValues[i] !== undefined) {
                            return -1;
                        }
                        else if (bValues[i] === undefined && aValues[i] !== undefined) {
                            return 1;
                        }
                        if (typeof aValues[i] === "string") {
                            var comp = aValues[i].localeCompare(bValues[i], Datagrid.LOCALE);
                            if (comp != 0) {
                                return comp;
                            }
                        }
                        else if (aValues[i] != bValues[i]) {
                            return aValues[i] < bValues[i] ? -1 : 1;
                        }
                    }
                    return 0;
                };
            }
            var fields = this.sortColumn.field;
            var order = this.sortOrder === "asc" ? 1 : -1;
            this.searchResults.sort(function (aRow, bRow) {
                var aValues = fields.map(function (field) { return aRow[field]; });
                var bValues = fields.map(function (field) { return bRow[field]; });
                return sorter(aValues, bValues) * order;
            });
        };
        Datagrid.prototype.processColumns = function () {
            if (this.columns.length > 0 && this.columns[0].rowHeader !== false
                && !this.columns.some(function (column) { return column.rowHeader; })) {
                this.columns[0].rowHeader = true;
            }
            this.compileRowTemplate();
            this.compileHeaderTemplate();
            this.showFooter = this.columns.some(function (column) { return column.footer !== undefined && column.footer.trim().length > 0; });
            if (this.showFooter) {
                this.compileFooterTemplate();
            }
        };
        Datagrid.prototype.compileRowTemplate = function () {
            var _this = this;
            var row = document.createElement("tr");
            row.setAttribute("repeat.for", "row of searchResults");
            var view = this.columnsToView(function (column, index) {
                var el = column.rowHeader ? "th" : "td";
                return "<" + el + " class.bind=\"columns[" + index + "].cellClass\">" + column.cellTemplate + "</" + el + ">";
            }, row);
            this.body.viewSlot.promise.then(function (viewSlot) {
                templating_1.attachView(view, viewSlot).then(function () {
                    if (!_this.body.viewAttached.isResolved()) {
                        _this.body.viewAttached.resolve();
                    }
                });
            });
        };
        Datagrid.prototype.compileHeaderTemplate = function () {
            var view = this.columnsToView(function (column, index) {
                return "<th class=\"${columns[" + index + "].headerClass} ${columns[" + index + "].sortable && rowsSortable ? 'sortable' : ''} ${columns[" + index + "].sortedOrder && rowsSortable ? 'sorted ' + columns[" + index + "].sortedOrder : ''}\"\n\t\t\t\tclick.trigger=\"onColumnHeaderClick(columns[" + index + "])\">\n\t\t\t\t" + (column.header || '') + "\n\t\t\t\t<svg if.bind=\"columns[" + index + "].sortable && rowsSortable\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1792 1792\">\n\t\t\t\t\t<path d=\"M1408 704q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z\"/>\n\t\t\t\t\t<path d=\"M1408 1088q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z\"/>\n\t\t\t\t</svg>\n\t\t\t</th>";
            });
            this.header.viewSlot.promise.then(function (viewSlot) { return templating_1.attachView(view, viewSlot); });
        };
        Datagrid.prototype.compileFooterTemplate = function () {
            var view = this.columnsToView(function (column, index) {
                return "<td class=\"${columns[" + index + "].footerClass} ${columns[" + index + "].sortable && rowsSortable ? 'sortable' : ''} ${columns[" + index + "].sortedOrder && rowsSortable ? 'sorted ' + columns[" + index + "].sortedOrder : ''}\">\n\t\t\t\t" + (column.footer || '') + "\n\t\t\t</td>";
            });
            this.footer.viewSlot.promise.then(function (viewSlot) { return templating_1.attachView(view, viewSlot); });
        };
        Datagrid.prototype.columnsToView = function (templateMapper, row) {
            if (!row) {
                row = document.createElement("tr");
            }
            row.innerHTML = this.columns.map(function (column, index) { return templateMapper(column, index); }).join("\n");
            var template = document.createDocumentFragment();
            template.appendChild(row);
            var view = this.viewCompiler.compile(template, this.viewResources).create(this.container);
            view.bind(this);
            return view;
        };
        Datagrid.MAX_ROWS_IN_STATIC_MODE = 10;
        __decorate([
            aurelia_framework_1.children("column"), 
            __metadata('design:type', Array)
        ], Datagrid.prototype, "columns", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Array)
        ], Datagrid.prototype, "rows", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], Datagrid.prototype, "sortable", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], Datagrid.prototype, "defaultSortColumn", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], Datagrid.prototype, "defaultSortOrder", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], Datagrid.prototype, "searchable", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], Datagrid.prototype, "searchInputPlaceholder", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], Datagrid.prototype, "animate", void 0);
        __decorate([
            core_decorators_1.autobind,
            core_decorators_1.throttle(100), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], Datagrid.prototype, "onBodyScroll", null);
        Datagrid = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [aurelia_animator_css_1.CssAnimator, aurelia_framework_1.Container, Element, aurelia_framework_1.ViewCompiler, aurelia_framework_1.ViewResources])
        ], Datagrid);
        return Datagrid;
    }());
    exports.Datagrid = Datagrid;
    var Column = (function () {
        function Column(element) {
            this.element = element;
            this.searchable = true;
            this.sortable = true;
            this.bound = new deferred_1.Deferred();
            var header = this.element.querySelector("header");
            if (header) {
                this.header = header.innerHTML;
                this.headerClass = header.className;
                header.remove();
            }
            var footer = this.element.querySelector("footer");
            if (footer) {
                this.footer = footer.innerHTML;
                this.footerClass = footer.className;
                footer.remove();
            }
            this.cellTemplate = this.element.innerHTML;
            this.element.innerHTML = "";
        }
        Column.prototype.bind = function () {
            var _this = this;
            if (typeof this.field === "string") {
                this.field = this.field.split(" ");
            }
            if (typeof this.rowHeader === "string") {
                this.rowHeader = this.rowHeader.toLowerCase() === "true";
            }
            if (typeof this.searchable === "string") {
                this.searchable = this.searchable.toLowerCase() === "true";
            }
            if (typeof this.sortable === "string") {
                this.sortable = this.sortable.toLowerCase() === "true";
            }
            if (this.field && (!this.cellTemplate || !this.cellTemplate.trim())) {
                this.cellTemplate = "";
                this.field.forEach(function (field) {
                    _this.cellTemplate += "<span field=\"" + field + "\">${row." + field + "}";
                });
            }
            if (!this.field) {
                this.searchable = false;
                this.sortable = false;
            }
            this.bound.resolve();
        };
        Column.prototype.propertyChanged = function () {
            if (this.bound.isResolved()) {
                this.element.dispatchEvent(new CustomEvent("update"));
            }
        };
        Column.prototype.waitForBinding = function () {
            return this.bound.promise;
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], Column.prototype, "header", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], Column.prototype, "headerClass", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], Column.prototype, "footer", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], Column.prototype, "footerClass", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], Column.prototype, "cellClass", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Array)
        ], Column.prototype, "field", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Boolean)
        ], Column.prototype, "rowHeader", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], Column.prototype, "searchable", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Function)
        ], Column.prototype, "matcher", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], Column.prototype, "sortable", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Function)
        ], Column.prototype, "sorter", void 0);
        Column = __decorate([
            aurelia_framework_1.autoinject,
            aurelia_framework_1.noView,
            aurelia_framework_1.processContent(false), 
            __metadata('design:paramtypes', [Element])
        ], Column);
        return Column;
    }());
    exports.Column = Column;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBd0JBO1FBaUdDLGtCQUFvQixRQUFxQixFQUFVLFNBQW9CLEVBQzlELE9BQWdCLEVBQVUsWUFBMEIsRUFDcEQsYUFBNEI7WUFGakIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtZQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7WUFDOUQsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1lBQ3BELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBckY5QixZQUFPLEdBQWEsRUFBRSxDQUFDO1lBYXZCLGFBQVEsR0FBRyxJQUFJLENBQUM7WUFhaEIscUJBQWdCLEdBQW1CLEtBQUssQ0FBQztZQU16QyxlQUFVLEdBQUcsSUFBSSxDQUFDO1lBTWxCLDJCQUFzQixHQUFXLEVBQUUsQ0FBQztZQU1wQyxZQUFPLEdBQUcsSUFBSSxDQUFDO1lBUWYsZUFBVSxHQUFXLEVBQUUsQ0FBQztZQUd4QixpQkFBWSxHQUFHLEtBQUssQ0FBQztZQUlyQixlQUFVLEdBQUcsS0FBSyxDQUFDO1lBRW5CLGFBQVEsR0FBRyxLQUFLLENBQUM7WUFFaEIsZUFBVSxHQUFHLElBQUksQ0FBQztZQUdsQixTQUFJLEdBQUc7Z0JBQ2QsY0FBYyxFQUFpQixJQUFJO2dCQUNuQyxZQUFZLEVBQVUsSUFBSTtnQkFDMUIsUUFBUSxFQUFFLElBQUksbUJBQVEsRUFBWTtnQkFDbEMsWUFBWSxFQUFFLElBQUksbUJBQVEsRUFBUTthQUNsQyxDQUFDO1lBR00sV0FBTSxHQUFHO2dCQUNoQixRQUFRLEVBQUUsSUFBSSxtQkFBUSxFQUFZO2FBQ2xDLENBQUM7WUFHTSxXQUFNLEdBQUc7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJLG1CQUFRLEVBQVk7YUFDbEMsQ0FBQztRQUtGLENBQUM7UUFFTyx1QkFBSSxHQUFaLFVBQWEsY0FBbUI7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFTLElBQUksQ0FBQyxPQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDN0UsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFTLElBQUksQ0FBQyxVQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbkYsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxRQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDL0UsQ0FBQztRQUNGLENBQUM7UUFFTywyQkFBUSxHQUFoQjtZQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDRCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDRCQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDRCQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFTyxpQ0FBYyxHQUF0QjtZQUFBLGlCQVNDO1lBUkEsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDOUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxJQUFLLE9BQUssT0FBTyxDQUFDLElBQUksQ0FBTSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBL0MsQ0FBK0MsRUFDcEUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUNqQixDQUFDO1lBQ0YscUJBQXFCLENBQUMsSUFBSSxDQUFDO2dCQUMxQixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsRUFBekUsQ0FBeUUsQ0FBQyxDQUFDO1lBQzNHLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVPLDhCQUFXLEdBQW5CO1lBQUEsaUJBRUM7WUFEQSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFFLEVBQWQsQ0FBYyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVPLDBCQUFPLEdBQWY7WUFBQSxpQkFzREM7WUFyREEsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsdUJBQXVCLENBQUM7WUFFdkUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRS9CLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBbkUsQ0FBbUUsQ0FBQyxDQUFDO29CQUNwSCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxFQUFmLENBQWUsQ0FBQyxDQUFDO29CQUNoRSxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDOUMsQ0FBQztnQkFDRixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNyQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsQ0FBQztZQUNGLENBQUM7WUFFRCxJQUFJLFlBQVksR0FBZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM3RSxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUE7WUFDeEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLHVCQUF1QixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RSxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7b0JBQ3pELFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO1lBQ0YsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztnQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXJILFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBcEIsQ0FBb0IsQ0FBQyxFQUFsRSxDQUFrRSxDQUFDLENBQUM7WUFDdEYsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7UUFDRixDQUFDO1FBSU8sK0JBQVksR0FBcEI7WUFDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQzNCLElBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRTFHLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sQ0FBQztZQUNSLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbEQsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0YsQ0FBQztRQUVELHNDQUFtQixHQUFuQixVQUFvQixNQUFjO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUM7WUFDUixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDNUQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNiLENBQUM7UUFFRCx5QkFBTSxHQUFOO1lBQUEsaUJBK0JDO1lBOUJBLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQztZQUNSLENBQUM7WUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUNoQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRWhDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUc7Z0JBQzVELE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07b0JBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2QsQ0FBQztvQkFDRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBVCxDQUFTLENBQUMsQ0FBQztvQkFDakQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUN2RCxDQUFDO29CQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2IsQ0FBQztvQkFDRixDQUFDO29CQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBRXRCLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7UUFDRixDQUFDO1FBRU8sdUJBQUksR0FBWjtZQUNDLElBQUksTUFBTSxHQUFpRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUNsRixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNaLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsTUFBTSxHQUFHLFVBQUMsT0FBYyxFQUFFLE9BQWM7b0JBQ3ZDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBRXZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7NEJBQzFELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUNqRSxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNqRSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDZixNQUFNLENBQUMsSUFBSSxDQUFDOzRCQUNiLENBQUM7d0JBQ0YsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDekMsQ0FBQztvQkFDRixDQUFDO29CQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsQ0FBQyxDQUFBO1lBQ0YsQ0FBQztZQUNELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQVMsRUFBRSxJQUFTO2dCQUM1QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRU8saUNBQWMsR0FBdEI7WUFDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssS0FBSzttQkFDOUQsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxTQUFTLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNsQyxDQUFDO1lBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFFN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBOUQsQ0FBOEQsQ0FBQyxDQUFDO1lBQzlHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM5QixDQUFDO1FBQ0YsQ0FBQztRQUVPLHFDQUFrQixHQUExQjtZQUFBLGlCQWVDO1lBZEEsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxHQUFHLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3ZELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBQyxNQUFjLEVBQUUsS0FBYTtnQkFDM0QsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUMxQyxNQUFNLENBQUMsTUFBSSxFQUFFLDhCQUF3QixLQUFLLHNCQUFnQixNQUFNLENBQUMsWUFBWSxVQUFLLEVBQUUsTUFBRyxDQUFDO1lBQ3pGLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVSLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO2dCQUN4Qyx1QkFBVSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxLQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbEMsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVPLHdDQUFxQixHQUE3QjtZQUNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBQyxNQUFjLEVBQUUsS0FBYTtnQkFDM0QsTUFBTSxDQUFDLDJCQUF5QixLQUFLLGlDQUE2QixLQUFLLGdFQUE0RCxLQUFLLDREQUF1RCxLQUFLLG1GQUN0SixLQUFLLHdCQUNoRCxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsMENBQ0csS0FBSyxvWUFJeEIsQ0FBQztZQUNSLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLHVCQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVPLHdDQUFxQixHQUE3QjtZQUNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBQyxNQUFjLEVBQUUsS0FBYTtnQkFDM0QsTUFBTSxDQUFDLDJCQUF5QixLQUFLLGlDQUE2QixLQUFLLGdFQUE0RCxLQUFLLDREQUF1RCxLQUFLLHlDQUNqTSxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsbUJBQ2hCLENBQUM7WUFDUixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSx1QkFBVSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFFTyxnQ0FBYSxHQUFyQixVQUFzQixjQUF5RCxFQUFFLEdBQWlCO1lBQ2pHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDVixHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDO1lBQ0QsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBRSxLQUFLLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTlGLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ2pELFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFaEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUEvV2MsZ0NBQXVCLEdBQUcsRUFBRSxDQUFDO1FBRTVDO1lBQUMsNEJBQVEsQ0FBQyxRQUFRLENBQUM7O2lEQUFBO1FBTW5CO1lBQUMsNEJBQVE7OzhDQUFBO1FBT1Q7WUFBQyw0QkFBUTs7a0RBQUE7UUFPVDtZQUFDLDRCQUFROzsyREFBQTtRQU1UO1lBQUMsNEJBQVE7OzBEQUFBO1FBTVQ7WUFBQyw0QkFBUTs7b0RBQUE7UUFNVDtZQUFDLDRCQUFROztnRUFBQTtRQU1UO1lBQUMsNEJBQVE7O2lEQUFBO1FBNElUO1lBQUMsMEJBQVE7WUFDUiwwQkFBUSxDQUFDLEdBQUcsQ0FBQzs7OztvREFBQTtRQXZNZjtZQUFDLDhCQUFVOztvQkFBQTtRQTRYWCxlQUFDO0lBQUQsQ0EzWEEsQUEyWEMsSUFBQTtJQTNYWSxnQkFBUSxXQTJYcEIsQ0FBQTtJQUtEO1FBeUdDLGdCQUFtQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBN0M1QixlQUFVLEdBQUcsSUFBSSxDQUFDO1lBY2xCLGFBQVEsR0FBRyxJQUFJLENBQUM7WUE2QmYsVUFBSyxHQUFHLElBQUksbUJBQVEsRUFBUSxDQUFDO1lBR3BDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqQixDQUFDO1lBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDcEMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLENBQUM7WUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUM3QixDQUFDO1FBRU8scUJBQUksR0FBWjtZQUFBLGlCQTBCQztZQXhCQSxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLEtBQUssR0FBUyxJQUFJLENBQUMsS0FBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQVMsSUFBSSxDQUFDLFNBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLENBQUM7WUFDakUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFTLElBQUksQ0FBQyxVQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxDQUFDO1lBQ25FLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBUyxJQUFJLENBQUMsUUFBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sQ0FBQztZQUMvRCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7b0JBQ3ZCLEtBQUksQ0FBQyxZQUFZLElBQUksbUJBQWdCLEtBQUssaUJBQVksS0FBSyxNQUFHLENBQUM7Z0JBQ2hFLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsZ0NBQWUsR0FBZjtZQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7UUFDRixDQUFDO1FBRUQsK0JBQWMsR0FBZDtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBeEpEO1lBQUMsNEJBQVE7OzhDQUFBO1FBUVQ7WUFBQyw0QkFBUTs7bURBQUE7UUFRVDtZQUFDLDRCQUFROzs4Q0FBQTtRQVFUO1lBQUMsNEJBQVE7O21EQUFBO1FBTVQ7WUFBQyw0QkFBUTs7aURBQUE7UUFRVDtZQUFDLDRCQUFROzs2Q0FBQTtRQVFUO1lBQUMsNEJBQVE7O2lEQUFBO1FBTVQ7WUFBQyw0QkFBUTs7a0RBQUE7UUFRVDtZQUFDLDRCQUFROzsrQ0FBQTtRQU1UO1lBQUMsNEJBQVE7O2dEQUFBO1FBV1Q7WUFBQyw0QkFBUTs7OENBQUE7UUF2RlY7WUFBQyw4QkFBVTtZQUNWLDBCQUFNO1lBQ04sa0NBQWMsQ0FBQyxLQUFLLENBQUM7O2tCQUFBO1FBaUt0QixhQUFDO0lBQUQsQ0FoS0EsQUFnS0MsSUFBQTtJQWhLWSxjQUFNLFNBZ0tsQixDQUFBIiwiZmlsZSI6ImRhdGFncmlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthdXRvaW5qZWN0LCBiaW5kYWJsZSwgY2hpbGRyZW4sIENvbnRhaW5lciwgbm9WaWV3LCBwcm9jZXNzQ29udGVudCwgVmlldywgVmlld0NvbXBpbGVyLCBWaWV3UmVzb3VyY2VzLCBWaWV3U2xvdH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XG5pbXBvcnQge2F1dG9iaW5kLCB0aHJvdHRsZX0gZnJvbSBcImNvcmUtZGVjb3JhdG9yc1wiO1xuaW1wb3J0IHtDc3NBbmltYXRvcn0gZnJvbSBcImF1cmVsaWEtYW5pbWF0b3ItY3NzXCI7XG5pbXBvcnQge0RlZmVycmVkfSBmcm9tIFwiLi91dGlsL2RlZmVycmVkXCI7XG5pbXBvcnQge2F0dGFjaFZpZXd9IGZyb20gXCIuL3V0aWwvdGVtcGxhdGluZ1wiO1xuXG4vKipcbiAqIFRoZSBkYXRhZ3JpZCBjb21wb25lbnQgY2FuIGJlIHVzZWQgdG8gZGlzcGxheSBjb21wbGV4IGRhdGFzZXRzLiBTcGVjaWZ5IHRoZVxuICogY29sdW1ucyB0byBkaXNwbGF5IHVzaW5nIDxjb2x1bW4+IHRhZ3MuXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgPGRhdGFncmlkIHJvd3MuYmluZD1cIm15RGF0YXNldFwiPlxuICogICAgIDxjb2x1bW4gZmllbGQ9XCJuYW1lXCI+PC9jb2x1bW4+XG4gKiAgICAgPGNvbHVtbiBmaWVsZD1cImNvbW1lbnRzXCIgc29ydGFibGU9XCJmYWxzZVwiPlxuICogICAgICAgJHtyb3cuY29tbWVudHMgfCBuZXdsaW5lc31cbiAqICAgICA8L2NvbHVtbj5cbiAqICAgICA8Y29sdW1uIGZpZWxkPVwiY3VzdG9tZXIgcmVmZXJlbmNlXCI+PC9jb2x1bW4+XG4gKiAgICAgPGNvbHVtbiBmaWVsZD1cImRlYWRsaW5lXCIgc2VhcmNoYWJsZT1cImZhbHNlXCIgc29ydGVyLmJpbmQ9XCJteURhdGVTb3J0ZXJcIj5cbiAqICAgPC9kYXRhZ3JpZD5cbiAqXG4gKiBTZWUgdGhlIEBiaW5kYWJsZSBwcm9wZXJ0aWVzIG9uIHRoZSBEYXRhZ3JpZCBhbmQgQ29sdW1uIGNsYXNzZXMgZm9yIGFsbFxuICogYXZhaWxhYmxlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAqL1xuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZCB7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIGxvY2FsZSB0byB1c2UgZm9yIHNvcnRpbmcgc3RyaW5ncywgZGVmYXVsdHMgdG8gYnJvd3NlciBkZWZhdWx0LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBMT0NBTEU6IHN0cmluZztcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgbWF4aW11bSBudW1iZXIgb2Ygcm93cyB0byBkaXNwbGF5IGluICdzdGF0aWMgbW9kZScuIEluIHN0YXRpY1xuXHQgKiBtb2RlIGFsbCByb3dzIGFyZSBkaXNwbGF5ZWQgd2l0aG91dCBzY3JvbGxpbmcgYW5kIHRoZXJlIGlzIG5vIHNlYXJjaGluZy5cblx0ICovXG5cdHByaXZhdGUgc3RhdGljIE1BWF9ST1dTX0lOX1NUQVRJQ19NT0RFID0gMTA7XG5cblx0QGNoaWxkcmVuKFwiY29sdW1uXCIpXG5cdHB1YmxpYyBjb2x1bW5zOiBDb2x1bW5bXSA9IFtdO1xuXG5cdC8qKlxuXHQgKiBUaGUgZGF0YSB0byBkaXNwbGF5LCBnaXZlbiBhcyByb3dzIG9mIHNpbXBsZSBvYmplY3RzLlxuXHQgKi9cblx0QGJpbmRhYmxlXG5cdHB1YmxpYyByb3dzOiBhbnlbXTtcblxuXHQvKipcblx0ICogU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgc29ydGluZyBpbiB0aGUgZW50aXJlIGRhdGFncmlkLiBZb3UgY2FuIGFsc29cblx0ICogZGlzYWJsZSBzb3J0aW5nIGZvciBpbmRpdmlkdWFsIGNvbHVtbnM6IHNlZSBDb2x1bW4uc29ydGFibGUuXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIHNvcnRhYmxlID0gdHJ1ZTtcblxuXHQvKipcblx0ICogQ29sdW1uIHRvIHNvcnQgb24gd2hlbiB0aGUgZ3JpZCBpcyBmaXJzdCByZW5kZXJlZCwgaWRlbnRpZmllZCBieSBmaWVsZC5cblx0ICogSWYgbm90IHNldCB0aGUgZmlyc3Qgc29ydGFibGUgY29sdW1uIHdpbGwgYmUgdXNlZCB0byBzb3J0LlxuXHQgKi9cblx0QGJpbmRhYmxlXG5cdHB1YmxpYyBkZWZhdWx0U29ydENvbHVtbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBPcmRlciB0byBzb3J0IGluIHdoZW4gdGhlIGdyaWQgaXMgZmlyc3QgcmVuZGVyZWQuXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIGRlZmF1bHRTb3J0T3JkZXI6IFwiYXNjXCIgfCBcImRlc2NcIiA9IFwiYXNjXCI7XG5cblx0LyoqXG5cdCAqIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHNlYXJjaGluZyBmb3IgdGhpcyBkYXRhZ3JpZC5cblx0ICovXG5cdEBiaW5kYWJsZVxuXHRwdWJsaWMgc2VhcmNoYWJsZSA9IHRydWU7XG5cblx0LyoqXG5cdCAqIFRleHQgdG8gdXNlIGFzIHBsYWNlaG9sZGVyIGluIHNlYXJjaGJveC5cblx0ICovXG5cdEBiaW5kYWJsZVxuXHRwdWJsaWMgc2VhcmNoSW5wdXRQbGFjZWhvbGRlcjogc3RyaW5nID0gXCJcIjtcblxuXHQvKipcblx0ICogU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgYW5pbWF0aW9uIHdoZW4gZmlyc3Qgc2hvd2luZyB0aGUgZGF0YWdyaWQuXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIGFuaW1hdGUgPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBZb3UgY2FuIHVzZSB0aGlzIGluIHlvdXIgY2VsbCB0ZW1wbGF0ZXMgdG8gcmVmZXJlbmNlIHRoZSBiaW5kaW5nIGNvbnRleHRcblx0ICogaW4gd2hpY2ggdGhlIGRhdGFncmlkIGlzIHVzZWQuXG5cdCAqL1xuXHRwdWJsaWMgcGFyZW50OiBhbnk7XG5cblx0cHVibGljIHNlYXJjaFRlcm06IHN0cmluZyA9IFwiXCI7XG5cdHB1YmxpYyBzZWFyY2hSZXN1bHRzOiBhbnlbXTtcblxuXHRwdWJsaWMgcm93c1NvcnRhYmxlID0gZmFsc2U7XG5cdHB1YmxpYyBzb3J0Q29sdW1uOiBDb2x1bW47XG5cdHB1YmxpYyBzb3J0T3JkZXI6IFwiYXNjXCIgfCBcImRlc2NcIjtcblxuXHRwdWJsaWMgc2hvd0Zvb3RlciA9IGZhbHNlO1xuXG5cdHB1YmxpYyByZW5kZXJlZCA9IGZhbHNlO1xuXG5cdHByaXZhdGUgc3RhdGljTW9kZSA9IHRydWU7XG5cblx0cHVibGljIGJvZHlFbGVtZW50OiBIVE1MRWxlbWVudDtcblx0cHJpdmF0ZSBib2R5ID0ge1xuXHRcdHNjcm9sbExpc3RlbmVyOiA8RXZlbnRMaXN0ZW5lcj5udWxsLFxuXHRcdGJvcmRlckhlaWdodDogPG51bWJlcj5udWxsLFxuXHRcdHZpZXdTbG90OiBuZXcgRGVmZXJyZWQ8Vmlld1Nsb3Q+KCksXG5cdFx0dmlld0F0dGFjaGVkOiBuZXcgRGVmZXJyZWQ8dm9pZD4oKVxuXHR9O1xuXG5cdHB1YmxpYyBoZWFkZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcblx0cHJpdmF0ZSBoZWFkZXIgPSB7XG5cdFx0dmlld1Nsb3Q6IG5ldyBEZWZlcnJlZDxWaWV3U2xvdD4oKVxuXHR9O1xuXG5cdHB1YmxpYyBmb290ZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcblx0cHJpdmF0ZSBmb290ZXIgPSB7XG5cdFx0dmlld1Nsb3Q6IG5ldyBEZWZlcnJlZDxWaWV3U2xvdD4oKVxuXHR9O1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYW5pbWF0b3I6IENzc0FuaW1hdG9yLCBwcml2YXRlIGNvbnRhaW5lcjogQ29udGFpbmVyLFxuXHRcdHByaXZhdGUgZWxlbWVudDogRWxlbWVudCwgcHJpdmF0ZSB2aWV3Q29tcGlsZXI6IFZpZXdDb21waWxlcixcblx0XHRwcml2YXRlIHZpZXdSZXNvdXJjZXM6IFZpZXdSZXNvdXJjZXMpIHtcblx0fVxuXG5cdHByaXZhdGUgYmluZChiaW5kaW5nQ29udGV4dDogYW55KSB7XG5cdFx0dGhpcy5wYXJlbnQgPSBiaW5kaW5nQ29udGV4dDtcblxuXHRcdGlmICh0aGlzLnJvd3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5yb3dzQ2hhbmdlZCgpO1xuXHRcdH1cblx0XHQvKiBUT0RPOiBXb3JrYXJvdW5kIHVudGlsIGF1cmVsaWEtYmluZGluZyBpc3N1ZSAjMzQ3IGlzIHJlc29sdmVkLiAqL1xuXHRcdGlmICh0eXBlb2YgdGhpcy5hbmltYXRlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR0aGlzLmFuaW1hdGUgPSAoPGFueT50aGlzLmFuaW1hdGUpLnRvTG93ZXJDYXNlKCkgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB0aGlzLnNlYXJjaGFibGUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHRoaXMuc2VhcmNoYWJsZSA9ICg8YW55PnRoaXMuc2VhcmNoYWJsZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiB0cnVlO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHRoaXMuc29ydGFibGUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHRoaXMuc29ydGFibGUgPSAoPGFueT50aGlzLnNvcnRhYmxlKS50b0xvd2VyQ2FzZSgpID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBhdHRhY2hlZCgpIHtcblx0XHR0aGlzLmJvZHkudmlld1Nsb3QucmVzb2x2ZShuZXcgVmlld1Nsb3QodGhpcy5ib2R5RWxlbWVudCwgdHJ1ZSkpO1xuXHRcdHRoaXMuaGVhZGVyLnZpZXdTbG90LnJlc29sdmUobmV3IFZpZXdTbG90KHRoaXMuaGVhZGVyRWxlbWVudCwgdHJ1ZSkpO1xuXHRcdHRoaXMuZm9vdGVyLnZpZXdTbG90LnJlc29sdmUobmV3IFZpZXdTbG90KHRoaXMuZm9vdGVyRWxlbWVudCwgdHJ1ZSkpO1xuXHR9XG5cblx0cHJpdmF0ZSBjb2x1bW5zQ2hhbmdlZCgpIHtcblx0XHRsZXQgd2FpdEZvckNvbHVtbkJpbmRpbmdzID0gdGhpcy5jb2x1bW5zLnJlZHVjZShcblx0XHRcdChwcm9taXNlLCBjb2x1bW4pID0+IDxhbnk+cHJvbWlzZS50aGVuKDxhbnk+Y29sdW1uLndhaXRGb3JCaW5kaW5nKCkpLFxuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcblx0XHQpO1xuXHRcdHdhaXRGb3JDb2x1bW5CaW5kaW5ncy50aGVuKCgpID0+IHtcblx0XHRcdHRoaXMucHJvY2Vzc0NvbHVtbnMoKTtcblx0XHRcdHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiBjb2x1bW4uZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidXBkYXRlXCIsIHRoaXMucHJvY2Vzc0NvbHVtbnMuYmluZCh0aGlzKSkpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSByb3dzQ2hhbmdlZCgpIHtcblx0XHR0aGlzLmJvZHkudmlld0F0dGFjaGVkLnByb21pc2UudGhlbigoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG5cdH1cblxuXHRwcml2YXRlIHJlZnJlc2goKSB7XG5cdFx0dGhpcy5zdGF0aWNNb2RlID0gdGhpcy5yb3dzLmxlbmd0aCA8PSBEYXRhZ3JpZC5NQVhfUk9XU19JTl9TVEFUSUNfTU9ERTtcblxuXHRcdHRoaXMuc2VhcmNoUmVzdWx0cyA9IHRoaXMucm93cztcblxuXHRcdHRoaXMucm93c1NvcnRhYmxlID0gKHRoaXMuc29ydGFibGUgJiYgdGhpcy5yb3dzLmxlbmd0aCA+IDEpO1xuXHRcdGlmICh0aGlzLnJvd3NTb3J0YWJsZSkge1xuXHRcdFx0aWYgKCF0aGlzLnNvcnRDb2x1bW4pIHtcblx0XHRcdFx0aWYgKHRoaXMuZGVmYXVsdFNvcnRDb2x1bW4pIHtcblx0XHRcdFx0XHR0aGlzLnNvcnRDb2x1bW4gPSB0aGlzLmNvbHVtbnMuZmluZChjb2x1bW4gPT4gY29sdW1uLmZpZWxkICYmIGNvbHVtbi5maWVsZC5pbmRleE9mKHRoaXMuZGVmYXVsdFNvcnRDb2x1bW4pICE9PSAtMSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zb3J0Q29sdW1uID0gdGhpcy5jb2x1bW5zLmZpbmQoY29sdW1uID0+IGNvbHVtbi5zb3J0YWJsZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuc29ydENvbHVtbikge1xuXHRcdFx0XHRcdHRoaXMuc29ydE9yZGVyID0gdGhpcy5kZWZhdWx0U29ydE9yZGVyO1xuXHRcdFx0XHRcdHRoaXMuc29ydENvbHVtbi5zb3J0ZWRPcmRlciA9IHRoaXMuc29ydE9yZGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5zb3J0Q29sdW1uKSB7XG5cdFx0XHRcdHRoaXMuc29ydCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBpbm5lcldyYXBwZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5uZXItd3JhcHBlclwiKTtcblx0XHRpbm5lcldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcInF1YXJ0ZXJcIiwgXCJoYWxmXCIsIFwidGhyZWVxdWFydGVyc1wiLCBcImZ1bGxcIiwgXCJvdmVyZmxvd2luZ1wiKVxuXHRcdGlmICh0aGlzLnJvd3MubGVuZ3RoIDw9IERhdGFncmlkLk1BWF9ST1dTX0lOX1NUQVRJQ19NT0RFIC8gNCkge1xuXHRcdFx0aW5uZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJxdWFydGVyXCIpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5yb3dzLmxlbmd0aCA8PSBEYXRhZ3JpZC5NQVhfUk9XU19JTl9TVEFUSUNfTU9ERSAvIDIpIHtcblx0XHRcdGlubmVyV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiaGFsZlwiKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucm93cy5sZW5ndGggPD0gRGF0YWdyaWQuTUFYX1JPV1NfSU5fU1RBVElDX01PREUgKiAzIC8gNSkge1xuXHRcdFx0aW5uZXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0aHJlZXF1YXJ0ZXJzXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbm5lcldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImZ1bGxcIik7XG5cdFx0XHRpZiAodGhpcy5yb3dzLmxlbmd0aCA+IERhdGFncmlkLk1BWF9ST1dTX0lOX1NUQVRJQ19NT0RFKSB7XG5cdFx0XHRcdGlubmVyV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwib3ZlcmZsb3dpbmdcIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLnN0YXRpY01vZGUpIHtcblx0XHRcdGlmICh0aGlzLmJvZHkuc2Nyb2xsTGlzdGVuZXIpIHtcblx0XHRcdFx0dGhpcy5ib2R5RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuYm9keS5zY3JvbGxMaXN0ZW5lcik7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmJvZHlFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG5cdFx0XHR0aGlzLmJvZHlFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzY3JvbGxhYmxlLWJvdHRvbVwiKTtcblx0XHRcdHRoaXMuYm9keS5zY3JvbGxMaXN0ZW5lciA9IHRoaXMub25Cb2R5U2Nyb2xsO1xuXHRcdFx0dGhpcy5ib2R5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuYm9keS5zY3JvbGxMaXN0ZW5lcik7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuYW5pbWF0ZSAmJiAhaW5uZXJXcmFwcGVyLmNsYXNzTGlzdC5jb250YWlucyhcImF1LWVudGVyZWRcIikgJiYgIWlubmVyV3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoXCJhdS1lbnRlclwiKSApIHtcblx0XHRcdC8qIE9wZW5pbmctYW5pbWF0aW9uIG9uIG5leHQgdGljayAqL1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdG9yLmVudGVyKGlubmVyV3JhcHBlcikudGhlbigoKSA9PiB0aGlzLnJlbmRlcmVkID0gdHJ1ZSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRAYXV0b2JpbmRcblx0QHRocm90dGxlKDEwMClcblx0cHJpdmF0ZSBvbkJvZHlTY3JvbGwoKSB7XG5cdFx0aWYgKHRoaXMuYm9keS5ib3JkZXJIZWlnaHQgPT09IG51bGwpIHtcblx0XHRcdHRoaXMuYm9keS5ib3JkZXJIZWlnaHQgPSAwO1xuXHRcdFx0bGV0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5ib2R5RWxlbWVudCk7XG5cdFx0XHR0aGlzLmJvZHkuYm9yZGVySGVpZ2h0ICs9IHBhcnNlSW50KHN0eWxlcy5ib3JkZXJUb3BXaWR0aCwgMTApO1xuXHRcdFx0dGhpcy5ib2R5LmJvcmRlckhlaWdodCArPSBwYXJzZUludChzdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgsIDEwKTtcblx0XHR9XG5cblx0XHRsZXQgc2Nyb2xsQm90dG9tID0gdGhpcy5ib2R5RWxlbWVudC5zY3JvbGxIZWlnaHQgLSB0aGlzLmJvZHlFbGVtZW50Lm9mZnNldEhlaWdodCArIHRoaXMuYm9keS5ib3JkZXJIZWlnaHQ7XG5cblx0XHRpZiAoc2Nyb2xsQm90dG9tID09PSAwKSB7XG5cdFx0XHR0aGlzLmJvZHlFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzY3JvbGxhYmxlLXRvcFwiKTtcblx0XHRcdHRoaXMuYm9keUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNjcm9sbGFibGUtYm90dG9tXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmJvZHlFbGVtZW50LnNjcm9sbFRvcCA9PT0gMCkge1xuXHRcdFx0dGhpcy5ib2R5RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2Nyb2xsYWJsZS10b3BcIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuYm9keUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNjcm9sbGFibGUtdG9wXCIpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5ib2R5RWxlbWVudC5zY3JvbGxUb3AgPT09IHNjcm9sbEJvdHRvbSkge1xuXHRcdFx0dGhpcy5ib2R5RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2Nyb2xsYWJsZS1ib3R0b21cIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuYm9keUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNjcm9sbGFibGUtYm90dG9tXCIpO1xuXHRcdH1cblx0fVxuXG5cdG9uQ29sdW1uSGVhZGVyQ2xpY2soY29sdW1uOiBDb2x1bW4pIHtcblx0XHRpZiAoIWNvbHVtbi5zb3J0YWJsZSB8fCAhdGhpcy5yb3dzU29ydGFibGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoY29sdW1uID09PSB0aGlzLnNvcnRDb2x1bW4pIHtcblx0XHRcdHRoaXMuc29ydE9yZGVyID0gdGhpcy5zb3J0T3JkZXIgPT09IFwiYXNjXCIgPyBcImRlc2NcIiA6IFwiYXNjXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc29ydENvbHVtbi5zb3J0ZWRPcmRlciA9IG51bGw7XG5cdFx0XHR0aGlzLnNvcnRDb2x1bW4gPSBjb2x1bW47XG5cdFx0XHR0aGlzLnNvcnRPcmRlciA9IFwiYXNjXCI7XG5cdFx0fVxuXHRcdHRoaXMuc29ydENvbHVtbi5zb3J0ZWRPcmRlciA9IHRoaXMuc29ydE9yZGVyO1xuXHRcdHRoaXMuc29ydCgpO1xuXHR9XG5cblx0c2VhcmNoKCkge1xuXHRcdGlmICghdGhpcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bGV0IHRlcm0gPSB0aGlzLnNlYXJjaFRlcm0udHJpbSgpLFxuXHRcdFx0dGVybUxvd2VyID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0dGhpcy5zZWFyY2hSZXN1bHRzID0gIXRlcm0gPyB0aGlzLnJvd3MgOiB0aGlzLnJvd3MuZmlsdGVyKHJvdyA9PiB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jb2x1bW5zLnNvbWUoY29sdW1uID0+IHtcblx0XHRcdFx0aWYgKCFjb2x1bW4uc2VhcmNoYWJsZSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdmFsdWVzID0gY29sdW1uLmZpZWxkLm1hcCh2ZWxkID0+IHJvd1t2ZWxkXSk7XG5cdFx0XHRcdGlmIChjb2x1bW4ubWF0Y2hlcikge1xuXHRcdFx0XHRcdHJldHVybiBjb2x1bW4ubWF0Y2hlci5iaW5kKHRoaXMucGFyZW50KSh0ZXJtLCB2YWx1ZXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZvciAobGV0IGkgaW4gdmFsdWVzKSB7XG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gU3RyaW5nKHZhbHVlc1tpXSk7XG5cdFx0XHRcdFx0aWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtTG93ZXIpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKCF0aGlzLnN0YXRpY01vZGUpIHtcblx0XHRcdC8qIFdhaXQgZm9yIGJvZHkgdXBkYXRlICovXG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMub25Cb2R5U2Nyb2xsLCAxKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHNvcnQoKSB7XG5cdFx0bGV0IHNvcnRlcjogKGFXYWFyZGVzOiBhbnlbXSwgYldhYXJkZXM6IGFueVtdKSA9PiBudW1iZXIgPSB0aGlzLnNvcnRDb2x1bW4uc29ydGVyO1xuXHRcdGlmIChzb3J0ZXIpIHtcblx0XHRcdHNvcnRlciA9IHNvcnRlci5iaW5kKHRoaXMucGFyZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c29ydGVyID0gKGFWYWx1ZXM6IGFueVtdLCBiVmFsdWVzOiBhbnlbXSkgPT4ge1xuXHRcdFx0XHRmb3IgKGxldCBpIGluIGFWYWx1ZXMpIHtcblx0XHRcdFx0XHQvKiBTb3J0IGVtcHR5IHZhbHVlcyB0byB0b3AgKi9cblx0XHRcdFx0XHRpZiAoYVZhbHVlc1tpXSA9PT0gdW5kZWZpbmVkICYmIGJWYWx1ZXNbaV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYlZhbHVlc1tpXSA9PT0gdW5kZWZpbmVkICYmIGFWYWx1ZXNbaV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0eXBlb2YgYVZhbHVlc1tpXSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdFx0bGV0IGNvbXAgPSBhVmFsdWVzW2ldLmxvY2FsZUNvbXBhcmUoYlZhbHVlc1tpXSwgRGF0YWdyaWQuTE9DQUxFKTtcblx0XHRcdFx0XHRcdGlmIChjb21wICE9IDApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbXA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhVmFsdWVzW2ldICE9IGJWYWx1ZXNbaV0pIHtcblx0XHRcdFx0XHRcdHJldHVybiBhVmFsdWVzW2ldIDwgYlZhbHVlc1tpXSA/IC0xIDogMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGxldCBmaWVsZHMgPSB0aGlzLnNvcnRDb2x1bW4uZmllbGQ7XG5cdFx0bGV0IG9yZGVyID0gdGhpcy5zb3J0T3JkZXIgPT09IFwiYXNjXCIgPyAxIDogLTE7XG5cdFx0dGhpcy5zZWFyY2hSZXN1bHRzLnNvcnQoKGFSb3c6IGFueSwgYlJvdzogYW55KSA9PiB7XG5cdFx0XHRsZXQgYVZhbHVlcyA9IGZpZWxkcy5tYXAoZmllbGQgPT4gYVJvd1tmaWVsZF0pO1xuXHRcdFx0bGV0IGJWYWx1ZXMgPSBmaWVsZHMubWFwKGZpZWxkID0+IGJSb3dbZmllbGRdKTtcblx0XHRcdHJldHVybiBzb3J0ZXIoYVZhbHVlcywgYlZhbHVlcykgKiBvcmRlcjtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgcHJvY2Vzc0NvbHVtbnMoKSB7XG5cdFx0aWYgKHRoaXMuY29sdW1ucy5sZW5ndGggPiAwICYmIHRoaXMuY29sdW1uc1swXS5yb3dIZWFkZXIgIT09IGZhbHNlXG5cdFx0XHQmJiAhdGhpcy5jb2x1bW5zLnNvbWUoY29sdW1uID0+IGNvbHVtbi5yb3dIZWFkZXIpKSB7XG5cdFx0XHR0aGlzLmNvbHVtbnNbMF0ucm93SGVhZGVyID0gdHJ1ZTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbXBpbGVSb3dUZW1wbGF0ZSgpO1xuXHRcdHRoaXMuY29tcGlsZUhlYWRlclRlbXBsYXRlKCk7XG5cblx0XHR0aGlzLnNob3dGb290ZXIgPSB0aGlzLmNvbHVtbnMuc29tZShjb2x1bW4gPT4gY29sdW1uLmZvb3RlciAhPT0gdW5kZWZpbmVkICYmIGNvbHVtbi5mb290ZXIudHJpbSgpLmxlbmd0aCA+IDApO1xuXHRcdGlmICh0aGlzLnNob3dGb290ZXIpIHtcblx0XHRcdHRoaXMuY29tcGlsZUZvb3RlclRlbXBsYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBjb21waWxlUm93VGVtcGxhdGUoKSB7XG5cdFx0bGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblx0XHRyb3cuc2V0QXR0cmlidXRlKFwicmVwZWF0LmZvclwiLCBcInJvdyBvZiBzZWFyY2hSZXN1bHRzXCIpO1xuXHRcdGxldCB2aWV3ID0gdGhpcy5jb2x1bW5zVG9WaWV3KChjb2x1bW46IENvbHVtbiwgaW5kZXg6IG51bWJlcikgPT4ge1xuXHRcdFx0Y29uc3QgZWwgPSBjb2x1bW4ucm93SGVhZGVyID8gXCJ0aFwiIDogXCJ0ZFwiO1xuXHRcdFx0cmV0dXJuIGA8JHtlbH0gY2xhc3MuYmluZD1cImNvbHVtbnNbJHtpbmRleH1dLmNlbGxDbGFzc1wiPiR7Y29sdW1uLmNlbGxUZW1wbGF0ZX08LyR7ZWx9PmA7XG5cdFx0fSwgcm93KTtcblxuXHRcdHRoaXMuYm9keS52aWV3U2xvdC5wcm9taXNlLnRoZW4oKHZpZXdTbG90KSA9PiB7XG5cdFx0XHRhdHRhY2hWaWV3KHZpZXcsIHZpZXdTbG90KS50aGVuKCgpID0+IHtcblx0XHRcdFx0aWYgKCF0aGlzLmJvZHkudmlld0F0dGFjaGVkLmlzUmVzb2x2ZWQoKSkge1xuXHRcdFx0XHRcdHRoaXMuYm9keS52aWV3QXR0YWNoZWQucmVzb2x2ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY29tcGlsZUhlYWRlclRlbXBsYXRlKCkge1xuXHRcdGxldCB2aWV3ID0gdGhpcy5jb2x1bW5zVG9WaWV3KChjb2x1bW46IENvbHVtbiwgaW5kZXg6IG51bWJlcikgPT4ge1xuXHRcdFx0cmV0dXJuIGA8dGggY2xhc3M9XCJcXCR7Y29sdW1uc1ske2luZGV4fV0uaGVhZGVyQ2xhc3N9IFxcJHtjb2x1bW5zWyR7aW5kZXh9XS5zb3J0YWJsZSAmJiByb3dzU29ydGFibGUgPyAnc29ydGFibGUnIDogJyd9IFxcJHtjb2x1bW5zWyR7aW5kZXh9XS5zb3J0ZWRPcmRlciAmJiByb3dzU29ydGFibGUgPyAnc29ydGVkICcgKyBjb2x1bW5zWyR7aW5kZXh9XS5zb3J0ZWRPcmRlciA6ICcnfVwiXG5cdFx0XHRcdGNsaWNrLnRyaWdnZXI9XCJvbkNvbHVtbkhlYWRlckNsaWNrKGNvbHVtbnNbJHtpbmRleH1dKVwiPlxuXHRcdFx0XHQke2NvbHVtbi5oZWFkZXIgfHwgJyd9XG5cdFx0XHRcdDxzdmcgaWYuYmluZD1cImNvbHVtbnNbJHtpbmRleH1dLnNvcnRhYmxlICYmIHJvd3NTb3J0YWJsZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDE3OTIgMTc5MlwiPlxuXHRcdFx0XHRcdDxwYXRoIGQ9XCJNMTQwOCA3MDRxMCAyNi0xOSA0NXQtNDUgMTloLTg5NnEtMjYgMC00NS0xOXQtMTktNDUgMTktNDVsNDQ4LTQ0OHExOS0xOSA0NS0xOXQ0NSAxOWw0NDggNDQ4cTE5IDE5IDE5IDQ1elwiLz5cblx0XHRcdFx0XHQ8cGF0aCBkPVwiTTE0MDggMTA4OHEwIDI2LTE5IDQ1bC00NDggNDQ4cS0xOSAxOS00NSAxOXQtNDUtMTlsLTQ0OC00NDhxLTE5LTE5LTE5LTQ1dDE5LTQ1IDQ1LTE5aDg5NnEyNiAwIDQ1IDE5dDE5IDQ1elwiLz5cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHQ8L3RoPmA7XG5cdFx0fSk7XG5cdFx0dGhpcy5oZWFkZXIudmlld1Nsb3QucHJvbWlzZS50aGVuKCh2aWV3U2xvdCkgPT4gYXR0YWNoVmlldyh2aWV3LCB2aWV3U2xvdCkpO1xuXHR9XG5cblx0cHJpdmF0ZSBjb21waWxlRm9vdGVyVGVtcGxhdGUoKSB7XG5cdFx0bGV0IHZpZXcgPSB0aGlzLmNvbHVtbnNUb1ZpZXcoKGNvbHVtbjogQ29sdW1uLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cdFx0XHRyZXR1cm4gYDx0ZCBjbGFzcz1cIlxcJHtjb2x1bW5zWyR7aW5kZXh9XS5mb290ZXJDbGFzc30gXFwke2NvbHVtbnNbJHtpbmRleH1dLnNvcnRhYmxlICYmIHJvd3NTb3J0YWJsZSA/ICdzb3J0YWJsZScgOiAnJ30gXFwke2NvbHVtbnNbJHtpbmRleH1dLnNvcnRlZE9yZGVyICYmIHJvd3NTb3J0YWJsZSA/ICdzb3J0ZWQgJyArIGNvbHVtbnNbJHtpbmRleH1dLnNvcnRlZE9yZGVyIDogJyd9XCI+XG5cdFx0XHRcdCR7Y29sdW1uLmZvb3RlciB8fCAnJ31cblx0XHRcdDwvdGQ+YDtcblx0XHR9KTtcblxuXHRcdHRoaXMuZm9vdGVyLnZpZXdTbG90LnByb21pc2UudGhlbigodmlld1Nsb3QpID0+IGF0dGFjaFZpZXcodmlldywgdmlld1Nsb3QpKTtcblx0fVxuXG5cdHByaXZhdGUgY29sdW1uc1RvVmlldyh0ZW1wbGF0ZU1hcHBlcjogKGNvbHVtbjogQ29sdW1uLCBpbmRleDogbnVtYmVyKSA9PiBzdHJpbmcsIHJvdz86IEhUTUxFbGVtZW50KTogVmlldyB7XG5cdFx0aWYgKCFyb3cpIHtcblx0XHRcdHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblx0XHR9XG5cdFx0cm93LmlubmVySFRNTCA9IHRoaXMuY29sdW1ucy5tYXAoKGNvbHVtbiwgaW5kZXgpID0+IHRlbXBsYXRlTWFwcGVyKGNvbHVtbiwgaW5kZXgpKS5qb2luKFwiXFxuXCIpO1xuXG5cdFx0bGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdHRlbXBsYXRlLmFwcGVuZENoaWxkKHJvdyk7XG5cdFx0bGV0IHZpZXcgPSB0aGlzLnZpZXdDb21waWxlci5jb21waWxlKHRlbXBsYXRlLCB0aGlzLnZpZXdSZXNvdXJjZXMpLmNyZWF0ZSh0aGlzLmNvbnRhaW5lcik7XG5cdFx0dmlldy5iaW5kKHRoaXMpO1xuXG5cdFx0cmV0dXJuIHZpZXc7XG5cdH1cbn1cblxuQGF1dG9pbmplY3RcbkBub1ZpZXdcbkBwcm9jZXNzQ29udGVudChmYWxzZSlcbmV4cG9ydCBjbGFzcyBDb2x1bW4ge1xuXG5cdC8qKlxuXHQgKiBUaGUgaGVhZGVyIHRvIGRpc3BsYXkgYWJvdmUgdGhpcyBjb2x1bW4uIFRoaXMgY2FuIGJlIHNldCBieSBiaW5kaW5nIG9yIGJ5XG5cdCAqIHBsYWNpbmcgYSA8aGVhZGVyPiB0YWcgaW4gdGhlIDxjb2x1bW4+IGNvbnRlbnQuIElmIGJvdGggYXJlIGRlZmluZWQsIHRoZVxuXHQgKiBib3VuZCB2YWx1ZSBpcyB1c2VkLlxuXHQgKi9cblx0QGJpbmRhYmxlXG5cdHB1YmxpYyBoZWFkZXI6IHN0cmluZztcblxuXHQvKipcblx0ICogQ1NTIGNsYXNzIGZvciB0aGUgY29sdW1uIGhlYWRlci4gTWF5IGJlIHNldCBieSBiaW5kaW5nIG9yIGFzIGEgJ2NsYXNzJ1xuXHQgKiBhdHRyaWJ1dGUgb24gdGhlIDxoZWFkZXI+IHRhZy4gSWYgYm90aCBhcmUgZGVmaW5lZCwgdGhlIGJvdW5kIHZhbHVlIGlzXG5cdCAqIHVzZWQuXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIGhlYWRlckNsYXNzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIE9wdGlvbmFsIGZvb3RlciB0byBkaXNwbGF5IGJlbmVhdGggdGhlIGNvbHVtbi4gVGhpcyBjYW4gYmUgc2V0IGJ5IGJpbmRpbmdcblx0ICogb3IgYnkgcGxhY2luZyBhIDxmb290ZXI+IHRhZyBpbiB0aGUgPGNvbHVtbj4gY29udGVudC4gSWYgYm90aCBhcmVcblx0ICogZGVmaW5lZCwgdGhlIGJvdW5kIHZhbHVlIGlzIHVzZWQuXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIGZvb3Rlcjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBDU1MgY2xhc3MgZm9yIHRoZSBjb2x1bW4gZm9vdGVyLiBNYXkgYmUgc2V0IGJ5IGJpbmRpbmcgb3IgYXMgYSAnY2xhc3MnXG5cdCAqIGF0dHJpYnV0ZSBvbiB0aGUgPGZvb3Rlcj4gdGFnLiBJZiBib3RoIGFyZSBkZWZpbmVkLCB0aGUgYm91bmQgdmFsdWUgaXNcblx0ICogdXNlZC5cblx0ICovXG5cdEBiaW5kYWJsZVxuXHRwdWJsaWMgZm9vdGVyQ2xhc3M6IHN0cmluZztcblxuXHQvKipcblx0ICogQ1NTIGNsYXNzIGZvciBhbGwgY2VsbHMgaW4gdGhpcyBjb2x1bW4uXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIGNlbGxDbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgcm93IHByb3BlcnR5IG9yIHByb3BlcnRpZXMgdG8gc2hvdyBpbiB0aGlzIGNvbHVtbi4gTXVsdGlwbGUgZmllbGRzXG5cdCAqIGNhbiBiZSBzZXBhcmF0ZWQgd2l0aCBzcGFjZXMuIElmIG5vIGZpZWxkcyBhcmUgc3VwcGxpZWQsIHRoZSBjb2x1bW4gY2FuJ3Rcblx0ICogYmUgc2VhcmNoZWQgb3Igc29ydGVkLCBhbmQgYnkgZGVmYXVsdCB3aWxsIGhhdmUgYW4gZW1wdHkgdGVtcGxhdGUuXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIGZpZWxkOiBzdHJpbmdbXTtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoYXQgdGhlIGNlbGxzIGluIHRoaXMgY29sdW1uIGFyZSB0aGUgcm93IGhlYWRlcnMuIElmIG5vIGNvbHVtblxuXHQgKiBpcyBtYXJrZWQgYXMgdGhlIHJvdyBoZWFkZXIsIHRoZW4gdGhlIGZpcnN0IGNvbHVtbiB3aWxsIGJlIHVzZWQgYXMgcm93XG5cdCAqIGhlYWRlciB1bmxlc3MgeW91IGV4cGxpY2l0bHkgbWFyayBpdCA8Y29kZT5yb3ctaGVhZGVyPVwiZmFsc2VcIjwvY29kZT4uXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIHJvd0hlYWRlcjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogU2V0IHRvIGZhbHNlIHRvIGV4Y2x1ZGUgZGF0YSBpbiB0aGlzIGNvbHVtbiBmcm9tIHNlYXJjaGVzLlxuXHQgKi9cblx0QGJpbmRhYmxlXG5cdHB1YmxpYyBzZWFyY2hhYmxlID0gdHJ1ZTtcblxuXHQvKipcblx0ICogQ3VzdG9tIG1hdGNoZXIgdG8gc2VhcmNoIGRhdGEgaW4gdGhpcyBjb2x1bW4gZm9yIGEgc2VhcmNoIHRlcm0uIFRoZVxuXHQgKiBtYXRjaGVyIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoIHJvdyB3aXRoIHRoZSAocmF3KSBzZWFyY2ggdGVybSBhbmQgdGhlXG5cdCAqIHZhbHVlcyBvZiB0aGUgcm93IGZvciBlYWNoIGZpZWxkIGluIG9yZGVyLiBTZWUgQ29sdW1uLmZpZWxkLlxuXHQgKi9cblx0QGJpbmRhYmxlXG5cdHB1YmxpYyBtYXRjaGVyOiAodGVybTogc3RyaW5nLCB3YWFyZGVzOiBhbnlbXSkgPT4gYm9vbGVhbjtcblxuXHQvKipcblx0ICogU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgc29ydGluZyBmb3IgdGhpcyBjb2x1bW4uXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIHNvcnRhYmxlID0gdHJ1ZTtcblxuXHQvKipcblx0ICogQ3VzdG9tIHNvcnRlciB0byBzb3J0IGRhdGEgaW4gdGhpcyBjb2x1bW4gaW4gYXNjZW5kaW5nIG9yZGVyLiBUaGUgc29ydGVyXG5cdCAqIGlzIGNhbGxlZCB3aXRoIHR3byBhcnJheXMgb2YgZXF1YWwgbGVuZ3RoLCBjb250YWluaW5nIGZvciB0d28gcm93cyB0aGVcblx0ICogdmFsdWVzIGZvciB0aGlzIGNvbHVtbidzIGZpZWxkcy4gU2VlIENvbHVtbi5maWVsZC4gVGhlIHNvcnRlciBzaG91bGRcblx0ICogcmV0dXJuIGEgbmVnYXRpdmUgbnVtYmVyIHRvIGluZGljYXRlIHRoYXQgdGhlIGZpcnN0IHJvdyBpcyBzb3J0ZWQgYmVmb3JlXG5cdCAqIHRoZSBzZWNvbmQsIGEgcG9zaXRpdmUgbnVtYmVyIHRvIGluZGljYXRlIHRoYXQgdGhlIHNlY29uZCByb3cgaXMgc29ydGVkXG5cdCAqIGJlZm9yZSB0aGUgZmlyc3QsIG9yIHplcm8gbm90IHRvIGNoYW5nZSB0aGUgc29ydCBvcmRlciBvZiBib3RoIHJvd3MuXG5cdCAqL1xuXHRAYmluZGFibGVcblx0cHVibGljIHNvcnRlcjogKGFWYWx1ZXM6IGFueVtdLCBiVmFsdWVzOiBhbnlbXSkgPT4gbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGVtcGxhdGUgdXNlZCB0byByZW5kZXIgZWFjaCBjZWxsIGluIHRoaXMgY29sdW1uLiBCeSBkZWZhdWx0IGVhY2ggb2Zcblx0ICogdGhpcyBjb2x1bW4ncyBmaWVsZHMgd2lsbCBiZSByZW5kZXJlZCB0aGlzIHdheTpcblx0ICpcblx0ICogICA8c3BhbiBmaWVsZD1cIlskZmllbGRdXCI+cm93WyRmaWVsZF08L3NwYW4+XG5cdCAqXG5cdCAqIHdoZXJlIGAkZmllbGRgIGlzIHRoZSByZW5kZXJlZCBmaWVsZC5cblx0ICpcblx0ICogVG8gb3ZlcnJpZGUgdGhpcyB0ZW1wbGF0ZSwgZGVmaW5lIGEgdGVtcGxhdGUgaW4gdGhlIDxjb2x1bW4+IGNvbnRlbnRzLlxuXHQgKiBXaXRoaW4gY2VsbCB0ZW1wbGF0ZXMgdGhlIGFjdGl2ZSByb3cgaXMgYm91bmQgdG8gYHJvd2AgYW5kIHRoZSBiaW5kaW5nXG5cdCAqIGNvbnRleHQgd2l0aGluIHdoaWNoIHRoZSBkYXRhZ3JpZCBpcyBwbGFjZWQgaXMgYm91bmQgdG8gYHBhcmVudGAuXG5cdCAqL1xuXHRwdWJsaWMgY2VsbFRlbXBsYXRlOiBzdHJpbmc7XG5cblx0cHVibGljIHNvcnRlZE9yZGVyOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBib3VuZCA9IG5ldyBEZWZlcnJlZDx2b2lkPigpO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IGhlYWRlciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyXCIpO1xuXHRcdGlmIChoZWFkZXIpIHtcblx0XHRcdHRoaXMuaGVhZGVyID0gaGVhZGVyLmlubmVySFRNTDtcblx0XHRcdHRoaXMuaGVhZGVyQ2xhc3MgPSBoZWFkZXIuY2xhc3NOYW1lO1xuXHRcdFx0aGVhZGVyLnJlbW92ZSgpO1xuXHRcdH1cblx0XHRsZXQgZm9vdGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb290ZXJcIik7XG5cdFx0aWYgKGZvb3Rlcikge1xuXHRcdFx0dGhpcy5mb290ZXIgPSBmb290ZXIuaW5uZXJIVE1MO1xuXHRcdFx0dGhpcy5mb290ZXJDbGFzcyA9IGZvb3Rlci5jbGFzc05hbWU7XG5cdFx0XHRmb290ZXIucmVtb3ZlKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jZWxsVGVtcGxhdGUgPSB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MO1xuXHRcdHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuXHR9XG5cblx0cHJpdmF0ZSBiaW5kKCkge1xuXHRcdC8qIFRPRE86IFdvcmthcm91bmQgdW50aWwgYXVyZWxpYS9iaW5kaW5nIGlzc3VlICMzNDcgaXMgcmVzb2x2ZWQuICovXG5cdFx0aWYgKHR5cGVvZiB0aGlzLmZpZWxkID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR0aGlzLmZpZWxkID0gKDxhbnk+dGhpcy5maWVsZCkuc3BsaXQoXCIgXCIpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHRoaXMucm93SGVhZGVyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR0aGlzLnJvd0hlYWRlciA9ICg8YW55PnRoaXMucm93SGVhZGVyKS50b0xvd2VyQ2FzZSgpID09PSBcInRydWVcIjtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB0aGlzLnNlYXJjaGFibGUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHRoaXMuc2VhcmNoYWJsZSA9ICg8YW55PnRoaXMuc2VhcmNoYWJsZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJ0cnVlXCI7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdGhpcy5zb3J0YWJsZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0dGhpcy5zb3J0YWJsZSA9ICg8YW55PnRoaXMuc29ydGFibGUpLnRvTG93ZXJDYXNlKCkgPT09IFwidHJ1ZVwiO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZpZWxkICYmICghdGhpcy5jZWxsVGVtcGxhdGUgfHwgIXRoaXMuY2VsbFRlbXBsYXRlLnRyaW0oKSkpIHtcblx0XHRcdHRoaXMuY2VsbFRlbXBsYXRlID0gXCJcIjtcblx0XHRcdHRoaXMuZmllbGQuZm9yRWFjaChmaWVsZCA9PiB7XG5cdFx0XHRcdHRoaXMuY2VsbFRlbXBsYXRlICs9IGA8c3BhbiBmaWVsZD1cIiR7ZmllbGR9XCI+XFwke3Jvdy4ke2ZpZWxkfX1gO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5maWVsZCkge1xuXHRcdFx0dGhpcy5zZWFyY2hhYmxlID0gZmFsc2U7XG5cdFx0XHR0aGlzLnNvcnRhYmxlID0gZmFsc2U7XG5cdFx0fVxuXHRcdHRoaXMuYm91bmQucmVzb2x2ZSgpO1xuXHR9XG5cblx0cHJvcGVydHlDaGFuZ2VkKCkge1xuXHRcdGlmICh0aGlzLmJvdW5kLmlzUmVzb2x2ZWQoKSkge1xuXHRcdFx0dGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwidXBkYXRlXCIpKTtcblx0XHR9XG5cdH1cblxuXHR3YWl0Rm9yQmluZGluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5ib3VuZC5wcm9taXNlO1xuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
