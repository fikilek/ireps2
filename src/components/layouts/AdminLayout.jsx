import useAuthContext from "../../hooks/useAuthContext";
import "./Layout.css";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
		const { user } = useAuthContext();
		// console.log(`user`, user)

		let authorisedSystemTables = null;
		if (user.claims) {
			authorisedSystemTables = user?.claims["superuser"];
	}
	
			let authorisedServiceProviders = null;
			if (user.claims) {
				authorisedServiceProviders =
					(user?.claims["supervisor"] ||
					user?.claims["manager"] ||
					user?.claims["superuser"]);
			}

	return (
		<div className="sidebar-main-layout">
			<nav className="sidebar-main-nav">
				<NavLink to="users">Users </NavLink>
				{user && authorisedSystemTables && (
					<NavLink to="systemTables">System Tables </NavLink>
				)}

				{user && authorisedServiceProviders && (
					<NavLink to="serviceProviders">Service Providers </NavLink>
				)}

				{/* <NavLink to="serviceProviders">Service Providers </NavLink> */}
				<NavLink to="administrativeAreas">Administrative Areas </NavLink>
			</nav>
			<Outlet />
		</div>
	);
};

export default AdminLayout;
