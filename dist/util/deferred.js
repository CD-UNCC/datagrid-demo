define(["require", "exports"], function (require, exports) {
    "use strict";
    var Deferred = (function () {
        function Deferred() {
            var _this = this;
            this.state = "pending";
            this.fate = "unresolved";
            this.promise = new Promise(function (resolve, reject) {
                _this._resolve = resolve;
                _this._reject = reject;
            });
            this.promise.then(function () { return _this.state = "fulfilled"; }, function () { return _this.state = "rejected"; });
        }
        Deferred.prototype.resolve = function (value) {
            if (this.fate === "resolved") {
                throw "Deferred cannot be resolved twice";
            }
            this.fate = "resolved";
            this._resolve(value);
        };
        Deferred.prototype.reject = function (reason) {
            if (this.fate === "resolved") {
                throw "Deferred cannot be resolved twice";
            }
            this.fate = "resolved";
            this._reject(reason);
        };
        Deferred.prototype.isResolved = function () {
            return this.fate === "resolved";
        };
        Deferred.prototype.isPending = function () {
            return this.state === "pending";
        };
        Deferred.prototype.isFulfilled = function () {
            return this.state === "fulfilled";
        };
        Deferred.prototype.isRejected = function () {
            return this.state === "rejected";
        };
        return Deferred;
    }());
    exports.Deferred = Deferred;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvZGVmZXJyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFHQTtRQVNDO1lBVEQsaUJBcURDO1lBM0NDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQkFDMUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2hCLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsRUFBeEIsQ0FBd0IsRUFDOUIsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUF2QixDQUF1QixDQUM3QixDQUFDO1FBQ0gsQ0FBQztRQUVELDBCQUFPLEdBQVAsVUFBUSxLQUFXO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxtQ0FBbUMsQ0FBQztZQUMzQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBRUQseUJBQU0sR0FBTixVQUFPLE1BQVk7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLG1DQUFtQyxDQUFDO1lBQzNDLENBQUM7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFFRCw2QkFBVSxHQUFWO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO1FBQ2pDLENBQUM7UUFFRCw0QkFBUyxHQUFUO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQ2pDLENBQUM7UUFFRCw4QkFBVyxHQUFYO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssV0FBVyxDQUFDO1FBQ25DLENBQUM7UUFFRCw2QkFBVSxHQUFWO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDO1FBQ2xDLENBQUM7UUFDRixlQUFDO0lBQUQsQ0FyREEsQUFxREMsSUFBQTtJQXJEWSxnQkFBUSxXQXFEcEIsQ0FBQSIsImZpbGUiOiJ1dGlsL2RlZmVycmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kb21lbmljL3Byb21pc2VzLXVud3JhcHBpbmcvYmxvYi9tYXN0ZXIvZG9jcy9zdGF0ZXMtYW5kLWZhdGVzLm1kXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZlcnJlZDxUPiB7XG5cdHB1YmxpYyBwcm9taXNlOiBQcm9taXNlPFQ+O1xuXG5cdHByaXZhdGUgZmF0ZTogXCJyZXNvbHZlZFwiIHwgXCJ1bnJlc29sdmVkXCI7XG5cdHByaXZhdGUgc3RhdGU6IFwicGVuZGluZ1wiIHwgXCJmdWxmaWxsZWRcIiB8IFwicmVqZWN0ZWRcIjtcblxuXHRwcml2YXRlIF9yZXNvbHZlOiBGdW5jdGlvbjtcblx0cHJpdmF0ZSBfcmVqZWN0OiBGdW5jdGlvbjtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnN0YXRlID0gXCJwZW5kaW5nXCI7XG5cdFx0dGhpcy5mYXRlID0gXCJ1bnJlc29sdmVkXCI7XG5cdFx0dGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XG5cdFx0XHR0aGlzLl9yZWplY3QgPSByZWplY3Q7XG5cdFx0fSk7XG5cdFx0dGhpcy5wcm9taXNlLnRoZW4oXG5cdFx0XHQoKSA9PiB0aGlzLnN0YXRlID0gXCJmdWxmaWxsZWRcIixcblx0XHRcdCgpID0+IHRoaXMuc3RhdGUgPSBcInJlamVjdGVkXCJcblx0XHQpO1xuXHR9XG5cblx0cmVzb2x2ZSh2YWx1ZT86IGFueSkge1xuXHRcdGlmICh0aGlzLmZhdGUgPT09IFwicmVzb2x2ZWRcIikge1xuXHRcdFx0dGhyb3cgXCJEZWZlcnJlZCBjYW5ub3QgYmUgcmVzb2x2ZWQgdHdpY2VcIjtcblx0XHR9XG5cdFx0dGhpcy5mYXRlID0gXCJyZXNvbHZlZFwiO1xuXHRcdHRoaXMuX3Jlc29sdmUodmFsdWUpO1xuXHR9XG5cblx0cmVqZWN0KHJlYXNvbj86IGFueSkge1xuXHRcdGlmICh0aGlzLmZhdGUgPT09IFwicmVzb2x2ZWRcIikge1xuXHRcdFx0dGhyb3cgXCJEZWZlcnJlZCBjYW5ub3QgYmUgcmVzb2x2ZWQgdHdpY2VcIjtcblx0XHR9XG5cdFx0dGhpcy5mYXRlID0gXCJyZXNvbHZlZFwiO1xuXHRcdHRoaXMuX3JlamVjdChyZWFzb24pO1xuXHR9XG5cblx0aXNSZXNvbHZlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5mYXRlID09PSBcInJlc29sdmVkXCI7XG5cdH1cblxuXHRpc1BlbmRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUgPT09IFwicGVuZGluZ1wiO1xuXHR9XG5cblx0aXNGdWxmaWxsZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUgPT09IFwiZnVsZmlsbGVkXCI7XG5cdH1cblxuXHRpc1JlamVjdGVkKCkge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlID09PSBcInJlamVjdGVkXCI7XG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
