import {JetView, plugins} from "webix-jet";
import leftTimeEditorPopup from "jet-views/leftTimeEditorPopup";
import rightTimeEditorPopup from "jet-views/rightTimeEditorPopup";

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
		
		webix.ui(leftTimeEditorPopup);
		webix.ui(rightTimeEditorPopup);
	}
}