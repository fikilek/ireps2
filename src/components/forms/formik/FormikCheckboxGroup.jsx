import { ErrorMessage, Field } from "formik";
import "../Form.css";
import FormFieldError from "../formError/FormFieldError";

const FormikCheckboxGroup = props => {
	// console.log(`props`, props);
	const { label, name, roles, claims, ...rest } = props;
	// console.log(`rest`, rest);

	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{props => {
					const { field, form } = props;

					const handleChange = e => {
						// console.log(`e.target.value`, e.target.value);
						form.setFieldValue(e.target.value, !form.values[e.target.value]);
						form.validateField(field.name);
					};

					return roles?.map((role, index) => {
						const rn = role?.key?.toLowerCase().trim();
						// console.log(`rn`, rn);
						// console.log(`claims[${rn}]`, claims[rn]);
						const userHasRole = claims[rn] ? "user-has-role" : "";
						return (
							<div className="role" key={role.key}>
								<p>{role.value}</p>
								<input
									title={role.value}
									type={"checkbox"}
									className={`role-btn ${userHasRole}`}
									id={role.key}
									value={role.key}
									onChange={handleChange}
									checked={form.values[rn]}
								></input>
							</div>
						);
					});
				}}
			</Field>
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikCheckboxGroup;
