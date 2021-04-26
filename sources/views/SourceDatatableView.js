import {JetView} from "webix-jet";

export default class SourceDatatableView extends JetView {
	throttle(func, ms) {
		let isThrottled = false,
			savedArgs,
			savedThis;
		
		function wrapper() {
			if (isThrottled) { // (2)
				savedArgs = arguments;
				savedThis = this;
				return;
			}
			
			func.apply(this, arguments); // (1)
			
			isThrottled = true;
			
			setTimeout(function() {
				isThrottled = false; // (3)
				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					savedArgs = savedThis = null;
				}
			}, ms);
		}
		
		return wrapper;
	}
	
	onKeyPressHandler(code, e) {
		if (code === 46) {
			/***
			 * 	Close all opened editors
			 * */
			this.editCancel();
			
			const selected = this.getSelectedId();
			if (selected) {
				const next = this.getNextId(selected);
				if (next) {
					this.select(next);
				}
				
				this.remove(selected);
			}
		}
	}
	
	onBeforeDropHandler(options) {
		return function (ctx, e) {
			const {from, source} = ctx;
			const now = new Date;
			
			this.add({
				title: from.getItem(source[0]).title,
				date: now,
				time: webix.Date.dateToStr("%H:%i")(now),
				...options
			});
			
			this.sort("id", "desc");
			return false;
		};
	}
	
	onHeaderClickHandler(id, e, target) {
		const state = this.getState().sort;
		if (state && state.dir === "desc") {
			this.sort({
				as: "int",
				dir: "asc",
				by: "id"
			});
			this.markSorting();
			this.setState(state);
			
			return false;
		}
	}
	
	config() {
		return {
			view: "datatable",
			columns: [
				{id: "title", header: "ФИО", fillspace: true, sort: "string"},
				{id: "action", header: "Действие"},
				{
					id: "date",
					header: "Дата",
					editor: "date",
					format: dateObj => webix.Date.dateToStr("%d.%m.%Y")(dateObj)
				},
				{
					id: "time",
					header: "Время",
				}
			],
			editable: true,
			drag: "target",
			select: true,
			// datathrottle: 500,
			on: {
				onKeyPress: this.onKeyPressHandler,
				onHeaderClick: this.onHeaderClickHandler
			}
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.$view.oncontextmenu = () => false;
		
		/***
		 * 	disable clear button
		 * */
		webix.editors.$popup = {
			date: {
				view: "popup",
				body: {
					view: "calendar",
					icons: [
						{
							template: () => "<span class='webix_cal_icon_today webix_cal_icon'>"
								+ webix.i18n.calendar.today
								+ "</span>",
							on_click: {
								webix_cal_icon_today: function () {
									this.setValue(new Date());
									this.callEvent("onTodaySet", [this.getSelectedDate()]);
								}
							}
						},
					]
				}
			},
		};
	}
}