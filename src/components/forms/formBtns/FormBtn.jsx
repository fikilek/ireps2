import { ClipLoader } from "react-spinners";
import "./FormBtn.css";

const FormBtn = props => {
	// console.log(`props`, props);
	const { formik, title, state, btnIcon, handleClick, btnType } = props;
	// console.log(`formik.errors`, formik.errors);
	// console.log(`formik.isValid`, formik.isValid);
	// console.log(`formik.dirty`, formik.dirty);
	// console.log(`signState?.isPending`, signState?.isPending);

	const disable  = !(formik?.isValid && formik?.dirty) || state?.isPending;

	return (
		<div className="form-save-draft">
			<button
				disabled={disable}
				title={title}
				className="form-btn form-save-draft"
				type={btnType}
				onClick={handleClick}
			>
				{state?.isPending ? (
					<ClipLoader
						color={"#F86F03"}
						loading={state?.isPending}
						size={20}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				) : (
					<div>{btnIcon}</div>
				)}
			</button>
		</div>
	);
};

export default FormBtn;
