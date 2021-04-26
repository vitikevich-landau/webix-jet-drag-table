import SourceDatatableView from "jet-views/SourceDatatableView";

export default class LeftDatatableView extends SourceDatatableView {
	config() {
		const {on, ...configs} = super.config();
		
		return {
			id: "left",
			on: {
				...on,
				onBeforeDrop: this.onBeforeDropHandler({action: "ВХОД"}),
				onItemClick: function (id, e, target) {
					const {column} = id;
					
					if (column === "time") {
						$$("left:editWindow").show(e);
						$$("left:editWindow").getBody().focus();
					}
					
				},
				onAfterSelect: function (data, preserve) {
					const selected = this.getItem(data.id);
					const [hourse, minutes] = selected.time.split(":");
					
					$$("left:slider_h").setValue(hourse);
					$$("left:slider_m").setValue(minutes);
				},
			},
			...configs
		};
	}
}