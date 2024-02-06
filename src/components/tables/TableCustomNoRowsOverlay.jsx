import { RingLoader } from "react-spinners";

export const TableCustomNoRowsOverlay = props => {
	const override = {
		display: "block",
		margin: "0 auto",
		borderColor: "red",
	};

	return (
		<div
			className="ag-overlay-loading-center"
			style={{ backgroundColor: "#e6ffe6", height: "70%" }}
		>
			<RingLoader
				color={"#ff99ff"}
				loading={true}
				cssOverride={override}
				size={200}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};
