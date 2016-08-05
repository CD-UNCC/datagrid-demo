var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../converters/simpledateformatter"], function (require, exports, aurelia_framework_1, simpledateformatter_1) {
    "use strict";
    var Customsearch = (function () {
        function Customsearch(dateFormatter) {
            this.dateFormatter = dateFormatter;
            this.data = [
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
        }
        Customsearch.prototype.searchFormattedDate = function (term, values) {
            var formatted = this.dateFormatter.toView(values[0]).toLowerCase();
            return formatted.indexOf(term.trim().toLowerCase()) !== -1;
        };
        Customsearch = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [simpledateformatter_1.SimpledateformatterValueConverter])
        ], Customsearch);
        return Customsearch;
    }());
    exports.Customsearch = Customsearch;
});

//# sourceMappingURL=data:application/json;base64,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WUFBQyw4QkFBVTs7d0JBQUE7UUEyQlgsbUJBQUM7SUFBRCxDQTFCQSxBQTBCQyxJQUFBO0lBMUJZLG9CQUFZLGVBMEJ4QixDQUFBIiwiZmlsZSI6ImRlbW9zL2N1c3RvbXNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXV0b2luamVjdH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XG5pbXBvcnQge1NpbXBsZWRhdGVmb3JtYXR0ZXJWYWx1ZUNvbnZlcnRlcn0gZnJvbSBcIi4uL2NvbnZlcnRlcnMvc2ltcGxlZGF0ZWZvcm1hdHRlclwiO1xuXG5AYXV0b2luamVjdFxuZXhwb3J0IGNsYXNzIEN1c3RvbXNlYXJjaCB7XG5cdHB1YmxpYyBkYXRhID0gW1xuXHRcdHsgYTogbmV3IERhdGUoXCIyMDE2LTA4LTAxXCIpLCBiOiBuZXcgRGF0ZShcIjIwMTYtMDEtMDFcIikgfSxcblx0XHR7IGE6IG5ldyBEYXRlKFwiMjAxNi0wNy0wMVwiKSwgYjogbmV3IERhdGUoXCIyMDE1LTEyLTAxXCIpIH0sXG5cdFx0eyBhOiBuZXcgRGF0ZShcIjIwMTYtMDYtMDFcIiksIGI6IG5ldyBEYXRlKFwiMjAxNS0xMS0wMVwiKSB9LFxuXHRcdHsgYTogbmV3IERhdGUoXCIyMDE2LTA1LTAxXCIpLCBiOiBuZXcgRGF0ZShcIjIwMTUtMTAtMDFcIikgfSxcblx0XHR7IGE6IG5ldyBEYXRlKFwiMjAxNi0wNC0wMVwiKSwgYjogbmV3IERhdGUoXCIyMDE1LTA5LTAxXCIpIH0sXG5cdFx0eyBhOiBuZXcgRGF0ZShcIjIwMTYtMDMtMDFcIiksIGI6IG5ldyBEYXRlKFwiMjAxNS0wOC0wMVwiKSB9LFxuXHRcdHsgYTogbmV3IERhdGUoXCIyMDE2LTAyLTAxXCIpLCBiOiBuZXcgRGF0ZShcIjIwMTUtMDctMDFcIikgfSxcblx0XHR7IGE6IG5ldyBEYXRlKFwiMjAxNi0wMS0wMVwiKSwgYjogbmV3IERhdGUoXCIyMDE1LTA2LTAxXCIpIH0sXG5cdFx0eyBhOiBuZXcgRGF0ZShcIjIwMTUtMTItMDFcIiksIGI6IG5ldyBEYXRlKFwiMjAxNS0wNS0wMVwiKSB9LFxuXHRcdHsgYTogbmV3IERhdGUoXCIyMDE1LTExLTAxXCIpLCBiOiBuZXcgRGF0ZShcIjIwMTUtMDQtMDFcIikgfSxcblx0XHR7IGE6IG5ldyBEYXRlKFwiMjAxNS0xMC0wMVwiKSwgYjogbmV3IERhdGUoXCIyMDE1LTAzLTAxXCIpIH0sXG5cdFx0eyBhOiBuZXcgRGF0ZShcIjIwMTUtMDktMDFcIiksIGI6IG5ldyBEYXRlKFwiMjAxNS0wMi0wMVwiKSB9LFxuXHRcdHsgYTogbmV3IERhdGUoXCIyMDE1LTA4LTAxXCIpLCBiOiBuZXcgRGF0ZShcIjIwMTUtMDEtMDFcIikgfSxcblx0XHR7IGE6IG5ldyBEYXRlKFwiMjAxNS0wNy0wMVwiKSwgYjogbmV3IERhdGUoXCIyMDE0LTEyLTAxXCIpIH0sXG5cdFx0eyBhOiBuZXcgRGF0ZShcIjIwMTUtMDYtMDFcIiksIGI6IG5ldyBEYXRlKFwiMjAxNC0xMS0wMVwiKSB9LFxuXHRdO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlRm9ybWF0dGVyOiBTaW1wbGVkYXRlZm9ybWF0dGVyVmFsdWVDb252ZXJ0ZXIpIHtcblx0fVxuXG5cdHNlYXJjaEZvcm1hdHRlZERhdGUodGVybTogc3RyaW5nLCB2YWx1ZXM6IERhdGVbXSkge1xuXHRcdGNvbnN0IGZvcm1hdHRlZCA9IHRoaXMuZGF0ZUZvcm1hdHRlci50b1ZpZXcodmFsdWVzWzBdKS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiBmb3JtYXR0ZWQuaW5kZXhPZih0ZXJtLnRyaW0oKS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
