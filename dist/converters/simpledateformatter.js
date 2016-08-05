define(["require", "exports"], function (require, exports) {
    "use strict";
    var SimpledateformatterValueConverter = (function () {
        function SimpledateformatterValueConverter() {
        }
        SimpledateformatterValueConverter.prototype.toView = function (date) {
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            return SimpledateformatterValueConverter.MONTH_NAMES[monthIndex] + " " + day + ", " + year;
        };
        SimpledateformatterValueConverter.MONTH_NAMES = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        return SimpledateformatterValueConverter;
    }());
    exports.SimpledateformatterValueConverter = SimpledateformatterValueConverter;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnZlcnRlcnMvc2ltcGxlZGF0ZWZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBO1FBQUE7UUFjQSxDQUFDO1FBTkEsa0RBQU0sR0FBTixVQUFPLElBQVU7WUFDaEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUIsTUFBTSxDQUFDLGlDQUFpQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7UUFDNUYsQ0FBQztRQVpjLDZDQUFXLEdBQUc7WUFDNUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPO1lBQzlCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUIsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTO1lBQ2hDLFVBQVUsRUFBRSxVQUFVO1NBQ3RCLENBQUM7UUFRSCx3Q0FBQztJQUFELENBZEEsQUFjQyxJQUFBO0lBZFkseUNBQWlDLG9DQWM3QyxDQUFBIiwiZmlsZSI6ImNvbnZlcnRlcnMvc2ltcGxlZGF0ZWZvcm1hdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTaW1wbGVkYXRlZm9ybWF0dGVyVmFsdWVDb252ZXJ0ZXIge1xuXHRwcml2YXRlIHN0YXRpYyBNT05USF9OQU1FUyA9IFtcblx0XHRcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsXG5cdFx0XCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsXG5cdFx0XCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsXG5cdFx0XCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJcblx0XTtcblxuXHR0b1ZpZXcoZGF0ZTogRGF0ZSkge1xuXHRcdHZhciBkYXkgPSBkYXRlLmdldERhdGUoKTtcblx0XHR2YXIgbW9udGhJbmRleCA9IGRhdGUuZ2V0TW9udGgoKTtcblx0XHR2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblx0XHRyZXR1cm4gU2ltcGxlZGF0ZWZvcm1hdHRlclZhbHVlQ29udmVydGVyLk1PTlRIX05BTUVTW21vbnRoSW5kZXhdICsgXCIgXCIgKyBkYXkgKyBcIiwgXCIgKyB5ZWFyO1xuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
