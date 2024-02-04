import "./UserPhoto.css";
import { MdAddAPhoto, MdPhoto } from "react-icons/md";
import userPicPlaceHolder from "../../images/userPics/userPicPlaceHolder.png";
import useAuthContext from "../../hooks/useAuthContext";

const UserPhoto = () => {
	const { user } = useAuthContext();
	const { photoUrl } = user || {};

	return (
		<div className="user-photo">
			<div className="photo">
				<img
					src={photoUrl || userPicPlaceHolder}
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
	);
};

export default UserPhoto;
