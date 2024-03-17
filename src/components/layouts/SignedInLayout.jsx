import useAuthContext from "../../hooks/useAuthContext";
import { useUser } from "../../hooks/useUser";
import "./Layout.css";
import { NavLink, Outlet } from "react-router-dom";

const SignedInLayout = () => {
	const { initials } = useUser();
	const { user } = useAuthContext();
	// console.log(`user`, user)

	let authorised = null;
	if (user.claims) {
		authorised =
			(user?.claims["supervisor"] ||
				user?.claims["manager"] ||
				user?.claims["superuser"]);
	}

	return (
		<div className="layout signed-in-layout">
			<div className="navigation">
				<nav className="left-nav">
					<NavLink to="/">HOME</NavLink>
					<NavLink to="/erfs">ERFS</NavLink>
					<NavLink to="/trns">TRNS</NavLink>
					<NavLink to="/asts">ASTS</NavLink>
				</nav>
				<nav className="right-nav">
					{user && authorised && <NavLink to="/admin">ADMIN</NavLink>}
					{/* <NavLink to="/admin">ADMIN</NavLink> */}
					<NavLink to="/user">{initials}</NavLink>
				</nav>
			</div>
			<div className="outlet">
				<Outlet />
			</div>
		</div>
	);
};

export default SignedInLayout;
