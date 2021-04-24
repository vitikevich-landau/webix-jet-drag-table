import {JetView, plugins} from "webix-jet";


export default class TopView extends JetView {
	config() {
		return {
			cols: [
				{
					rows: [
						{$subview: true}
					]
				}
			]
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		webix.i18n.setLocale("ru-RU");
	}
	
	ready(_$view, _$url) {
		super.ready(_$view, _$url);
		
		$$("target").$view.oncontextmenu = () => false;
		$$("source").$view.oncontextmenu = () => false;
	}
}