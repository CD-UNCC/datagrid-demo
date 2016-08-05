define(["require", "exports"], function (require, exports) {
    "use strict";
    function attachView(view, viewSlot) {
        var attachView = function () {
            viewSlot.add(view);
            viewSlot.attached();
        };
        viewSlot.detached();
        var removeResponse = viewSlot.removeAll();
        if (removeResponse instanceof Promise) {
            return removeResponse.then(attachView);
        }
        attachView();
        return Promise.resolve(null);
    }
    exports.attachView = attachView;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvdGVtcGxhdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUtBLG9CQUEyQixJQUFVLEVBQUUsUUFBa0I7UUFDeEQsSUFBSSxVQUFVLEdBQUc7WUFDaEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDO1FBQ0YsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxjQUFjLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQ0QsVUFBVSxFQUFFLENBQUM7UUFDYixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBWmUsa0JBQVUsYUFZekIsQ0FBQSIsImZpbGUiOiJ1dGlsL3RlbXBsYXRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZpZXcsIFZpZXdTbG90fSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcblxuLyoqXG4gKiBBdHRhY2hlcyBhIFZpZXcgdG8gYSBWaWV3U2xvdCwgcmVtb3ZpbmcgYW55IGV4aXN0aW5nIFZpZXdzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoVmlldyh2aWV3OiBWaWV3LCB2aWV3U2xvdDogVmlld1Nsb3QpOiBQcm9taXNlPGFueT4ge1xuXHRsZXQgYXR0YWNoVmlldyA9ICgpID0+IHtcblx0XHR2aWV3U2xvdC5hZGQodmlldyk7XG5cdFx0dmlld1Nsb3QuYXR0YWNoZWQoKTtcblx0fTtcblx0dmlld1Nsb3QuZGV0YWNoZWQoKTtcblx0bGV0IHJlbW92ZVJlc3BvbnNlID0gdmlld1Nsb3QucmVtb3ZlQWxsKCk7XG5cdGlmIChyZW1vdmVSZXNwb25zZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcblx0XHRyZXR1cm4gcmVtb3ZlUmVzcG9uc2UudGhlbihhdHRhY2hWaWV3KTtcblx0fVxuXHRhdHRhY2hWaWV3KCk7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
