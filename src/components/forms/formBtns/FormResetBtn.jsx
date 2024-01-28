import "./FormBtn.css";
import { BiReset } from "react-icons/bi";

const FormResetBtn = props => {
	// console.log(`props`, props);
	const { formik, title } = props;
	// console.log(`formik.dirty`, formik.dirty);
	// console.log(`formik.touched`, formik.touched);
	const disable = !formik.dirty;
	// console.log(`disable`, disable);

	const handleReset = e => {
		formik.resetForm();
		formik.setFieldValue("password", "");
	};
	return (
		<div className="form-reset-btn">
			<button
				disabled={disable}
				title={title}
				className="form-btn btn-reset-form"
				type="reset"
				onClick={handleReset}
			>
				<BiReset />
			</button>
		</div>
	);
};

export default FormResetBtn;
