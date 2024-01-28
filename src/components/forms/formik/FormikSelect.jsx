import { ErrorMessage, Field } from "formik";
import "../Form.css";
import FormFieldError from "../formError/FormFieldError";

const FormikSelect = props => {
	// console.log(`props`, props);
	const { label, name, options, ...rest } = props;
	// console.log(`rest`, rest);

	return (
		<div className={`form-control ${name} `}>
			<Field id={name} name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, form } = props;
					const handleChange = e => {
						form.setFieldValue(field.name, e.target.value);
						form.validateField(field.name);
					};

					return (
						<select {...field} onChange={handleChange}>
							{options &&
								options.map(option => {
									return (
										<option key={option.value} value={option.value}>
											{option.key}
										</option>
									);
								})}
						</select>
					);
				}}
			</Field>
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikSelect;
