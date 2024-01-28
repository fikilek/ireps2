import { ErrorMessage, Field } from "formik";
import "../Form.css";
import FormFieldError from "../formError/FormFieldError";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { IconContext } from "react-icons";
import { useState } from "react";

const FormikInputPwd = props => {
	// console.log(`props`, props);
	const { label, name, type, ...rest } = props;

	const [pwdEyeToggle, SetPwdEyeToggle] = useState(false);
	const attrType = pwdEyeToggle ? "text" : "password";

	const handleClick = e => {
		// console.log(`icon clicked`);
		SetPwdEyeToggle(!pwdEyeToggle);
	};

	return (
		<div className={`form-control password `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, meta } = props;

					// input border must be red if there is an error and its touched
					const error = meta.error && meta.touched ? "error" : "";

					// create state for password eye

					return (
						<>
							<input {...field} {...rest} className={`${error}`} type={attrType} />
							<IconContext.Provider value={{ className: "icon-password" }}>
								{pwdEyeToggle ? (
									<GoEye onClick={handleClick} />
								) : (
									<GoEyeClosed onClick={handleClick} />
								)}
							</IconContext.Provider>
						</>
					);
				}}
			</Field>
			<label className={`label`} htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikInputPwd;
