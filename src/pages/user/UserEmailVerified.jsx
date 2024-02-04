import { IconContext } from "react-icons";
import { TiTick } from "react-icons/ti";

const FormUserEmailVerified = () => {
	return (
		<div className="user-email-verfied">
			<IconContext.Provider
				value={{
					color: "green",
					size: "1rem",
					className: "ue-verified",
					title: "Verified",
				}}
			>
				<TiTick />
			</IconContext.Provider>
			{/* <span>Verified</span> */}
		</div>
	);
};

export default FormUserEmailVerified;
