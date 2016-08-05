export class SimpledateformatterValueConverter {
	private static MONTH_NAMES = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	toView(date: Date) {
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		return SimpledateformatterValueConverter.MONTH_NAMES[monthIndex] + " " + day + ", " + year;
	}
}
