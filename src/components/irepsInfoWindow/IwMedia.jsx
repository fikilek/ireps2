import Media from "../media/Media";
import MediaActionBtns from '../media/MediaActionBtns'
import IrepsInfoWindow from "./IrepsInfoWindow";
import "./IwMedia.css";

const IwMedia = props => {
  // console.log(`props`, props)
  const {data} = props
	return (
		<IrepsInfoWindow
			fhl1={"Media"}
			fhl3={
				<span>
					Erf No: <span className="data-emphasis">{data.erfNo}</span>
				</span>
			}
			fhr1={<MediaActionBtns />}
		>
			<Media data={data} />
		</IrepsInfoWindow>
	);
};

export default IwMedia;
