import {JetView, plugins} from "webix-jet";
import LeftTimeEditorPopup from "jet-views/LeftTimeEditorPopup";
import RightTimeEditorPopup from "jet-views/RightTimeEditorPopup";

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
		
		webix.ui(LeftTimeEditorPopup);
		webix.ui(RightTimeEditorPopup);
	}
}