import { useContext } from "react";
import { TrnsContext } from "../../contexts/TrnsContext";
import PageTitle from "../../pages/PageTitle";
import FilterBtn from "../Filters/FilterBtn";
import "./TrnsHeader.css";
import useModal from "../../hooks/useModal";

const TrnsHeader = props => {
	const { phLl } = props;
	const { openModal } = useModal();
	const { trnsContext, setTrnsContext } = useContext(TrnsContext);

	const handleTrnsearch = e => {
		openModal({
			modalName: e.currentTarget.id,
		});
	};
	return (
		<div className="trns-header">
			<div className="ph ph-left">
				<div className="phLl">
					<FilterBtn />
					<PageTitle title={phLl} />
				</div>
				<div className="phLr">
					<p className="active-area">ActiveArea</p>
				</div>
			</div>

			<div className="ph ph-right">
				<div className="phRl">
					<button
						id="trnsSearch"
						className="trns-search-btn"
						onClick={handleTrnsearch}
					>
						Trn Search
					</button>
				</div>
				<div className="phRr">
					<button
						className='trnsTable'
						id="table"
					>
						Table
					</button>
				</div>
			</div>
		</div>
	);
};

export default TrnsHeader;
