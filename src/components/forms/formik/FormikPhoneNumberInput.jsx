import { ErrorMessage, Field } from "formik";
import "../Form.css";
import "./FormikPhoneNumberInput.css";
import FormFieldError from "../formError/FormFieldError";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormikPhoneNumberInput = props => {
	// console.log(`props`, props);
	const { label, name, hide, ...rest } = props;

	return (
		<div className={`form-control ${name} ${hide} `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, form } = props;

					const handleChange = e => {
						form.setFieldValue(field.name, e);
						form.validateField(field.name);
					};

					return (
						<PhoneInput
							placeholder="+(27) 81 123 1234"
							country={"za"}
							value={field?.value}
							onChange={handleChange}
							masks={{ za: "(..) ...-...." }}
						/>
					);
				}}
			</Field>
			<label className={`label`} htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikPhoneNumberInput;
