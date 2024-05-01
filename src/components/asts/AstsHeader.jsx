import { useContext } from "react";
import { AstsContext } from "../../contexts/AstsContext";
import PageTitle from "../../pages/PageTitle";
import FilterBtn from "../Filters/FilterBtn";
import "./AstsHeader.css";
import useModal from "../../hooks/useModal";

const AstsHeader = props => {
	const { phLl } = props;
	const { openModal } = useModal();
	const { astsContext, setAstsContext } = useContext(AstsContext);

	const handleAstsearch = e => {
		openModal({
			modalName: e.currentTarget.id,
		});
	};
	return (
		<div className="asts-header">
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
						id="astsSearch"
						className="asts-search-btn"
						onClick={handleAstsearch}
					>
						Trn Search
					</button>
				</div>
				<div className="phRr">
					<button
						className='astsTable'
						id="table"
					>
						Table
					</button>
				</div>
			</div>
		</div>
	);
};

export default AstsHeader;
