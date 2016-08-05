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
        Object.defineProperty(Basic.prototype, "quarter", {
            get: function () {
                return this.data.slice(0, 4);
            },
            enumerable: true,
            configurable: true
        });
        return Basic;
    }());
    exports.Basic = Basic;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW9zL3NpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFBQTtRQUFBO1lBQ1EsU0FBSSxHQUFHO2dCQUNiO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBRSxJQUFJO2lCQUNiO2dCQUNEO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBRSxJQUFJO2lCQUNiO2dCQUNEO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxPQUFPO29CQUNmLE9BQU8sRUFBRSxJQUFJO2lCQUNiO2dCQUNEO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxJQUFJO2lCQUNiO2dCQUNEO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNiO2dCQUNEO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxhQUFhO29CQUNyQixPQUFPLEVBQUUsSUFBSTtpQkFDYjtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsWUFBWTtvQkFDcEIsT0FBTyxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDNUIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDNUIsTUFBTSxFQUFFLE9BQU87b0JBQ2YsT0FBTyxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDNUIsTUFBTSxFQUFFLFdBQVc7b0JBQ25CLE9BQU8sRUFBRSxLQUFLO2lCQUNkO2dCQUNEO29CQUNDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzVCLE1BQU0sRUFBRSxRQUFRO29CQUNoQixPQUFPLEVBQUUsS0FBSztpQkFDZDtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsS0FBSztpQkFDZDtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsSUFBSTtvQkFDWixPQUFPLEVBQUUsS0FBSztpQkFDZDtnQkFDRDtvQkFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QixNQUFNLEVBQUUsY0FBYztvQkFDdEIsT0FBTyxFQUFFLEtBQUs7aUJBQ2Q7YUFDRCxDQUFDO1FBS0gsQ0FBQztRQUhBLHNCQUFJLDBCQUFPO2lCQUFYO2dCQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsQ0FBQzs7O1dBQUE7UUFDRixZQUFDO0lBQUQsQ0E3RUEsQUE2RUMsSUFBQTtJQTdFWSxhQUFLLFFBNkVqQixDQUFBIiwiZmlsZSI6ImRlbW9zL3NpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQmFzaWMge1xuXHRwdWJsaWMgZGF0YSA9IFtcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDgtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiTG9yZW1cIixcblx0XHRcdGJvb2xlYW46IHRydWUsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDctMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiaXBzdW1cIixcblx0XHRcdGJvb2xlYW46IHRydWUsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDYtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiZG9sb3JcIixcblx0XHRcdGJvb2xlYW46IHRydWUsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDUtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwic2l0XCIsXG5cdFx0XHRib29sZWFuOiB0cnVlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE2LTA0LTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImFtZXRcIixcblx0XHRcdGJvb2xlYW46IHRydWUsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDMtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiY29uc2VjdGV0dXJcIixcblx0XHRcdGJvb2xlYW46IHRydWUsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDItMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiYWRpcGlzY2luZ1wiLFxuXHRcdFx0Ym9vbGVhbjogdHJ1ZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKFwiMjAxNi0wMS0wMVwiKSxcblx0XHRcdHN0cmluZzogXCJlbGl0XCIsXG5cdFx0XHRib29sZWFuOiBmYWxzZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKFwiMjAxNS0xMi0wMVwiKSxcblx0XHRcdHN0cmluZzogXCJOdWxsYVwiLFxuXHRcdFx0Ym9vbGVhbjogZmFsc2UsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTUtMTEtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiaGVuZHJlcml0XCIsXG5cdFx0XHRib29sZWFuOiBmYWxzZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKFwiMjAxNS0xMC0wMVwiKSxcblx0XHRcdHN0cmluZzogXCJtYXR0aXNcIixcblx0XHRcdGJvb2xlYW46IGZhbHNlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE1LTA5LTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImVzdFwiLFxuXHRcdFx0Ym9vbGVhbjogZmFsc2UsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTUtMDgtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiYXRcIixcblx0XHRcdGJvb2xlYW46IGZhbHNlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE1LTA3LTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcInBlbGxlbnRlc3F1ZVwiLFxuXHRcdFx0Ym9vbGVhbjogZmFsc2UsXG5cdFx0fSxcblx0XTtcblxuXHRnZXQgcXVhcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhLnNsaWNlKDAsIDQpO1xuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
