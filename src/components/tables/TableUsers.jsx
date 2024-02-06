import { useMemo } from "react";
import "./Table.css";
import "./TableUsers.css";

// ag grid
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { TableCustomNoRowsOverlay } from "./TableCustomNoRowsOverlay";

const TableUsers = props => {
	const { rowData, colDefs } = props;

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			floatingFilter: true,
			suppressMovable: true,
		}),
		[]
	);

	return (
		<div className="ag-theme-quartz table table-users">
			<AgGridReact
				rowData={rowData}
				columnDefs={colDefs}
				defaultColDef={defaultColDef}
				pagination={true}
				noRowsOverlayComponent={TableCustomNoRowsOverlay}
			/>
		</div>
	);
};

export default TableUsers;
