import HeaderGeneric from "../header/HeaderGeneric3";
import "./MediaMainDisplayHeader.css";

const MadiaMainDisplayHeader = props => {
	const { hl1, hl2, hl3, hr1, hr2, hr3 } = props;
	return (
		<div className="main-display-header">
			<HeaderGeneric hl1={hl1} hl2={hl2} hl3={hl3} hr1={hr1} hr2={hr2} hr3={hr3} />
		</div>
	);
};

export default MadiaMainDisplayHeader;
