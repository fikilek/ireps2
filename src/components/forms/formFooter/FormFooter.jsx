// import { CiLogin } from "react-icons/ci";
import "./FormFooter.css";
import FormResetBtn from "../formBtns/FormResetBtn";
import FormSubmitBtn from "../formBtns/FormSubmitBtn";

const FormFooter = props => {
	// console.log(`props`, props);
	const { formik, signState, children } = props;
	return (
		<div className="form-footer vc-hsb">
			{children}
			<FormResetBtn formik={formik} title={"Reset Form"} signState={signState} />
			<FormSubmitBtn formik={formik} title={"Submit Form"} signState={signState} />
		</div>
	);
};

export default FormFooter;
