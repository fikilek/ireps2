import "./User.css";
import React from "react";
import { MdAddAPhoto, MdPhoto } from "react-icons/md";
import userPicPlaceHolder from "../../images/userPics/userPicPlaceHolder.png";
import useAuthContext from "../../hooks/useAuthContext";

const UserDetails = () => {
	// console.log(`props`, props)

	// get user data from userContext
	const { user } = useAuthContext();
	console.log(`user`, user);

	// const { email, emailVerified, photoUrl, uid } = user;
	// const { createdAtDatetime } = metaData;

	// get user details from firestore on snapshot
	// const { document } = useDocumentSync("users", uid);
	// console.log(`error`, error)
	// console.log(`document`, document)

	return (
		<div className="user-data user-details">
			<div className="header">
				<h3>User Details</h3>
				<p>
					Acc Status :<span className="data-emphasis">Active</span>{" "}
				</p>
				<div>
					online:{" "}
					<span className="data-emphasis">
						{document?.online ? "online" : "offline"}
					</span>
				</div>
			</div>
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
					<div className="user-photo">
						<img
							// src={photoUrl || userPicPlaceHolder}
							alt="user profile pic"
							width="150"
							height={"150"}
						/>
					</div>
					<div className="photo-btns">
						<button title="take a photo">
							<MdAddAPhoto />
						</button>
						<button title="get saved photo">
							<MdPhoto />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
