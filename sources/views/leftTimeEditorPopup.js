const format = v => v < 10 ? "0" + v : v;


const hoursSliderHandler = function () {
	const value = format(this.getValue());
	const grid = $$("left");
	const sid = grid.getSelectedId();
	const cell = grid.getItem(sid.row);
	const [h, m] = cell.time.split(":");
	
	/***
	 * 	Enable or disable keyboard control
	 * */
	grid.updateItem(sid.row, {...cell,time: `${value}:${m}`});
	
	// grid.refresh();
};

const minutesSliderHandler = function () {
	const value = format(this.getValue());
	const grid = $$("left");
	const sid = grid.getSelectedId();
	const cell = grid.getItem(sid.row);
	const [h, m] = cell.time.split(":");
	
	grid.updateItem(sid.row, {...cell, time: `${h}:${value}`});
	
	// grid.refresh();
};

const slider_h = {
	view: "slider",
	id: "left:slider_h",
	title: obj => format(obj.value),
	min: 0,
	max: 23,
	on: {
		onItemClick: hoursSliderHandler,
		onSliderDrag: hoursSliderHandler
	}
};

const slider_m = {
	view: "slider",
	id: "left:slider_m",
	title: obj => format(obj.value),
	min: 0,
	max: 59,
	on: {
		onItemClick: minutesSliderHandler,
		onSliderDrag: minutesSliderHandler
	}
};


export default {
	view: "popup",
	id: "left:editWindow",
	width: 250,
	body: {
		view: "form",
		id: "left:form",
		scroll: false,
		elements: [
			slider_h,
			slider_m
		],
	}
};