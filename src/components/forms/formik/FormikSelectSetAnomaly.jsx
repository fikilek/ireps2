import { ErrorMessage, Field } from "formik";
import "../Form.css";
import FormFieldError from "../formError/FormFieldError";
import { useContext } from "react";
import { AnomalyContext } from "../../../contexts/AnomalyContext";

const FormikSelectSetAnomaly = props => {
	const { label, name, options, ...rest } = props;

	const { anomalyContext, setAnomalyContext } = useContext(AnomalyContext);

	return (
		<div className={`form-control ${name} `}>
			<Field id={name} name={name} {...rest}>
				{props => {
					const { field, form, meta } = props;

					const handleChange = e => {
						// console.log(`e.target.value`, e.target.value);
						// console.log(`field`, field);
						// console.log(`form`, form);
						// console.log(`form.values.anomalies.anomalyDetail`, form.values.anomalies.anomalyDetail);

						setAnomalyContext({
							...anomalyContext,
							anomaly: e.target.value,
						});

						form.setFieldValue(field.name, e.target.value);
						form.validateField(field.name);

						if (e.target.value === "choose") {
							form.setFieldValue("anomalies.anomalyDetail", 'choose');
							form.validateField("anomalies.anomalyDetail");
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

export default FormikSelectSetAnomaly;
