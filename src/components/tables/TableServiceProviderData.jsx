import "./Table.css";
import "./TableServiceProviderData.css";
import { TableCustomNoRowsOverlay } from "./TableCustomNoRowsOverlay";
import { useMemo } from "react";

// ag grid
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TableServiceProviderData = props => {
	const { rowData, colDefs } = props;

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			suppressMovable: true,
		}),
		[]
	);

	return (
		<div className="ag-theme-quartz table table-service-provider-data">
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

export default TableServiceProviderData;
