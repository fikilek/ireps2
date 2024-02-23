import { ClipLoader } from "react-spinners";
import "./FormBtn.css";
import "./FormSubmitBtn.css";
import { BsSend } from "react-icons/bs";

const FormSubmitBtn = props => {
	const { formik, title, signState } = props;
	// console.log(`formik.errors`, formik.errors);
	// console.log(`formik.isValid`, formik.isValid);
	// console.log(`formik.dirty`, formik.dirty);
	// console.log(`signState?.isPending`, signState?.isPending);

	let disable = null;
	if (Object.keys(formik.values).includes("newPhoneNumber")) {
		disable = false;
	} else {
		disable = !(formik?.isValid && formik?.dirty) || signState?.isPending;
	}

	return (
		<div className="form-submit-btn">
			<button
				disabled={disable}
				title={title}
				className="form-btn btn-submit-form"
				type="submit"
			>
				{signState?.isPending ? (
					<ClipLoader
						color={"#F86F03"}
						loading={signState?.isPending}
						size={20}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				) : (
					<BsSend />
				)}
			</button>
		</div>
	);
};

export default FormSubmitBtn;
