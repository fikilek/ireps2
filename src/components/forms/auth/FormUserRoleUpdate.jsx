import { useContext, useEffect, useState } from "react";
import "./FormUserRoleUpdate.css";

import { getFunctions, httpsCallable } from "firebase/functions";
import useModal from "../../../hooks/useModal";
import { toast } from "react-toastify";
import FormFooter from "../formFooter/FormFooter";
import { Form, Formik } from "formik";
import FormikControl from "../formik/FormikControl";
import FormError from "../formError/FormError";
import { ClaimsContext } from "../../../contexts/ClaimsContext";
import HeaderGeneric2 from "../../header/HeaderGeneric2";

const roles = [
	{ key: "guest", value: "Guest", roleCode: "GST" },
	{ key: "fieldworker", value: "Fieldworker", roleCode: "FWR" },
	{ key: "supervisor", value: "Supervisor", roleCode: "SPV" },
	{ key: "manager", value: "Manager", roleCode: "MNG" },
	{ key: "superuser", value: "Superuser", roleCode: "SPU" },
];

const areObjectsEqual = (obj1, obj2) => {
	// console.log(`obj1 newClaims`, obj1)
	// console.log(`obj2 oldClaims`, obj2)

	const stringifiedObj1 = JSON.stringify(obj1);
	const stringifiedObj2 = JSON.stringify(obj2);
	const result = stringifiedObj1 === stringifiedObj2;
	// console.log(`result`, result);
	let changeSet = {
		guest: {
			old: "",
			new: "",
			change: "",
		},
		fieldworker: {
			old: "",
			new: "",
			change: "",
		},
		supervisor: {
			old: "",
			new: "",
			change: "",
		},
		manager: {
			old: "",
			new: "",
			change: "",
		},
		superuser: {
			old: "",
			new: "",
			change: "",
		},
	};

	// create claims change set
	for (const role in changeSet) {
		// console.log(`role`, role)
		changeSet[role]["old"] = obj2[role];
		changeSet[role]["new"] = obj1[role];
		if (obj1[role] === obj2[role]) {
			changeSet[role]["change"] = false;
		} else {
			changeSet[role]["change"] = true;
		}
	}
	// console.log(`changeSet`, changeSet)

	return { objectsEqual: result, changeSet };
};

const FormUserRoleUpdate = props => {
	// console.log(`props`, props);
	const { formData: data } = props;
	// console.log(`data`, data);

	// create error state
	const [error, setError] = useState("");

	const { customClaims, setCustomClaims } = useContext(ClaimsContext);
	// console.log(`customClaims.roles`, customClaims.roles);

	// const { getCustomError } = useFirebase();

	const functions = getFunctions();

	const [isPending, setIsPending] = useState(null);

	const [formikClaims, setFormikClaims] = useState({});
	// console.log(`formikClaims`, formikClaims);

	const [claimsChangeSet, setClaimsChangeSet] = useState({});

	const { closeModal } = useModal();

	useEffect(() => {
		setFormikClaims(data?.customClaims?.roles);
	}, []);

	useEffect(() => {
		const { changeSet } = areObjectsEqual(formikClaims, customClaims.roles);
		setClaimsChangeSet(changeSet);
	}, [customClaims.roles, formikClaims]);

	const onSubmit = e => {
		setIsPending(prev => (prev = true));

		const updateUserRole = httpsCallable(functions, "updateUserRole");
		updateUserRole({ roles: e, uid: data.uid, changeSet: claimsChangeSet })
			.then(claimUpdateResult => {
				setCustomClaims(prev => ({
					...prev,
					roles: claimUpdateResult?.data?.userRecord?.customClaims?.roles,
				}));

				toast(`Roles for user "${data.displayName}", updated succesfully`, {
					position: "bottom-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				// close modal
				closeModal();
				setIsPending(
					prev => (prev = claimUpdateResult.data.userRecord ? false : true)
				);
			})
			.catch(err => {
				console.log(`error updating role: `, err.message);
				setError(err.message);
				setIsPending(false);
			});
	};
	const validate = values => {
		let errors = {};

		// iterate through values. If one of the values is true, retun with no errors. If all of them are false, return error.
		for (const role in values) {
			if (values[role]) return errors;
		}
		errors.roles = "User must have at least ONE role";

		return errors;
	};

	const handleChange = e => {
		// console.log(`form has changed : e.target.value :`, e.target.value);
		// console.log(`form has changed : e.target : `, e.target.checked);
		setFormikClaims({
			...formikClaims,
			[e.target.value]: e.target.checked,
		});
	};

	return (
		<div className="form-wrapper">
			<div className="form-container ">
				<Formik
					initialValues={data.customClaims.roles}
					onSubmit={onSubmit}
					validate={validate}
					enableReinitialize={true}
				>
					{formik => {
						// console.log(`formik.values`, formik.values);
						return (
							<>
								<Form className="user-role-update" onChange={handleChange}>
									<HeaderGeneric2
										hl1="User Role Updater Form"
										hr1={`${data.displayName}`}
									/>

									<div className="user-role-update">
										<div className="uru uru-sub-heading">
											<p>
												{`The user has the existing roles shown below. Click on the checkbox to either add a new role or remove the existig role and submit. Roles rules apply`}
												.
											</p>
										</div>
										<div className="uru check-btns">
											<div className="user-roles">
												<FormikControl
													control="checkbox"
													label=""
													name={"roles"}
													roles={roles}
													claims={data.customClaims.roles}
												/>
												{formik.errors.roles && (
													<FormError errorMsg={formik.errors.roles} />
												)}
												{error && <FormError errorMsg={error} />}
											</div>
										</div>
									</div>

									<FormFooter formik={formik} signState={{ isPending: isPending }} />
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default FormUserRoleUpdate;
