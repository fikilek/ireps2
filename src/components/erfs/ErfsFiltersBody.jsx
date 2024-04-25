import ErfsFilterAreas from "./ErfsFilterAreas";
import ErfsFilterData from "./ErfsFilterData";
// import "./ErfsFiltersBody.css";

const ErfsFiltersBody = props => {
	const { filter } = props;
	return (
		<div className="erfs-filters-body">
			{filter === "data" && <ErfsFilterData />}
			{filter === "areas" && <ErfsFilterAreas />}
		</div>
	);
};

export default ErfsFiltersBody;
