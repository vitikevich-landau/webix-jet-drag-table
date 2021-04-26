const format = v => v < 10 ? "0" + v : v;


const hoursSliderHandler = function () {
	const value = format(this.getValue());
	const grid = $$("right");
	const sid = grid.getSelectedId();
	const cell = grid.getItem(sid.row);
	const [h, m] = cell.time.split(":");
	cell["time"] = `${value}:${m}`;
	
	grid.refresh();
};

const minutesSliderHandler = function () {
	const value = format(this.getValue());
	const grid = $$("right");
	const sid = grid.getSelectedId();
	const cell = grid.getItem(sid.row);
	const [h, m] = cell.time.split(":");
	cell["time"] = `${h}:${value}`;
	
	grid.refresh();
};

const slider_h = {
	view: "slider",
	id: "right:slider_h",
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
	id: "right:slider_m",
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
	id: "right:editWindow",
	width: 250,
	body: {
		view: "form",
		id: "right:form",
		scroll: false,
		elements: [
			slider_h,
			slider_m
		],
	}
};