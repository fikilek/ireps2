import useModal from "../../hooks/useModal";
import "./Layout.css";
import { NavLink, Outlet } from "react-router-dom";

const SignedOutLayout = () => {
	const { openModal } = useModal();

	const handleClick = e => {
		// console.log(`e`, e);
		openModal({
			modalName: e.target.id,
			payload: {},
		});
	};

	return (
		<div className="layout signed-out-layout">
			<div className="navigation">
				<nav className="left-nav">
					<NavLink to="/">HOME</NavLink>
				</nav>
				<nav className="right-nav">
					<button id="signup" onClick={handleClick}>
						SIGNUP
					</button>
					<button id="signin" onClick={handleClick}>
						SIGNIN
					</button>
				</nav>
			</div>
			<div className="outlet">
				<Outlet />
			</div>
		</div>
	);
};

export default SignedOutLayout;
