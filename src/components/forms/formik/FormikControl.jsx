import FormikCheckboxGroup from "./FormikCheckboxGroup";
import FormikGeocodeButton from "./FormikGeocodeButton";
import FormikInput from "./FormikInput";
import FormikInputPwd from "./FormikInputPwd";
import FormikMediaButton from "./FormikMediaButton";
import FormikPhoneNumberInput from "./FormikPhoneNumberInput";
import FormikReactSelect from "./FormikReactSelect";
import FormikReverseGeocodeButton from "./FormikReverseGeocodeButton";
import FormikSelect from "./FormikSelect";
import FormikSelectSetAnomalyDetail from "./FormikSelectSetAnomalyDetail";
import FormikSelectSetAnomaly from "./FormikSelectSetAnomaly";

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
		case "selectSetAnomalyDetail":
			return <FormikSelectSetAnomalyDetail {...rest} />;
		case "selectSetAnomaly":
			return <FormikSelectSetAnomaly {...rest} />;
		case "reactSelect":
			return <FormikReactSelect {...rest} />;
		case "checkbox":
			return <FormikCheckboxGroup {...rest} />;
		case "mediaButton":
			return <FormikMediaButton {...rest} />;
		// Reverse Geocoding Button
		case "rgcButton":
			return <FormikReverseGeocodeButton {...rest} />;
		case "gcButton":
			return <FormikGeocodeButton {...rest} />;
		default:
			return null;
	}
};

export default FormikControl;
