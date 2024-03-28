import "./IrepsInfoWindowHeader.css";
import FormCloseBtn from "../forms/formBtns/FormCloseBtn";

const IrepsInfoWindowHeader = props => {
	const { fhl1, fhl2, fhl3, fhr1, fhr2, fhr3 } = props;

	return (
		<div className="iw-header">
			<div className="fhl">
				<div className="fh-field fhl1">{fhl1}</div>
				<div className="fh-field fhl2">{fhl2}</div>
				<div className="fh-field fhl3">{fhl3}</div>
			</div>
			<div className="fhr">
				<div className="fh-field fhr1">{fhr1}</div>
				<div className="fh-field fhr2">{fhr2}</div>
				<div className="fh-field fhr3">{fhr3}</div>
				<FormCloseBtn />
			</div>
		</div>
	);
};

export default IrepsInfoWindowHeader;
