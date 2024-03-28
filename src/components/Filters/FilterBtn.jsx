import { useContext } from "react";
import "./FilterBtn.css";
import { ErfsContext } from "../../contexts/ErfsContext";
import { MdArrowLeft } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";

const FilterBtn = () => {
	const { ecs, setEcs } = useContext(ErfsContext);

	const handleClick = e => {
		setEcs(prev => ({
			...prev,
			filterBtn: !prev.filterBtn,
		}));
	};
	return (
		<div className="filter-btn">
			<button className="flt-btn" onClick={handleClick}>
				{ecs.filterBtn ? (
					<IconContext.Provider value={{ color: "blue", size: "2rem" }}>
						<MdArrowLeft />
					</IconContext.Provider>
				) : (
					<IconContext.Provider value={{ color: "green", size: "2rem" }}>
						<IoMdArrowDropright />
					</IconContext.Provider>
				)}
			</button>
		</div>
	);
};

export default FilterBtn;
