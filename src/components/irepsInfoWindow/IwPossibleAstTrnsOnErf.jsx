import IrepsInfoWindow from "./IrepsInfoWindow";
import "./IwPossibleAstTrnsOnErf.css";
import PossibleAstTrnsOnErf from "./PossibleAstTrnsOnErf";

const IwPossibleAstTrnsOnErf = props => {
	// console.log(`props`, props);
	const { data } = props;
	return (
		<IrepsInfoWindow
			hl1={"Possible Ast Trns"}
			hr1={
				<>
					Erf No:<span className="text-emphasis2">{props.data.erfNo}</span>
				</>
			}
			windowWidth="20rem"
			windowHeight="22rem"
			headerType="headerType1"
		>
			<PossibleAstTrnsOnErf data={data} />
		</IrepsInfoWindow>
	);
};

export default IwPossibleAstTrnsOnErf;
