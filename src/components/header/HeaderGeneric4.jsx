import "./HeaderGeneric4.css";

const HeaderGeneric4 = props => {
	const { hl1, hl2, hr1, hr2, children } = props;

	return (
		<div className="header-generic4">
			<div className="hl">
				{hl1 && <div className="hf hl1">{hl1}</div>}
				{hl2 && <div className="hf hl2">{hl2}</div>}
			</div>
			<div className="hr">
				{hr1 && <div className="hf hr1">{hr1}</div>}
				{hr2 && <div className="hf hr2">{hr2} </div>}
				{children}
			</div>
		</div>
	);
};

export default HeaderGeneric4;
