import useModal from "../../../hooks/useModal";
import "./FormHeader.css";
import FormCloseBtn from "../formBtns/FormCloseBtn";

const Formheader = props => {
	const { fhl1, fhl2, fhr1, fhr2 } = props;

	return (
		<div className="form-header">
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

export default Formheader;
