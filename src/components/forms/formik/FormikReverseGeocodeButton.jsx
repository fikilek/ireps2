import { Field } from "formik";
import "./FormikReverseGeocodeButton.css";
import React from "react";
import { useContext } from "react";
import { ReverseGeocodingContext } from "../../../contexts/ReverseGeocodingContext";

const FormikReverseGeocodeButton = props => {
	// console.log(`FormikReverseGeocodeButton props`, props);
	const { label, name, ...rest } = props;

	// get reverse geocoding context
	const { setRgcData } = useContext(ReverseGeocodingContext);

	const handleClick = (e, props) => {
		e.preventDefault();
		// console.log(`e.target`, e.target);
		// console.log(`props`, props);
		// const { field, meta, form } = props;

		// open geocoding modal
		setRgcData(prev => {
			return {
				...prev,
				isOpened: true,
				data: props,
			};
		});
	};
	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, meta, form } = props;
					// console.log(`madiaCat`, mediaCat, field.value.length)
					// console.log(`form.values`, form.values)
					return (
						<button className="reverse-geocoding-btn" onClick={e => handleClick(e, props)}>
							{/* <p className="geocoding-btn-p">{field?.value}</p> */}
							<p className="geocoding-btn-p">{ meta.value ? meta.value : 'Google Address' } </p>
						</button>
					);
				}}
			</Field>
			{/* <label className={`label `} htmlFor={name}>
				{label}
			</label> */}
		</div>
	);
};

export default FormikReverseGeocodeButton;
