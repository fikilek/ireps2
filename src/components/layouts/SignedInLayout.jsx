import "./Layout.css";
import { NavLink, Outlet } from "react-router-dom";

const SignedInLayout = () => {
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
					<NavLink to="/admin">ADMIN</NavLink>
					<NavLink to="/user">FK</NavLink>
				</nav>
			</div>
			<div className="outlet">
				<Outlet />
			</div>
		</div>
	);
};

export default SignedInLayout;
