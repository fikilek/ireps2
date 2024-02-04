import "./Layout.css";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
	return (
		<div className="admin-layout">
			<nav className="admin-layout-nav">
				<NavLink to="users">Users </NavLink>
				<NavLink to="systemTables">System Tables </NavLink>
			</nav>
			<Outlet />
		</div>
	);
};

export default AdminLayout;
