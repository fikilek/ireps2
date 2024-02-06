import { ClipLoader } from "react-spinners";
import "./FormBtn.css";
import "./FormSubmitBtn.css";
import { BsSend } from "react-icons/bs";

const FormSubmitBtn = props => {
	// console.log(`props`, props);
	const { formik, title, isPending } = props;
	const disable = !(formik.isValid && formik.dirty) || isPending;
	// console.log(`disable`, disable);

	return (
		<div className="form-submit-btn">
			<button
				disabled={disable}
				title={title}
				className="form-btn btn-submit-form"
				type="submit"
			>
				{isPending ? (
					<ClipLoader
						color={"#F86F03"}
						loading={isPending}
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
