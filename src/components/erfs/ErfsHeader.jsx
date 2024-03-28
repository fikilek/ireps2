import { useContext } from "react";
import { ErfsContext } from "../../contexts/ErfsContext";
import PageTitle from "../../pages/PageTitle";
import FilterBtn from "../Filters/FilterBtn";
import "./ErfsHeader.css";

const ErfsHeader = props => {
	const { phLl } = props;
	const { ecs, setEcs } = useContext(ErfsContext)
	const handleClick = e => {
		setEcs(prev => {
			return {
				...prev,
				activeTab: e.target.id
			}
		})
	}
	return (
		<div className="erfs-header">
			<div className="ph ph-left">
				<div className="phLl">
					<FilterBtn />
					<PageTitle title={phLl} />
				</div>
				<div className="phLr"></div>
			</div>

			<div className="ph ph-right">
				<div className="phRl"></div>
				<div className="phRr">
					<button
						className={ecs.activeTab === "table" ? "active" : null}
						id="table"
						onClick={handleClick}
					>
						Table
					</button>
					<button
						className={ecs.activeTab === "split" ? "active" : null}
						id="split"
						onClick={handleClick}
					>
						Split
					</button>
					<button
						className={ecs.activeTab === "map" ? "active" : null}
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
