import { flattenTree } from "react-accessible-treeview";
import { tree } from "../../pages/administrativeAreas/AdministrativeAreas";
import TreeAdministrativeAreas from "../trees/TreeAdministrativeAreas";
import "./ErfsFilterAreas.css";

const ErfsFilterAreas = () => {
  
	const flattenedTree = flattenTree(tree);
	// console.log(`flattenedTree`, flattenedTree);
  return (
			<div className="erfs-filter-areas">
				<TreeAdministrativeAreas tree={flattenedTree} />
			</div>
		);
}

export default ErfsFilterAreas