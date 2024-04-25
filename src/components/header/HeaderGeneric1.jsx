import "./HeaderGeneric1.css";
import FormCloseBtn from "../forms/formBtns/FormCloseBtn";

const HeaderGeneric1 = props => {
	const { hl1, hr1, opacity, position } = props;

	return (
		<div className="header-generic1" style={{opacity: opacity, position: position}}>
			<p>{hl1}</p>
			<p>{hr1}</p>
			<FormCloseBtn />
		</div>
	);
};

export default HeaderGeneric1;
