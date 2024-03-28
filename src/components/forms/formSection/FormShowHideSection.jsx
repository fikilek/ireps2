import React, { useContext } from "react";

const FormShowHideSection = (props) => {
	// console.log(`props`, props);
	const { active, setActive, sectionName } = props;

	const handleClick = e => {
		// console.log(`FormShowHideSection handleClick`);
		// console.log(`sectionName`, sectionName);
		// console.log(`active`, active);

		e.preventDefault();
		if (sectionName === active) {
			// console.log(`set  active to "null`)
			setActive(null);
		} else {
			// console.log(`set  active to ${sectionName}`)
			setActive(sectionName);
		}
	};
	return (
		<button type="button" onClick={handleClick}>
			{active === sectionName ? "-" : "+"}
		</button>
	);
};

export default FormShowHideSection;
