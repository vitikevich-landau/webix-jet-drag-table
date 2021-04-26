import {JetView} from "webix-jet";
import {records} from "../models/records";

export default class EmployeesListView extends JetView {
	config() {
		return {
			view: "list",
			width: 310,
			// data: records,
			template: "#index#. #fullname#",
			select: true,
			drag: "source",
			scroll: "auto",
			// css: "unselectable"
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(records);
		
		_$view.$view.oncontextmenu = () => false;
	}
	
	ready(_$view, _$url) {
		super.ready(_$view, _$url);
		
		/***
		 * 	Add dynamic indexes
		 * */
		_$view.data.each(function (obj, i) {
			obj.index = i + 1;
		});
		
		_$view.refresh();
		
	}
}