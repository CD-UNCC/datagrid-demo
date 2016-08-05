import {View, ViewSlot} from "aurelia-framework";

/**
 * Attaches a View to a ViewSlot, removing any existing Views.
 */
export function attachView(view: View, viewSlot: ViewSlot): Promise<any> {
	let attachView = () => {
		viewSlot.add(view);
		viewSlot.attached();
	};
	viewSlot.detached();
	let removeResponse = viewSlot.removeAll();
	if (removeResponse instanceof Promise) {
		return removeResponse.then(attachView);
	}
	attachView();
	return Promise.resolve(null);
}
