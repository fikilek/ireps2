import { ErrorMessage, Field } from "formik";
import "../Form.css";
import FormFieldError from "../formError/FormFieldError";
import { useServiceProviders } from "../../../hooks/useServiceProviders";

const FormikSelect = props => {
	// console.log(`props`, props);
	const { label, name, options, ...rest } = props;
	// console.log(`rest`, rest);

	const { serviceProviders } = useServiceProviders();
	// console.log(`serviceProviders`, serviceProviders);

	return (
		<div className={`form-control ${name} `}>
			<Field id={name} name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, form, meta } = props;

					const handleChange = e => {
						// console.log(`e.target.value`, e.target.value);
						form.setFieldValue(field.name, e.target.value);
						// form.validateField(field.name);

						// get spID for the selected sp option
						if (field.name === "companyName") {
							// console.log(`serviceProviders`, serviceProviders);
							const { spId } =
								serviceProviders?.spOptions &&
								serviceProviders.spOptions.find(sp => sp.value === e.target.value);
							// console.log(`spId`, spId);

							form.setFieldValue("spId", spId);
							// form.validateField("spId");
						}
					};

					return (
						<select {...field} onChange={handleChange}>
							{options &&
								options.map(option => {
									return (
										<option key={option.key} value={option.value}>
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
