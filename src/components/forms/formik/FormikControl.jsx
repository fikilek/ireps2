import FormikCheckboxGroup from "./FormikCheckboxGroup";
import FormikInput from "./FormikInput";
import FormikInputPwd from "./FormikInputPwd";
import FormikMediaButton from "./FormikMediaButton";
import FormikPhoneNumberInput from "./FormikPhoneNumberInput";
import FormikReactSelect from "./FormikReactSelect";
import FormikReverseGeocodeButton from "./FormikReverseGeocodeButton";
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
		case "reactSelect":
			return <FormikReactSelect {...rest} />;
		case "checkbox":
			return <FormikCheckboxGroup {...rest} />;
		case "mediaButton":
			return <FormikMediaButton {...rest} />;
		// Reverse Geocoding Button
		case "rgcButton": 
			return <FormikReverseGeocodeButton {...rest} />;
		default:
			return null;
	}
};

export default FormikControl;
