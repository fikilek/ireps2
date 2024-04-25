import { ErrorMessage, Field } from "formik";
import "../Form.css";
import FormFieldError from "../formError/FormFieldError";
import { useContext, useEffect, useState } from "react";
import { AnomalyContext } from "../../../contexts/AnomalyContext";

const FormikSelectSetAnomalyDetail = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;
	// console.log(`rest`, rest);

	const [options, setOptions] = useState([])
	// console.log(`options`, options)

	const { anomalyContext } = useContext(AnomalyContext);
	const anomalyDetail = anomalyContext.anomalyDetail[anomalyContext.anomaly];

	useEffect(() => {
		setOptions(anomalyDetail);
	},[anomalyDetail])

 	return (
		<div className={`form-control ${name} `}>
			<Field id={name} name={name} {...rest}>
				{props => {
					const { field, form, meta } = props;

					const handleChange = e => {
						form.setFieldValue(field.name, e.target.value);
						form.validateField(field.name);
					};

					return (
						<select {...field} onChange={handleChange}  >
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

export default FormikSelectSetAnomalyDetail;
