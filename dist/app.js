define(["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = 'Vevida Datagrid';
            config.map([
                { route: ['', 'home'], name: 'intro', moduleId: 'dist/demos/intro' },
                { route: 'basic', name: 'basic', moduleId: 'dist/demos/basic', nav: true, title: "Basic Example" },
                { route: 'customsearch', name: 'customsearch', moduleId: 'dist/demos/customsearch', nav: true, title: "Custom searching" },
                { route: 'customsort', name: 'customsort', moduleId: 'dist/demos/customsort', nav: true, title: "Custom sorting" },
                { route: 'size', name: 'size', moduleId: 'dist/demos/size', nav: true, title: "Body sizes" },
            ]);
        };
        return App;
    }());
    exports.App = App;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUVBO1FBQUE7UUFjQSxDQUFDO1FBWEEsNkJBQWUsR0FBZixVQUFnQixNQUEyQixFQUFFLE1BQWM7WUFDMUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsTUFBTSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztZQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNWLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO2dCQUNwRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFO2dCQUNsRyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7Z0JBQzFILEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRTtnQkFDbEgsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTthQUM1RixDQUFDLENBQUM7UUFDSixDQUFDO1FBQ0YsVUFBQztJQUFELENBZEEsQUFjQyxJQUFBO0lBZFksV0FBRyxNQWNmLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSb3V0ZXJDb25maWd1cmF0aW9uLCBSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxuZXhwb3J0IGNsYXNzIEFwcCB7XG5cdHB1YmxpYyByb3V0ZXI6IFJvdXRlcjtcblxuXHRjb25maWd1cmVSb3V0ZXIoY29uZmlnOiBSb3V0ZXJDb25maWd1cmF0aW9uLCByb3V0ZXI6IFJvdXRlcik6IHZvaWQge1xuXHRcdHRoaXMucm91dGVyID0gcm91dGVyO1xuXHRcdGNvbmZpZy50aXRsZSA9ICdWZXZpZGEgRGF0YWdyaWQnO1xuXHRcdGNvbmZpZy5tYXAoW1xuXHRcdFx0eyByb3V0ZTogWycnLCAnaG9tZSddLCBuYW1lOiAnaW50cm8nLCBtb2R1bGVJZDogJ2Rpc3QvZGVtb3MvaW50cm8nIH0sXG5cdFx0XHR7IHJvdXRlOiAnYmFzaWMnLCBuYW1lOiAnYmFzaWMnLCBtb2R1bGVJZDogJ2Rpc3QvZGVtb3MvYmFzaWMnLCBuYXY6IHRydWUsIHRpdGxlOiBcIkJhc2ljIEV4YW1wbGVcIiB9LFxuXHRcdFx0eyByb3V0ZTogJ2N1c3RvbXNlYXJjaCcsIG5hbWU6ICdjdXN0b21zZWFyY2gnLCBtb2R1bGVJZDogJ2Rpc3QvZGVtb3MvY3VzdG9tc2VhcmNoJywgbmF2OiB0cnVlLCB0aXRsZTogXCJDdXN0b20gc2VhcmNoaW5nXCIgfSxcblx0XHRcdHsgcm91dGU6ICdjdXN0b21zb3J0JywgbmFtZTogJ2N1c3RvbXNvcnQnLCBtb2R1bGVJZDogJ2Rpc3QvZGVtb3MvY3VzdG9tc29ydCcsIG5hdjogdHJ1ZSwgdGl0bGU6IFwiQ3VzdG9tIHNvcnRpbmdcIiB9LFxuXHRcdFx0eyByb3V0ZTogJ3NpemUnLCBuYW1lOiAnc2l6ZScsIG1vZHVsZUlkOiAnZGlzdC9kZW1vcy9zaXplJywgbmF2OiB0cnVlLCB0aXRsZTogXCJCb2R5IHNpemVzXCIgfSxcblx0XHRdKTtcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
