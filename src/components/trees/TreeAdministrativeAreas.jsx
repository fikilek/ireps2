import "./TreeAdministrativeAreas.css";

import React, { useContext, useEffect, useState } from "react";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView from "react-accessible-treeview";
import cx from "classnames";
// import "./AreaTree.css";
import { AreaTreeContext } from "../../contexts/AreaTreeContext";

const TreeAdministrativeAreas = props => {
	// console.log(`props`, props)
	const { tree } = props;
	// const [selectedArea, setSelectedArea] = useState("no area selected");
	// const [showHide, setShowHide] = useState("hide");

	const [selected, setSelected] = useState("");
	const { setSetSelected } = useContext(AreaTreeContext);

	useEffect(() => {
		setSetSelected(prev => (prev = selected));
	}, [selected, setSetSelected]);

	const onAreaSelect = e => {
		// setSelected(prev => (prev = e));
	};
	
	const onNodeSelect = e => {
		setSelected(prev => (prev = e));
		// console.log(`e`, e);
	};

	return (
		<div className="tree-administrative-areas">
			<div className={`checkbox`}>
				<TreeView
					data={tree}
					aria-label="Single select"
					multiSelect={false}
					propagateSelectUpwards
					togglableSelect
					nodeAction="check"
					onSelect={onAreaSelect}
					onNodeSelect={onNodeSelect}
					nodeRenderer={({
						element,
						isBranch,
						isExpanded,
						isSelected,
						isHalfSelected,
						getNodeProps,
						level,
						handleSelect,
						handleExpand,
					}) => {
						return (
							<div
								{...getNodeProps({ onClick: handleExpand })}
								style={{ marginLeft: 40 * (level - 1) }}
							>
								{isBranch && <ArrowIcon isOpen={isExpanded} />}
								<CheckBoxIcon
									className="checkbox-icon"
									onClick={e => {
										handleSelect(e);
										e.stopPropagation();
									}}
									variant={isHalfSelected ? "some" : isSelected ? "all" : "none"}
								/>
								<span className="name">{element.name}</span>
							</div>
						);
					}}
				/>
			</div>
		</div>
	);
};

export default TreeAdministrativeAreas;

const ArrowIcon = ({ isOpen, className }) => {
	const baseClass = "arrow";
	const classes = cx(
		baseClass,
		{ [`${baseClass}--closed`]: !isOpen },
		{ [`${baseClass}--open`]: isOpen },
		className
	);
	return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon = ({ variant, ...rest }) => {
	switch (variant) {
		case "all":
			return <FaCheckSquare {...rest} />;
		case "none":
			return <FaSquare {...rest} />;
		case "some":
			return <FaMinusSquare {...rest} />;
		default:
			return null;
	}
};
