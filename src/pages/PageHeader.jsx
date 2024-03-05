import { useContext } from "react";
import "./PageHeader.css";
import { AreaTreeContext } from "../contexts/AreaTreeContext";

const PageHeader = props => {
	const { phLl } = props;
	const { selected } = useContext(AreaTreeContext);
	// console.log(`selected`, selected);

	return (
		<div className="page-header">
			<div className="ph ph-left">
				<p>{phLl}</p>
			</div>

			<div className="ph ph-right">
				{props.children}
				<p>{selected?.element?.name}</p>
			</div>
		</div>
	);
};

export default PageHeader;
