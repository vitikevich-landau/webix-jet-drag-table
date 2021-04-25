import SourceDatatableView from "jet-views/SourceDatatableView";

export default class LeftDatatableView extends SourceDatatableView {
	config() {
		const {on, ...configs} = super.config();
		
		return {
			id: "left",
			// save: "http://localhost",
			save: this.throttle(function (a, b, c, d) {
				console.log(a, b, c, d);
				// return webix.ajax().get()
			}, 1000),
			on: {
				...on,
				onBeforeDrop: this.onBeforeDropHandler({action: "ВХОД"}),
				onItemClick: function (id, e, target) {
					// console.log(id, e, target);
					const {column} = id;
					
					if (column === "time") {
						// console.log($$("editWindow"));
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