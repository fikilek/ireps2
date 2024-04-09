import { IconContext } from "react-icons";
import "./WindowCloseBtn.css";
import { MdOutlineClose } from "react-icons/md";

const WindowCloseBtn = props => {
	const { handleClose, color } = props;
	const clr = color ? color : '#f2f'
	return (
		<div className="window-close-btn">
			<button onClick={handleClose} className="close-btn">
				<IconContext.Provider value={{ color: clr }}>
					<MdOutlineClose />
				</IconContext.Provider>
			</button>
		</div>
	);
};

export default WindowCloseBtn;
