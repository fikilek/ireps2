import { useContext } from "react";
import "./ErfsMain.css";
import { ErfsContext } from "../../contexts/ErfsContext";
import ErfsTable from "./ErfsTable";
import ErfsSplit from "./ErfsSplit";
import ErfsMap from "./ErfsMap";

const ErfsMain = () => {
	const { erfsContext } = useContext(ErfsContext);

	return (
		<div className="erfs-main">
			{erfsContext.activeTab === "table" && <ErfsTable />}
			{erfsContext.activeTab === "split" && <ErfsSplit />}
			{erfsContext.activeTab === "map" && <ErfsMap />}
		</div>
	);
};

export default ErfsMain;
