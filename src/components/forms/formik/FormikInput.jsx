import { ErrorMessage, Field } from "formik";
import "../Form.css";
import FormFieldError from "../formError/FormFieldError";

const FormikInput = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, meta } = props;

					// input border must be red if there is an error and its touched
					const error = meta.error && meta.touched ? "error" : "";

					return <input {...field} {...rest} className={`${error}`} />;
				}}
			</Field>
			<label className={`label`} htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikInput;
