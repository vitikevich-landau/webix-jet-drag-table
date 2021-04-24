import {records} from "../models/records";

export default {
	type: "space",
	cols: [
		{
			width: 330,
			view: "datatable",
			id: "source",
			columns: [
				{id: "title", header: "ФИО", fillspace: true},
			],
			data: records,
			select: true,
			drag: "source"
		},
		{
			view: "datatable",
			id: "target",
			columns: [
				{id: "title", header: "ФИО", fillspace: true},
				{id: "action", header: "Действие"},
				{id: "date", header: "Дата"},
				{id: "time", header: "Время"}
			],
			drag: "target",
			select: true,
			on: {
				onBeforeDrop: function (ctx, e) {
					const {button} = e;
					const {from, source} = ctx;
					const now = new Date;
					
					const add = obj => this.add({
						title: from.getItem(source[0]).title,
						date: webix.Date.dateToStr("%d.%m.%Y")(now),
						time: webix.Date.dateToStr("%H:%i")(now),
						...obj
					});
					
					switch (button) {
						case 0:
							add({action: "ВХОД"});
							break;
						case 2:
							add({action: "ВЫХОД"});
							break;
					}
					
					this.sort("id", "desc");
					return false;
				},
				onKeyPress: function (code, e) {
					if (code === 46) {
						const selected = this.getSelectedId();
						if (selected) {
							const next = this.getNextId(selected);
							if (next) {
								this.select(next);
							}
							
							this.remove(selected);
						}
					}
					
					
					// console.log(code, e);
				}
			},
		}
	]
};
