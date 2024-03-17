import "./IrepsInfoWindow.css";
import IrepsInfoWindowHeader from "./IrepsInfoWindowHeader";

const IrepsInfoWindow = props => {
	const {infoName} = props
	return (
		<div className="ireps-info-window-wrapper">
			<div className="ireps-info-window-container">
				<IrepsInfoWindowHeader fhl1="Service Provider Data" fhr1={infoName} />
				{props.children}
			</div>
		</div>
	);
};

export default IrepsInfoWindow;
