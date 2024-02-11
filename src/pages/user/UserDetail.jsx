import "./UserDetail.css";
import UserDataEditBtn from "./UserDataEditBtn";
import UserDataField from "./UserDataField";
import UserPhoto from "./UserPhoto";
import UserAuthField from "./UserAuthField";
import { format } from "date-fns";
import { constants } from "../../utils/utils";
import { CiFaceSmile } from "react-icons/ci";

const UserDetail = props => {
	return (
		<div className="user-detail">
			<div className="editable">
				<div className="editable-fields">
					<UserDataField
						fieldKey={"Surname"}
						fieldValue={props?.userDetailData?.surname}
					/>
					<UserDataField
						fieldKey={"Name"}
						fieldValue={props?.userDetailData?.name}
					/>
					<UserDataField
						fieldKey={"Company"}
						fieldValue={props?.userDetailData?.companyName}
					/>
					<UserDataField
						fieldKey={"Workbase"}
						fieldValue={props?.userDetailData?.workbase}
					/>
				</div>
				<div className="edit-btn">
					<UserDataEditBtn
						formData={{
							surname: props?.userDetailData?.surname,
							name: props?.userDetailData?.name,
							companyName: props?.userDetailData?.companyName,
							workbase: props?.userDetailData?.workbase,
						}}
					/>
				</div>
			</div>
			<div className="auth-fields">
				<UserAuthField
					fieldKey={"Email"}
					fieldValue={props?.userDetailData?.email}
					verified={props?.userDetailData?.emailVerified}
				/>
				<UserAuthField
					fieldKey={"Phone No"}
					fieldValue={props?.userDetailData?.phoneNumber}
					verified={CiFaceSmile}
				/>
			</div>

			<div className="non-editable">
				<div className="ne">
					<UserDataField
						fieldKey={"Created At"}
						fieldValue={
							props.userDetailData.creationTime &&
							format(
								new Date(props?.userDetailData?.creationTime),
								constants.dateFormat1
							)
						}
					/>
					<UserDataField
						fieldKey={"Last signon"}
						fieldValue={
							props?.userDetailData?.lastSignInTime &&
							format(
								new Date(props?.userDetailData?.lastSignInTime),
								constants.dateFormat1
							)
						}
					/>
				</div>

				<UserPhoto />
			</div>
		</div>
	);
};

export default UserDetail;
