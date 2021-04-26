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
			
			setTimeout(function () {
				isThrottled = false; // (3)
				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					savedArgs = savedThis = null;
				}
			}, ms);
		}
		
		return wrapper;
	}
	
	clearFilters() {
		this.eachColumn((id, col) => {
			const filter = this.getFilter(id);
			if (filter) {
				if (filter.setValue) filter.setValue("");
				else filter.value = "";
			}
		});
		
		this.filterByAll();
	}
	
	clearSorts() {
		this.eachColumn(() => this.markSorting());
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
				
				webix.confirm({
					title: "Внимание!",
					type: "confirm-warning",
					text: "Это приведёт к удалению из БД. Удалить запись?"
				})
					.then(() => {
						this.remove(selected);
						
						if (next) {
							this.select(next);
						}
						
						this.getBody().focus();
						
						// this.fo
					});
			}
		}
	}
	
	onBeforeDropHandler(options) {
		const self = this;
		return function (ctx, e) {
			const {from, source} = ctx;
			const now = new Date;
			
			this.add({
				fullname: from.getItem(source[0]).fullname,
				date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
				time: webix.Date.dateToStr("%H:%i")(now),
				// time: now,
				...options
			});
			
			this.sort("id", "desc");
			
			/***
			 * 	Сбросить фильтры
			 * */
			self.clearFilters.call(this);
			// this.filterByAll();
			// this.refreshFilter();
			
			/***
			 * 	Сбросить сортировки
			 * */
			self.clearSorts.call(this);
			
			
			this.select(this.getFirstId());
			
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
		const proxy = webix.proxy("rest", "http://localhost", {
			save: this.throttle(function (view, params) {
				return webix.proxy.rest.save.call(this, view, params);
			}, 1500)
		});
		
		return {
			view: "datatable",
			save: proxy,
			columns: [
				{
					id: "fullname",
					header: ["ФИО", {content: "textFilter"}],
					fillspace: true,
					sort: "string"
				},
				{
					id: "action",
					header: ["Действие", ""]
				},
				{
					width: 140,
					id: "date",
					header: ["Дата", {content: "datepickerFilter"}],
					editor: "date",
					// format: dateObj => webix.Date.dateToStr("%d.%m.%Y")(dateObj)
					format:webix.i18n.dateFormatStr
				},
				{
					id: "time",
					header: ["Время", ""],
					sort: "string"
					//format: dateObj => webix.Date.dateToStr("%H:%i")(dateObj)
				}
			],
			editable: true,
			drag: "target",
			select: true,
			// datathrottle: 500,
			css: "unselectable",
			on: {
				onKeyPress: this.onKeyPressHandler,
				onHeaderClick: this.onHeaderClickHandler,
				onAfterEditStop: function (state, editor, ignoreUpdate) {
					this.filterByAll();
				}
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
				id: "date:popup",
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
					],
				}
			},
		};
		
		
	}
	
}