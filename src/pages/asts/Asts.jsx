import "./Asts.css";
// import AstsFilters from "../../components/asts/AstsFilters";
// import AstsMain from "../../components/asts/AstsMain";
import AstsHeader from "../../components/asts/AstsHeader";
import { useContext } from "react";
import { AstsContext } from "../../contexts/AstsContext";
import AstsTable from "../../components/asts/AstsTable";

const Asts = () => {
	// const { astsContext } = useContext(AstsContext);
	return (
		<div className="asts">
			<AstsHeader phLl="Asts" />
			<div className="asts-body">
				{/* {astsContext.filterBtn ? <AstsFilters /> : null} */}
				<AstsTable />
			</div>
		</div>
	);
};

export default Asts;
