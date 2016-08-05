# Aurelia Datagrid

The Vevida Datagrid is a custom component built for Aurelia, used to display
large amounts of data in a usable, clear way.

```html
<datagrid rows.bind="data" default-sort-colum="b">
	<column field="a">
		<header>
			<em>Header with markup</em>
		</header>
	</column>
	<column header="Date field" field="b">
		${row.b | myDateFormatter}
	</column>
	<column header="Unsortable boolean field" field="c" sortable="false">
		<span class.bind="row.c ? 'green' : 'red'">
			${row.c ? "yes" : "no"}
		</span>
	</column>
</datagrid>
```

See the [demo](https://vevida.github.io/datagrid-demo) for all available options.

This project is a demonstration and proof-of-concept. We want to use it to gauge
interest in this datagrid. If you think this datagrid is something you might
want to use, or contribute to, [let us know](https://github.com/Vevida/datagrid-demo/issues/1).

## Why another one?

We were inspired by a [number](https://github.com/charlespockert/aurelia-bs-grid)
[of](https://github.com/corneliutusnea/aurelia-grid) [earlier](https://github.com/donnelljenkins/aurelia-datagrid)
Aurelia datagrids, but found that these were no longer maintained or did not
support the featureset we were looking for.

## What does it do?

* Sorting, with customizable sorting algorithm per column
* Searching, with customizable search algorithm per column
* Customizable templates for cells, headers and footers (including markup)
* Opening animations using aurelia-animator-css
* Show up to 10 rows as a normal table, after that make the body scrollable with fixed header and footer and a search-box

## What doesn't it do?

* Per-column filtering
* Pagination - just show all the data and let the user filter and sort as they wish
* No built-in support for CSS frameworks, but you can set header, footer and cell classes

## Build it for yourself

Make sure you have NPM and JSPM installed. Check out the source, then run
`npm install` and `jspm install`.

Run `gulp build` to build once or `gulp build-watch` to build continuously as
source files are changed.
