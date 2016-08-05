export class Basic {
	public data = [
		{
			date: new Date("2016-08-01"),
			string: "Lorem",
			boolean: true,
		},
		{
			date: new Date("2016-07-01"),
			string: "ipsum",
			boolean: true,
		},
		{
			date: new Date("2016-06-01"),
			string: "dolor",
			boolean: true,
		},
		{
			date: new Date("2016-05-01"),
			string: "sit",
			boolean: true,
		},
		{
			date: new Date("2016-04-01"),
			string: "amet",
			boolean: true,
		},
		{
			date: new Date("2016-03-01"),
			string: "consectetur",
			boolean: true,
		},
		{
			date: new Date("2016-02-01"),
			string: "adipiscing",
			boolean: true,
		},
		{
			date: new Date("2016-01-01"),
			string: "elit",
			boolean: false,
		},
		{
			date: new Date("2015-12-01"),
			string: "Nulla",
			boolean: false,
		},
		{
			date: new Date("2015-11-01"),
			string: "hendrerit",
			boolean: false,
		},
		{
			date: new Date("2015-10-01"),
			string: "mattis",
			boolean: false,
		},
		{
			date: new Date("2015-09-01"),
			string: "est",
			boolean: false,
		},
		{
			date: new Date("2015-08-01"),
			string: "at",
			boolean: false,
		},
		{
			date: new Date("2015-07-01"),
			string: "pellentesque",
			boolean: false,
		},
	];

	get quarter() {
		return this.data.slice(0, 4);
	}
}
