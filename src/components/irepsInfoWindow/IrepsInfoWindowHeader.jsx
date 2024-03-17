import "./IrepsInfoWindowHeader.css";
import FormCloseBtn from "../forms/formBtns/FormCloseBtn";

const IrepsInfoWindowHeader = props => {
	const { fhl1, fhl2, fhr1, fhr2 } = props;

	return (
		<div className="ireps-info-window-header">
			<div className="fhl">
				<div className="fh-field fhl1">{fhl1}</div>
				<div className="fh-field fhl2">{fhl2}</div>
			</div>
			<div className="fhr">
				<div className="fh-field fhr1">{fhr1}</div>
				<div className="fh-field fhr2">{fhr2}</div>
				<FormCloseBtn />
			</div>
		</div>
	);
};

export default IrepsInfoWindowHeader;
