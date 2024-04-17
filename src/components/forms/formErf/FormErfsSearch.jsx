import "../../forms/Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import FormFooter from "../formFooter/FormFooter";
import { object, string } from "yup";
import FormMsg from "../formMsg/FormMsg";
import FormError from "../formError/FormError";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useModal from "../../../hooks/useModal";
import useGetCollection from "../../../hooks/useGetCollection";
import FormHeader1 from "../../forms/formHeader/FormHeader1";

const ErfsSearch = () => {
	const { closeModal } = useModal();

	const [erfNo, setErfNo] = useState(null)
	console.log(`erfNo`, erfNo)

	const { state, getCollection } = useGetCollection("erfs");
	// console.log(`state`);

	const onSubmit = values => {
		getCollection(["erfNo", "==", values.erfNo]);
	};

	const validationSchema = object({
		erfNo: string().required("Ast No is required."),
	});

	useEffect(() => {
		if (state.success && state.data.length > 0) {
			closeModal();
			toast.success(`Erf No "${erfNo}", succesfully found`, {
				position: "bottom-left",
			});
		}
		if (state.success && state.data.length === 0) {
			closeModal();
			toast.warn(`Erf No "${erfNo}", NOT found`, {
				position: "top-left",
			});
			getCollection()
		}
	}, [state.success, closeModal]);

	useEffect(() => {
		if (state.error) {
			console.log(`state.error`, state.error);
		}
	}, [state.error]);

	return (
		<div className="form-wrapper">
			<div className="form-container erfs-search">
				<Formik
					initialValues={{
						erfNo: "",
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik`, formik);
						setErfNo(formik.values.erfNo)
						return (
							<>
								<Form>
									<FormHeader1 title="Erfs Search" />
									<FormMsg msg="Enter the Erf No to search for." />
									<div className="search-erfs-form">
										<FormikControl
											control="input"
											type="text"
											label="Erf NO"
											name={"erfNo"}
											placeholder=""
											autoFocus={true}
										/>
									</div>
									{state.error && <FormError errorMsg={state.error} />}
									<FormFooter formik={formik} signState={state} />
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default ErfsSearch;
