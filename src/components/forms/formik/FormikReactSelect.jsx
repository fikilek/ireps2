import { ErrorMessage, Field } from "formik";
import "../Form.css";
import FormFieldError from "../formError/FormFieldError";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useServiceProviders } from "../../../hooks/useServiceProviders";
import za_lmsMetros from "../../../maps/za/za_lmsMetros.json";

const FormikReactSelect = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;
	// console.log(`rest`, rest);

	const [options, setOptions] = useState([]);
	// console.log(`options`, options);

	useEffect(() => {
		const sps = [];
		za_lmsMetros?.forEach(lm => {
			if (lm?.lm) {
				sps.push({
					label: lm.lm,
					value: lm.lm,
				});
			}
		});
		setOptions(options => {
			return [...options, ...sps];
		});
	}, []);

	const { serviceProviders } = useServiceProviders();
	useEffect(() => {
		const sps = [];
		serviceProviders?.spOptions?.forEach(sp => {
			if (sp?.value !== "choose") {
				sps.push({
					label: sp.value,
					value: sp.value,
				});
			}
		});
		setOptions(options => {
			return [...options, ...sps];
		});
	}, [serviceProviders]);

	return (
		<div className={`form-control ${name} `}>
			<Field id={name} name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, form, meta } = props;

					const handleChange = e => {
						// console.log(`e`, e);
						form.setFieldValue(field.name, e.value);
					};

					return (
						<Select
							defaultValue={{
								label: field.value,
								value: field.value,
							}}
							onChange={handleChange}
							options={options}
							styles={{
								control: (baseStyles, state) => ({
									...baseStyles,
									border: "0.1rem solid black",
									height: "3rem",
									borderRadius: "0.5rem",
								}),
							}}
						/>
					);
				}}
			</Field>
			<label className="label label-react-select" htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikReactSelect;
