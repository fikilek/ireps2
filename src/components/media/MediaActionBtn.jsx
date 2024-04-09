import { IconContext } from 'react-icons';
import './MediaActionBtn.css'

const MediaActionBtn = (props) => {
  const { id, actionClassname, title, actionIcon, clickHanderFunction, color, active } = props;
  
  return (
			<div className="media-action-btn">
				<button
					id={id} //id
					onClick={clickHanderFunction} // clickHanderFunction
					className={`mab ${actionClassname} ${active} `} // classname
					title={title} // title
				>
					<IconContext.Provider value={{ color: color, fontSize: "3rem" }}>
						{actionIcon}
					</IconContext.Provider>
				</button>
			</div>
		);
}

export default MediaActionBtn