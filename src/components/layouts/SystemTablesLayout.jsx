import { NavLink, Outlet } from "react-router-dom";

const SystemTables = () => {
	return (
		<div className="sidebar-main-layout">
			<nav className="sidebar-main-nav">
				<NavLink to="astStates">Asts States </NavLink>
				<NavLink to="trnStates">Trns States </NavLink>
			</nav>
			<Outlet />
		</div>
	);
};

export default SystemTables;
