import IrepsInfoWindow from "./IrepsInfoWindow";
import "./IwPossibleAstTrnsOnAst.css";
import PossibleAstTrnsOnAst from "./PossibleAstTrnsOnAst";

const IwPossibleAstTrnsOnAst = props => {
	console.log(`props`, props);
	const { data } = props;
	const { astNo } = data
	console.log(`astNo` , astNo)
	return (
		<IrepsInfoWindow
			hl1={"Possible Ast Trns"}
			hr1={
				<>
					Ast No:<span className="text-emphasis2">{astNo}</span>
				</>
			}
			windowWidth="25rem"
			windowHeight="25rem"
			headerType="headerType1"
		>
			<PossibleAstTrnsOnAst data={data} />
		</IrepsInfoWindow>
	);
};

export default IwPossibleAstTrnsOnAst;
