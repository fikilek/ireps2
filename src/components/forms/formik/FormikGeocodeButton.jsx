import { Field } from "formik";
import "./Formik.css";
import "./FormikGeocodeButton.css";
import React from "react";
import { useContext } from "react";
import { GeocodingContext } from "../../../../contexts/GeocodingContext";
import { getAstCat } from "../../../../utils/utils";

const FormikGeocodeButton = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	// get reverse geocoding context
	const { setGcData } = useContext(GeocodingContext);

	const handleClick = (e, props) => {
		e.preventDefault();
		// console.log(`e.target.value`, e.target.value);
		// console.log(`props`, props);
		// const { field, meta, form } = props;

		// open geocoding modal
		setGcData(prev => {
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

					const astCat = getAstCat(props?.field?.name);
					// console.log(`astCat`, astCat);

					return (
						<button className="geocoding-btn" onClick={e => handleClick(e, props)}>
							<p className="geocoding-btn-p">
								{meta.value ? meta.value : `${astCat} Location Address`}{" "}
							</p>
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

export default FormikGeocodeButton;
