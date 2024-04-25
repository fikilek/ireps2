import "./Trns.css";
// import TrnsFilters from "../../components/trns/TrnsFilters";
import TrnsHeader from "../../components/trns/TrnsHeader";
import TrnsTable from "../../components/trns/TrnsTable";
import { useTrnAudit } from "../../hooks/useTrnAudit";
import { useContext } from "react";
import { TrnsContext } from "../../contexts/TrnsContext";

const Trns = () => {
	// const { trnsContext } = useContext(TrnsContext);

	useTrnAudit()
	return (
		<div className="trns">
			<TrnsHeader phLl="Trns" />
			<div className="trns-body">
				{/* {trnsContext.filterBtn ? <TrnsFilters /> : null} */}
				<TrnsTable />
			</div>
		</div>
	);
};

export default Trns;
