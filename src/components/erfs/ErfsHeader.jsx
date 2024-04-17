import { useContext } from "react";
import { ErfsContext } from "../../contexts/ErfsContext";
import PageTitle from "../../pages/PageTitle";
import FilterBtn from "../Filters/FilterBtn";
import "./ErfsHeader.css";
import useModal from "../../hooks/useModal";

const ErfsHeader = props => {
	const { phLl } = props;
	const {openModal} = useModal()
	const { erfsContext, setEcs } = useContext(ErfsContext);
	const handleClick = e => {
		setEcs(prev => {
			return {
				...prev,
				activeTab: e.target.id,
			};
		});
	};

	const handleErfSearch = e => {
				openModal({
					modalName: e.currentTarget.id,
				});
	}
	return (
		<div className="erfs-header">
			<div className="ph ph-left">
				<div className="phLl">
					<FilterBtn />
					<PageTitle title={phLl} />
				</div>
				<div className="phLr">
					<p  className="active-area">
						ActiveArea
					</p>
				</div>
			</div>

			<div className="ph ph-right">
				<div className="phRl">
					<button id='erfsSearch' className="erfs-search-btn" onClick={handleErfSearch}>
						Erf Search
					</button>
				</div>
				<div className="phRr">
					<button
						className={erfsContext.activeTab === "table" ? "active" : null}
						id="table"
						onClick={handleClick}
					>
						Table
					</button>
					<button
						className={erfsContext.activeTab === "split" ? "active" : null}
						id="split"
						onClick={handleClick}
					>
						Split
					</button>
					<button
						className={erfsContext.activeTab === "map" ? "active" : null}
						id="map"
						onClick={handleClick}
					>
						Map
					</button>
				</div>
			</div>
		</div>
	);
};

export default ErfsHeader;
