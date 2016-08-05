import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
	public router: Router;

	configureRouter(config: RouterConfiguration, router: Router): void {
		this.router = router;
		config.title = 'Vevida Datagrid';
		config.map([
			{ route: ['', 'home'], name: 'intro', moduleId: 'dist/demos/intro' },
			{ route: 'basic', name: 'basic', moduleId: 'dist/demos/basic', nav: true, title: "Basic Example" },
			{ route: 'customsearch', name: 'customsearch', moduleId: 'dist/demos/customsearch', nav: true, title: "Custom searching" },
			{ route: 'customsort', name: 'customsort', moduleId: 'dist/demos/customsort', nav: true, title: "Custom sorting" },
			{ route: 'size', name: 'size', moduleId: 'dist/demos/size', nav: true, title: "Body sizes" },
		]);
	}
}
