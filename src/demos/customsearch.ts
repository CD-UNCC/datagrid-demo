import {autoinject} from "aurelia-framework";
import {SimpledateformatterValueConverter} from "../converters/simpledateformatter";

@autoinject
export class Customsearch {
	public data = [
		{ a: new Date("2016-08-01"), b: new Date("2016-01-01") },
		{ a: new Date("2016-07-01"), b: new Date("2015-12-01") },
		{ a: new Date("2016-06-01"), b: new Date("2015-11-01") },
		{ a: new Date("2016-05-01"), b: new Date("2015-10-01") },
		{ a: new Date("2016-04-01"), b: new Date("2015-09-01") },
		{ a: new Date("2016-03-01"), b: new Date("2015-08-01") },
		{ a: new Date("2016-02-01"), b: new Date("2015-07-01") },
		{ a: new Date("2016-01-01"), b: new Date("2015-06-01") },
		{ a: new Date("2015-12-01"), b: new Date("2015-05-01") },
		{ a: new Date("2015-11-01"), b: new Date("2015-04-01") },
		{ a: new Date("2015-10-01"), b: new Date("2015-03-01") },
		{ a: new Date("2015-09-01"), b: new Date("2015-02-01") },
		{ a: new Date("2015-08-01"), b: new Date("2015-01-01") },
		{ a: new Date("2015-07-01"), b: new Date("2014-12-01") },
		{ a: new Date("2015-06-01"), b: new Date("2014-11-01") },
	];

	constructor(public dateFormatter: SimpledateformatterValueConverter) {
	}

	searchFormattedDate(term: string, values: Date[]) {
		const formatted = this.dateFormatter.toView(values[0]).toLowerCase();
		return formatted.indexOf(term.trim().toLowerCase()) !== -1;
	}
}
