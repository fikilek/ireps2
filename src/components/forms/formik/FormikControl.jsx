import FormikInput from "./FormikInput";
import FormikInputPwd from "./FormikInputPwd";
import FormikPhoneNumberInput from "./FormikPhoneNumberInput";
import FormikSelect from "./FormikSelect";

const FormikControl = props => {
	// console.log(`props`, props);

	const { control, ...rest } = props;

	switch (control) {
		case "input":
			return <FormikInput {...rest} />;
		case "phoneNumberInput":
			return <FormikPhoneNumberInput {...rest} />;
		case "inputPwd":
			return <FormikInputPwd {...rest} />;
		case "select":
			return <FormikSelect {...rest} />;
		default:
			return null;
	}
};

export default FormikControl;
