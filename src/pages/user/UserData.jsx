import "./User.css";
import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import UserDataHeader from "./UserDataHeader";
import UserPhoto from "./UserPhoto";
import UserDataEditBtn from "./UserDataEditBtn";

const UserData = () => {
	// console.log(`props`, props)

	// get user data from userContext
	const { user } = useAuthContext() || {};
	// console.log(`user`, user);

	// const { email, emailVerified, photoUrl, uid } = user;
	// const { createdAtDatetime } = metaData;

	// get user details from firestore on snapshot
	// const { document } = useDocumentSync("users", uid);
	// console.log(`error`, error)
	// console.log(`document`, document)

	const udLl = <p>User Details</p>;
	const udLr = <p></p>;
	const udRl = <p className="data-emphasis">Acc Status: Active</p>;
	const udRr = <p className="data-emphasis">Online: Yes</p>;
	return (
		<div className="user-data user-details">
			<UserDataHeader udLl={udLl} udLr={udLr} udRl={udRl} udRr={udRr} />
			<div className="body user-details-body">
				<div className="body-section body-left">
					<p> Company: </p>
					<p> Workbase: </p>
					<p> Surname: </p>
					<p> Name: </p>
					<p>
						{" "}
						Email: xxxxx <span>{"verified: yes"}</span>{" "}
					</p>
					<p> Phone No : </p>
					<p> Created At : </p>
					<p> Last signon : </p>
				</div>
				<div className="body-section body-right ">
					<UserPhoto />
					<UserDataEditBtn />
				</div>
			</div>
		</div>
	);
};

export default UserData;
