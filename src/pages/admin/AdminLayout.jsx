import "./AdminLayout.css";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
	return (
		<div className="adminlayout">
			<nav className="adminlayout-nav">
				<NavLink to="users">Users </NavLink>
			</nav>
			<Outlet />
		</div>
	);
};

export default AdminLayout;
