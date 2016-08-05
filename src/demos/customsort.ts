export class Customsort {
	public data = [
		{
			date: new Date("2016-08-01"),
			string: "Lorem",
			priority: "high",
		},
		{
			date: new Date("2016-07-01"),
			string: "ipsum",
			priority: "medium",
		},
		{
			date: new Date("2016-06-01"),
			string: "dolor",
			priority: "low",
		},
		{
			date: new Date("2016-05-01"),
			string: "sit",
			priority: "low",
		},
		{
			date: new Date("2016-04-01"),
			string: "amet",
			priority: "high",
		},
		{
			date: new Date("2016-03-01"),
			string: "consectetur",
			priority: "low",
		},
		{
			date: new Date("2016-02-01"),
			string: "adipiscing",
			priority: "high",
		},
		{
			date: new Date("2016-01-01"),
			string: "elit",
			priority: "low",
		},
		{
			date: new Date("2015-12-01"),
			string: "Nulla",
			priority: "medium",
		},
		{
			date: new Date("2015-11-01"),
			string: "hendrerit",
			priority: "high",
		},
		{
			date: new Date("2015-10-01"),
			string: "mattis",
			priority: "low",
		},
		{
			date: new Date("2015-09-01"),
			string: "est",
			priority: "medium",
		},
		{
			date: new Date("2015-08-01"),
			string: "at",
			priority: "medium",
		},
		{
			date: new Date("2015-07-01"),
			string: "pellentesque",
			priority: "medium",
		},
	];

	sortOnPriorityThenString(aValues: any[], bValues: any[]): number {
		let aPrio = aValues[0] == "high" ? 2 : aValues[0] == "medium" ? 1 : 0;
		let bPrio = bValues[0] == "high" ? 2 : bValues[0] == "medium" ? 1 : 0;
		if (aPrio != bPrio) {
			return bPrio - aPrio;
		}
		return aValues[1].localeCompare(bValues[1]);
	}
}
