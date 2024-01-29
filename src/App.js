import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

// import pages
import Home from "./pages/home/Home";
import Erfs from "./pages/erfs/Erfs";
import Trns from "./pages/trns/Trns";
import Asts from "./pages/asts/Asts";
import AdminLayout from "./pages/admin/AdminLayout";
// import User from "./pages/users/User";
import UserProfile from "./pages/user/UserProfile";
import Users from "./pages/users/Users";

// Layouts
import RootLayout from "./components/layouts/RootLayout";
import NotFound from "./pages/error/NotFound";

import Modal from "./components/modals/Modal";

import ModalContextProvider from "./contexts/ModalContext";
import AuthContextProvider from "./contexts/AuthContextProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="erfs" element={<Erfs />} />
			<Route path="trns" element={<Trns />} />
			<Route path="asts" element={<Asts />} />
			<Route path="admin" element={<AdminLayout />}>
				<Route path="users" element={<Users />} />
			</Route>
			<Route path="user" element={<UserProfile />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

function App() {
	return (
		<AuthContextProvider>
			<ModalContextProvider>
				<div className="App">
					<RouterProvider router={router} />
					<ToastContainer />
				</div>
				<Modal />
			</ModalContextProvider>
		</AuthContextProvider>
	);
}

export default App;
