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

// import tables
import TableTrnStates from "./components/tables/TableTrnStates";
import TableAstStates from "./components/tables/TableAstStates";

// import User from "./pages/users/User";
import UserProfile from "./pages/user/UserProfile";
import Users from "./pages/users/Users";

// Layouts
import RootLayout from "./components/layouts/RootLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import SystemTablesLayout from "./components/layouts/SystemTablesLayout";

// others
import NotFound from "./pages/error/NotFound";
import Modal from "./components/modals/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RequireAuth } from "./components/forms/auth/FormRequiredAuth";

// Context providers
import ModalContextProvider from "./contexts/ModalContext";
import AuthContextProvider from "./contexts/AuthContextProvider";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route
				path="erfs"
				element={
					<RequireAuth>
						<Erfs />
					</RequireAuth>
				}
			/>
			<Route
				path="trns"
				element={
					<RequireAuth>
						<Trns />
					</RequireAuth>
				}
			/>
			<Route
				path="asts"
				element={
					<RequireAuth>
						<Asts />
					</RequireAuth>
				}
			/>
			<Route
				path="admin"
				element={
					<RequireAuth>
						<AdminLayout />
					</RequireAuth>
				}
			>
				<Route
					path="users"
					element={
						<RequireAuth>
							<Users />
						</RequireAuth>
					}
				/>
				<Route
					path="systemTables"
					element={
						<RequireAuth>
							<SystemTablesLayout />
						</RequireAuth>
					}
				>
					<Route
						path="astStates"
						element={
							<RequireAuth>
								<TableAstStates />
							</RequireAuth>
						}
					/>
					<Route
						path="trnStates"
						element={
							<RequireAuth>
								<TableTrnStates />
							</RequireAuth>
						}
					/>
				</Route>
			</Route>
			<Route
				path="user"
				element={
					<RequireAuth>
						<UserProfile />
					</RequireAuth>
				}
			/>
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
