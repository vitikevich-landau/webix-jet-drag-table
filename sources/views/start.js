import {records} from "../models/records";
import LeftDatatableView from "jet-views/LeftDatatableView";
import RightDatatableView from "jet-views/RightDatatableView";
import EmployeesListView from "jet-views/EmployeesListView";
// import TimeEditorPopupView from "jet-views/TimeEditorPopupView";

export default {
	type: "space",
	cols: [
		EmployeesListView,
		LeftDatatableView,
		RightDatatableView
	]
};
