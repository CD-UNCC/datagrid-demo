define(["require", "exports"], function (require, exports) {
    "use strict";
    var Basic = (function () {
        function Basic() {
            this.data = [
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
        }
        Basic.prototype.getRandomValue = function () {
            return Math.round(Math.random() * 100);
        };
        return Basic;
    }());
    exports.Basic = Basic;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW9zL2Jhc2ljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQUE7UUFBQTtZQUNRLFNBQUksR0FBRztnQkFDYjtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsSUFBSTtpQkFDYjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsSUFBSTtpQkFDYjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUUsSUFBSTtpQkFDYjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsSUFBSTtpQkFDYjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDYjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsYUFBYTtvQkFDckIsT0FBTyxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDNUIsTUFBTSxFQUFFLFlBQVk7b0JBQ3BCLE9BQU8sRUFBRSxJQUFJO2lCQUNiO2dCQUNEO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxLQUFLO2lCQUNkO2dCQUNEO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBRSxLQUFLO2lCQUNkO2dCQUNEO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxXQUFXO29CQUNuQixPQUFPLEVBQUUsS0FBSztpQkFDZDtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsUUFBUTtvQkFDaEIsT0FBTyxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDNUIsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDNUIsTUFBTSxFQUFFLElBQUk7b0JBQ1osT0FBTyxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDNUIsTUFBTSxFQUFFLGNBQWM7b0JBQ3RCLE9BQU8sRUFBRSxLQUFLO2lCQUNkO2FBQ0QsQ0FBQztRQUtILENBQUM7UUFIQSw4QkFBYyxHQUFkO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDRixZQUFDO0lBQUQsQ0E3RUEsQUE2RUMsSUFBQTtJQTdFWSxhQUFLLFFBNkVqQixDQUFBIiwiZmlsZSI6ImRlbW9zL2Jhc2ljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJhc2ljIHtcblx0cHVibGljIGRhdGEgPSBbXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE2LTA4LTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcIkxvcmVtXCIsXG5cdFx0XHRib29sZWFuOiB0cnVlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE2LTA3LTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImlwc3VtXCIsXG5cdFx0XHRib29sZWFuOiB0cnVlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE2LTA2LTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImRvbG9yXCIsXG5cdFx0XHRib29sZWFuOiB0cnVlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE2LTA1LTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcInNpdFwiLFxuXHRcdFx0Ym9vbGVhbjogdHJ1ZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKFwiMjAxNi0wNC0wMVwiKSxcblx0XHRcdHN0cmluZzogXCJhbWV0XCIsXG5cdFx0XHRib29sZWFuOiB0cnVlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE2LTAzLTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImNvbnNlY3RldHVyXCIsXG5cdFx0XHRib29sZWFuOiB0cnVlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE2LTAyLTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImFkaXBpc2NpbmdcIixcblx0XHRcdGJvb2xlYW46IHRydWUsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDEtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiZWxpdFwiLFxuXHRcdFx0Ym9vbGVhbjogZmFsc2UsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTUtMTItMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiTnVsbGFcIixcblx0XHRcdGJvb2xlYW46IGZhbHNlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE1LTExLTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImhlbmRyZXJpdFwiLFxuXHRcdFx0Ym9vbGVhbjogZmFsc2UsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTUtMTAtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwibWF0dGlzXCIsXG5cdFx0XHRib29sZWFuOiBmYWxzZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKFwiMjAxNS0wOS0wMVwiKSxcblx0XHRcdHN0cmluZzogXCJlc3RcIixcblx0XHRcdGJvb2xlYW46IGZhbHNlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE1LTA4LTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImF0XCIsXG5cdFx0XHRib29sZWFuOiBmYWxzZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKFwiMjAxNS0wNy0wMVwiKSxcblx0XHRcdHN0cmluZzogXCJwZWxsZW50ZXNxdWVcIixcblx0XHRcdGJvb2xlYW46IGZhbHNlLFxuXHRcdH0sXG5cdF07XG5cblx0Z2V0UmFuZG9tVmFsdWUoKSB7XG5cdFx0cmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
