import {
	BrowserRouter,
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

// Layouts
import RootLayout from "./components/layouts/RootLayout";

// others
import NoPageFound from "./pages/error/NoPageFound";
import Modal from "./components/modals/Modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./components/forms/auth/RequireAuth";
import { loader } from "./utils/utils";
import { Suspense, lazy } from "react";
import FormSignin from "./components/forms/auth/FormSignin";

// Context providers
import ModalContextProvider from "./contexts/ModalContext";
import AuthContextProvider from "./contexts/AuthContextProvider";
import ClaimsContextProvider from "./contexts/ClaimsContext";
import NotAuthenticated from "./components/forms/auth/NotAuthenticated";

// Lazy loading
const AdminLayout = lazy(() => import("./components/layouts/AdminLayout"));
const SystemTablesLayout = lazy(() =>
	import("./components/layouts/SystemTablesLayout")
);

const UserProfile = lazy(() => import("./pages/user/UserProfile"));
const Users = lazy(() => import("./pages/users/Users"));

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route
				path="erfs"
				element={
					<RequireAuth
						allowedRoles={[
							"guest",
							"fieldworker",
							"supervisor",
							"manager",
							"superuser",
						]}
					>
						<Erfs />
					</RequireAuth>
				}
			/>
			<Route
				path="trns"
				element={
					<RequireAuth
						allowedRoles={[
							"guest",
							"fieldworker",
							"supervisor",
							"manager",
							"superuser",
						]}
					>
						<Trns />
					</RequireAuth>
				}
			/>
			<Route
				path="asts"
				element={
					<RequireAuth
						allowedRoles={[
							"guest",
							"fieldworker",
							"supervisor",
							"manager",
							"superuser",
						]}
					>
						<Asts />
					</RequireAuth>
				}
			/>
			<Route
				path="admin"
				element={
					<Suspense fallback={loader}>
						<RequireAuth allowedRoles={["manager", "superuser"]}>
							<AdminLayout />
						</RequireAuth>
					</Suspense>
				}
			>
				<Route
					path="users"
					element={
						<Suspense fallback={loader}>
							<RequireAuth>
								<Users />
							</RequireAuth>
						</Suspense>
					}
				/>
				<Route
					path="systemTables"
					element={
						<Suspense fallback={loader}>
							<RequireAuth allowedRoles={["superuser"]}>
								<SystemTablesLayout />
							</RequireAuth>
						</Suspense>
					}
				>
					<Route
						path="astStates"
						element={
							<RequireAuth allowedRoles={["superuser"]}>
								<TableAstStates />
							</RequireAuth>
						}
					/>
					<Route
						path="trnStates"
						element={
							<RequireAuth allowedRoles={["superuser"]}>
								<TableTrnStates />
							</RequireAuth>
						}
					/>
				</Route>
			</Route>
			<Route
				path="user"
				element={
					<Suspense fallback={loader}>
						<RequireAuth
							allowedRoles={[
								"guest",
								"fieldworker",
								"supervisor",
								"manager",
								"superuser",
							]}
						>
							<UserProfile />
						</RequireAuth>
					</Suspense>
				}
			/>

			{/* unauthorised section -----------------------------------------------------*/}
			{/* path to unauthhorised  */}

			<Route path="/unauthorised" element={<NotAuthenticated />} />
			<Route path="/signin" element={<FormSignin />} />

			<Route path="*" element={<NoPageFound />} />
		</Route>
	)
);

function App() {
	return (
		<ClaimsContextProvider>
			<AuthContextProvider>
				<ModalContextProvider>
					<div className="App">
						<RouterProvider router={router} />
						<ToastContainer />
					</div>
					<Modal />
				</ModalContextProvider>
			</AuthContextProvider>
		</ClaimsContextProvider>
	);
}

export default App;
