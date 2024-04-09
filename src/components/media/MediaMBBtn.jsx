import { IconContext } from "react-icons";
import "./MediaMBBtn.css";

// Media Mobile Btn - MediaMMBtn
const MediaMBBtn = (props) => {
  const {id, selectWindow, mmbIcon, color, label, title} = props
  return (
			<div className="media-mb-btn">
				<button
					id={id} //id
					onClick={() => selectWindow(label)} 
					className={`mmb ${label}`} // media-mobile-btn - mmb
					title={title} // title
				>
					<IconContext.Provider value={{ color: color, fontSize: "3rem", width: "3.5rem" }}>
						{mmbIcon}
					</IconContext.Provider>
				</button>
			</div>
		);
}

export default MediaMBBtn