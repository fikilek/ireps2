import "./HeaderGeneric.css";

const HeaderGeneric = props => {
	const { hl1, hl2, hl3, hr1, hr2, hr3, children } = props;

	return (
		<div className="header-generic">
			<div className="hl">
				<div className="hf hl1">{hl1 || ""}</div>
				<div className="hf hl2">{hl2 || ""}</div>
				<div className="hf hl3">{hl3 || ""}</div>
			</div>
			<div className="hr">
				<div className="hf hr1">{hr1 || ""}</div>
				<div className="hf hr2">{hr2 || ""} </div>
				<div className="hf hr3">{hr3 || ""}</div>
				{children}
			</div>
		</div>
	);
};

export default HeaderGeneric;
