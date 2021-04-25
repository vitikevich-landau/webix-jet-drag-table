import SourceDatatableView from "jet-views/SourceDatatableView";

export default class RightDatatableView extends SourceDatatableView {
	config() {
		const {on, ...configs} = super.config();
		
		return {
			id: "right",
			save: "http://localhost",
			on: {
				...on,
				onBeforeDrop: this.onBeforeDropHandler({action: "ВЫХОД"}),
				onItemClick: function (id, e, target) {
					// console.log(id, e, target);
					const {column} = id;
					
					if (column === "time") {
						// console.log($$("editWindow"));
						$$("right:editWindow").show(e);
						$$("right:editWindow").getBody().focus();
					}
					
				},
				onAfterSelect: function (data, preserve) {
					const selected = this.getItem(data.id);
					const [hourse, minutes] = selected.time.split(":");
					
					$$("right:slider_h").setValue(hourse);
					$$("right:slider_m").setValue(minutes);
				},
			},
			...configs,
		};
	}
}