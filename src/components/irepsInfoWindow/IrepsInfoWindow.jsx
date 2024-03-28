import "./IrepsInfoWindow.css";
import IrepsInfoWindowHeader from "./IrepsInfoWindowHeader";

const IrepsInfoWindow = props => {
	// console.log(`props`, props)
	const { fhl1, fhl2, fhl3, fhr1, fhr2, fhr3 } = props;
	return (
		<div className="iw-wrapper">
			<div className="iw-container">
				<IrepsInfoWindowHeader
					fhl1={fhl1}
					fhl2={fhl2}
					fhl3={fhl3}
					fhr1={fhr1}
					fhr2={fhr2}
					fhr3={fhr3}
				/>
				{props.children}
			</div>
		</div>
	);
};

export default IrepsInfoWindow;
