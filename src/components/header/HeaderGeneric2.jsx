import FormCloseBtn from "../forms/formBtns/FormCloseBtn";
import "./HeaderGeneric2.css";

const HeaderGeneric2 = props => {
	const { hl1, hl2, hr1, hr2 } = props;

	return (
		<div className="header-generic2">
			<div className="hl">
				{hl1 && <div className="hf hl1">{hl1}</div>}
				{hl2 && <div className="hf hl2">{hl2}</div>}
			</div>
			<div className="hr">
				{hr1 && <div className="hf hr1">{hr1}</div>}
				{hr2 && <div className="hf hr2">{hr2} </div>}
				<FormCloseBtn />
			</div>
		</div>
	);
};

export default HeaderGeneric2;
