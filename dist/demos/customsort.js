define(["require", "exports"], function (require, exports) {
    "use strict";
    var Customsort = (function () {
        function Customsort() {
            this.data = [
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
        }
        Customsort.prototype.sortOnPriorityThenString = function (aValues, bValues) {
            var aPrio = aValues[0] == "high" ? 2 : aValues[0] == "medium" ? 1 : 0;
            var bPrio = bValues[0] == "high" ? 2 : bValues[0] == "medium" ? 1 : 0;
            if (aPrio != bPrio) {
                return bPrio - aPrio;
            }
            return aValues[1].localeCompare(bValues[1]);
        };
        return Customsort;
    }());
    exports.Customsort = Customsort;
});

//# sourceMappingURL=data:application/json;base64,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QyxDQUFDO2dCQUNwQixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN0QixDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNGLGlCQUFDO0lBQUQsQ0FsRkEsQUFrRkMsSUFBQTtJQWxGWSxrQkFBVSxhQWtGdEIsQ0FBQSIsImZpbGUiOiJkZW1vcy9jdXN0b21zb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEN1c3RvbXNvcnQge1xuXHRwdWJsaWMgZGF0YSA9IFtcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDgtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiTG9yZW1cIixcblx0XHRcdHByaW9yaXR5OiBcImhpZ2hcIixcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKFwiMjAxNi0wNy0wMVwiKSxcblx0XHRcdHN0cmluZzogXCJpcHN1bVwiLFxuXHRcdFx0cHJpb3JpdHk6IFwibWVkaXVtXCIsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDYtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiZG9sb3JcIixcblx0XHRcdHByaW9yaXR5OiBcImxvd1wiLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE2LTA1LTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcInNpdFwiLFxuXHRcdFx0cHJpb3JpdHk6IFwibG93XCIsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDQtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiYW1ldFwiLFxuXHRcdFx0cHJpb3JpdHk6IFwiaGlnaFwiLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE2LTAzLTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImNvbnNlY3RldHVyXCIsXG5cdFx0XHRwcmlvcml0eTogXCJsb3dcIixcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKFwiMjAxNi0wMi0wMVwiKSxcblx0XHRcdHN0cmluZzogXCJhZGlwaXNjaW5nXCIsXG5cdFx0XHRwcmlvcml0eTogXCJoaWdoXCIsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTYtMDEtMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiZWxpdFwiLFxuXHRcdFx0cHJpb3JpdHk6IFwibG93XCIsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTUtMTItMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiTnVsbGFcIixcblx0XHRcdHByaW9yaXR5OiBcIm1lZGl1bVwiLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE1LTExLTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcImhlbmRyZXJpdFwiLFxuXHRcdFx0cHJpb3JpdHk6IFwiaGlnaFwiLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoXCIyMDE1LTEwLTAxXCIpLFxuXHRcdFx0c3RyaW5nOiBcIm1hdHRpc1wiLFxuXHRcdFx0cHJpb3JpdHk6IFwibG93XCIsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTUtMDktMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwiZXN0XCIsXG5cdFx0XHRwcmlvcml0eTogXCJtZWRpdW1cIixcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRhdGU6IG5ldyBEYXRlKFwiMjAxNS0wOC0wMVwiKSxcblx0XHRcdHN0cmluZzogXCJhdFwiLFxuXHRcdFx0cHJpb3JpdHk6IFwibWVkaXVtXCIsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRkYXRlOiBuZXcgRGF0ZShcIjIwMTUtMDctMDFcIiksXG5cdFx0XHRzdHJpbmc6IFwicGVsbGVudGVzcXVlXCIsXG5cdFx0XHRwcmlvcml0eTogXCJtZWRpdW1cIixcblx0XHR9LFxuXHRdO1xuXG5cdHNvcnRPblByaW9yaXR5VGhlblN0cmluZyhhVmFsdWVzOiBhbnlbXSwgYlZhbHVlczogYW55W10pOiBudW1iZXIge1xuXHRcdGxldCBhUHJpbyA9IGFWYWx1ZXNbMF0gPT0gXCJoaWdoXCIgPyAyIDogYVZhbHVlc1swXSA9PSBcIm1lZGl1bVwiID8gMSA6IDA7XG5cdFx0bGV0IGJQcmlvID0gYlZhbHVlc1swXSA9PSBcImhpZ2hcIiA/IDIgOiBiVmFsdWVzWzBdID09IFwibWVkaXVtXCIgPyAxIDogMDtcblx0XHRpZiAoYVByaW8gIT0gYlByaW8pIHtcblx0XHRcdHJldHVybiBiUHJpbyAtIGFQcmlvO1xuXHRcdH1cblx0XHRyZXR1cm4gYVZhbHVlc1sxXS5sb2NhbGVDb21wYXJlKGJWYWx1ZXNbMV0pO1xuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
