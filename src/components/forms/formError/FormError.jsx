import React from "react";
import "./FormError.css";

const FormError = ({ formError }) => {
	return (
		<div className="formError">
			<p>{formError}</p>
		</div>
	);
};

export default FormError;
