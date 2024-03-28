import { useContext } from "react";
import "./PageHeader.css";
import { AreaTreeContext } from "../contexts/AreaTreeContext";
import PageTitle from "./PageTitle";

const PageHeader = props => {
	const { phLl } = props;
	const { selected } = useContext(AreaTreeContext);
	// console.log(`selected`, selected);

	return (
		<div className="page-header">
			<div className="ph ph-left">
				<PageTitle titel={phLl} />
			</div>

			<div className="ph ph-right">
				{props.children}
				<p>{selected?.element?.name}</p>
			</div>
		</div>
	);
};

export default PageHeader;
