import "./Erfs.css";
import ErfsFilters from "../../components/erfs/ErfsFilters";
import ErfsMain from "../../components/erfs/ErfsMain";
import ErfsHeader from "../../components/erfs/ErfsHeader";
import { useContext } from "react";
import { ErfsContext } from "../../contexts/ErfsContext";

const Erfs = () => {
	const { erfsContext } = useContext(ErfsContext);
	return (
		<div className="erfs">
			<ErfsHeader phLl="Erfs" />
			<div className="erfs-body">
				{erfsContext.filterBtn ? <ErfsFilters /> : null}
				<ErfsMain />
			</div>
		</div>
	);
};

export default Erfs;
