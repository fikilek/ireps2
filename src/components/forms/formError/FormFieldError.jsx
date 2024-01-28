import React from "react";
import "./FormError.css";

const FormFieldError = props => {
	return <div className="form-field-error">{props.children}</div>;
};

export default FormFieldError;
