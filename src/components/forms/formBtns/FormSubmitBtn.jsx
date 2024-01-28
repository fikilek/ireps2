import "./FormBtn.css";
import "./FormSubmitBtn.css";
import { BsSend } from "react-icons/bs";

const FormSubmitBtn = props => {
	// console.log(`props`, props);
	const { formik, title } = props;
	const disable = !(formik.isValid && formik.dirty);
	// console.log(`disable`, disable);

	return (
		<div className="form-submit-btn">
			<button
				disabled={disable}
				title={title}
				className="form-btn btn-submit-form"
				type="submit"
			>
				<BsSend />
			</button>
		</div>
	);
};

export default FormSubmitBtn;
