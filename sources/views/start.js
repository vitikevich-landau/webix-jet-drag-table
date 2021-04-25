import {records} from "../models/records";
import LeftDatatableView from "jet-views/LeftDatatableView";
import RightDatatableView from "jet-views/RightDatatableView";
// import TimeEditorPopupView from "jet-views/TimeEditorPopupView";

export default {
	type: "space",
	cols: [
		// TimeEditorPopupView,
		{
			view: "list",
			width: 320,
			data: records,
			template: "#title#",
			select: true,
			drag: "source",
			scroll: "auto"
		},
		// {
		// 	width: 330,
		// 	view: "datatable",
		// 	id: "source",
		// 	columns: [
		// 		{id: "title", header: "ФИО", fillspace: true},
		// 	],
		// 	data: records,
		// 	select: true,
		// 	drag: "source"
		// },
		LeftDatatableView,
		RightDatatableView
	]
};
