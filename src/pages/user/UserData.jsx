import "./User.css";
import React, { useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import UserDataHeader from "./UserDataHeader";
import UserDetail from "./UserDetail";
import { useFirestore } from "../../hooks/useFirestore";

const UserData = () => {
	// console.log(`UserData`);

	// get user data from userContext
	const { user } = useAuthContext() || {};
	// console.log(`user`, user);

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	useEffect(() => {
		if (user?.uid) {
			getDocument(user?.uid);
		}
	}, [user?.uid]);

	const userDetailData = {
		// from firebase  firestore
		companyName: response?.document?.companyName,
		email: response?.document?.email,
		phoneNumber: response?.document?.phoneNumber,
		accStatus: response?.document?.status,
		surname: response?.document?.surname,
		name: response?.document?.name,
		workbase: response?.document?.workbase,
		createdAtDatetime: response?.document?.metaData?.createdAtDatetime,

		// from firebase auth
		emailVerified: user?.emailVerified,
		lastSignInTime: user?.metadata?.lastSignInTime,
	};

	const udLl = <p>User Details</p>;
	const udLr = <p></p>;
	const udRl = <p className="data-emphasis">Acc Status: Active</p>;
	const udRr = <p className="data-emphasis">Online: Yes</p>;
	return (
		<div className="user-data">
			<UserDataHeader udLl={udLl} udLr={udLr} udRl={udRl} udRr={udRr} />
			<div className="user-data-body">
				<div className="udb-section">
					<UserDetail userDetailData={userDetailData} />
				</div>
				<div className="udb-section body-right"></div>
			</div>
		</div>
	);
};

export default UserData;
