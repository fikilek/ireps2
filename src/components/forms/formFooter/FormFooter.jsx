// import { CiLogin } from "react-icons/ci";
import "./FormFooter.css";
import FormLinkBtn from "../formBtns/FormLinkBtn";
import FormResetBtn from "../formBtns/FormResetBtn";
import FormSubmitBtn from "../formBtns/FormSubmitBtn";
import { IoIosPersonAdd } from "react-icons/io";

const FormFooter = props => {
	const { formik, linkTo, currentForm, isPending } = props;
	// console.log(`linkTo`, linkTo);
	return (
		<div className="form-footer vc-hsb">
			<FormLinkBtn
				icon={linkTo?.icon}
				title={linkTo?.title}
				linkName={linkTo?.linkName}
			/>
			{currentForm !== "signup" ? (
				<FormLinkBtn icon={<IoIosPersonAdd />} title="Signup" linkName="signup" />
			) : (
				""
			)}
			<FormResetBtn formik={formik} title={"Reset Form"} />
			<FormSubmitBtn formik={formik} title={"Submit Form"} isPending={isPending} />
		</div>
	);
};

export default FormFooter;
