import "./Table.css";
import "./TableServiceProviders.css";
import { TableCustomNoRowsOverlay } from "./TableCustomNoRowsOverlay";
import { useMemo } from "react";

// ag grid
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import TableBtnAddServiceProvider from "./TableBtnAddServiceProvider";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TableServiceProviders = props => {
// console.log(`props`, props)
	const { rowData, columnDefs } = props;

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

	const getRowId = params => {
		return params.data.id;
	};

	return (
		<div className="ag-theme-quartz table table-service-providers">
			<TableBtnAddServiceProvider />
			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				pagination={true}
				noRowsOverlayComponent={TableCustomNoRowsOverlay}
				getRowId={getRowId}
			/>
		</div>
	);
};

export default TableServiceProviders;
