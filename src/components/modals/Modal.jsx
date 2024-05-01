import { Suspense, lazy, useContext } from "react";
import "./Modal.css";
import { BrowserRouter } from "react-router-dom";
import { loader } from "../../utils/utils";
import { ModalContext } from "../../contexts/ModalContext";
import MediaMobile from "../media/MediaMobile";
import IwPossibleAstTrnsOnErf from "../irepsInfoWindow/IwPossibleAstTrnsOnErf";
import FormMeterAudit from "../forms/formTrn/audit/FormMeterAudit";
import ShowOnMap from "../irepsInfoWindow/ShowOnMap";
import IwTrnsOnAst from "../irepsInfoWindow/IwTrnsOnAst";
import IwPossibleAstTrnsOnAst from "../irepsInfoWindow/IwPossibleAstTrnsOnAst";

const Signout = lazy(() => import("../forms/auth/FormSignout"));
const Signup = lazy(() => import("../forms/auth/FormSignup"));
const UpdateUser = lazy(() => import("../forms/auth/FormUpdateUser"));
const EditUserEmail = lazy(() => import("../forms/auth/FormEditUserEmail"));
const FormPhoneNoAuth = lazy(() => import("../forms/auth/FormPhoneNoAuth"));
const FormPasswordReset = lazy(() => import("../forms/auth/FormPasswordReset"));
const FormUserRoleUpdate = lazy(() =>
	import("../forms/auth/FormUserRoleUpdate")
);
const FormServiceProvider = lazy(() =>
	import("../forms/formServiceProvider/FormServiceProvider")
);
const ServiceProviderData = lazy(() =>
	import("../irepsInfoWindow/ServiceProviderData")
);

const FormErfsSearch = lazy(() => import("../forms/formErf/FormErfsSearch"));
const FormErf = lazy(() => import("../forms/formErf/FormErf"));
const IwErfOnMap = lazy(() => import("../irepsInfoWindow/IwErfOnMap"));
const IwAstsOnErf = lazy(() => import("../irepsInfoWindow/IwAstsOnErf"));
const Signin = lazy(() => import("../forms/auth/FormSignin"));
const IwMedia = lazy(() => import("../irepsInfoWindow/IwMedia"));

const Modal = () => {
	const { toOpen, modalOpened } = useContext(ModalContext);
	// console.log(`modalOpened`, modalOpened);
	// console.log(`toOpen`, toOpen);

	const { modalName, payload } = toOpen;
	// console.log(`modalName`, modalName);
	// console.log(`payload`, payload);

	return (
		<BrowserRouter>
			<div className={`modal-container ${modalOpened ? "show" : "hide"}`}>
				<div className="modal-background" id="modal-background">
					<div className="modal-payload">
						{/* auth forms */}
						{modalName === "signin" && (
							<>
								<Suspense fallback={loader}>
									<Signin />
								</Suspense>
							</>
						)}
						{modalName === "signout" && (
							<>
								<Suspense fallback={loader}>
									<Signout />
								</Suspense>
							</>
						)}
						{modalName === "signup" && (
							<>
								<Suspense fallback={loader}>
									<Signup />
								</Suspense>
							</>
						)}
						{modalName === "passwordReset" && (
							<>
								<Suspense fallback={loader}>
									<FormPasswordReset />
								</Suspense>
							</>
						)}
						{modalName === "updateUser" && (
							<>
								<Suspense fallback={loader}>
									<UpdateUser formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserEmail" && (
							<>
								<Suspense fallback={loader}>
									<EditUserEmail formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserRoles" && (
							<>
								<Suspense fallback={loader}>
									<FormUserRoleUpdate formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserPhoneNumber" && (
							<>
								<Suspense fallback={loader}>
									<FormPhoneNoAuth formData={payload} />
								</Suspense>
							</>
						)}

						{modalName === "serviceProvider" && (
							<>
								<Suspense fallback={loader}>
									<FormServiceProvider formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "serviceProviderData" && (
							<>
								<Suspense fallback={loader}>
									<ServiceProviderData data={payload} />
								</Suspense>
							</>
						)}

						{modalName === "erf" && (
							<>
								<Suspense fallback={loader}>
									<FormErf data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "erfOnMap" && (
							<>
								<Suspense fallback={loader}>
									<IwErfOnMap data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "astsOnErf" && (
							<>
								<Suspense fallback={loader}>
									<IwAstsOnErf data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "media" && (
							<>
								<Suspense fallback={loader}>
									<IwMedia data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "mediaMobile" && (
							<>
								<Suspense fallback={loader}>
									<MediaMobile data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "erfsSearch" && (
							<>
								<Suspense fallback={loader}>
									<FormErfsSearch />
								</Suspense>
							</>
						)}
						{modalName === "possibleAstTrnsOnErf" && (
							<>
								<Suspense fallback={loader}>
									<IwPossibleAstTrnsOnErf data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "iwPossibleAstTrnsOnAst" && (
							<>
								<Suspense fallback={loader}>
									<IwPossibleAstTrnsOnAst data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "meter-audit" && (
							<>
								<Suspense fallback={loader}>
									<FormMeterAudit data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "iwShowOnMap" && (
							<>
								<Suspense fallback={loader}>
									<ShowOnMap data={payload} />
								</Suspense>
							</>
						)}
						{modalName === "iwTrnsOnAst" && (
							<>
								<Suspense fallback={loader}>
									<IwTrnsOnAst data={payload} />
								</Suspense>
							</>
						)}
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default Modal;
