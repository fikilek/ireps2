import "./MediaMobileFilter.css";

const MediaMobileFilter = (props) => {
	const { mmfIcon, label, color, name } = props;
	return (
		<div className="media-mobile-filter" style ={{color: {color}}} title={name}>
      <div className="icon">{mmfIcon}</div>
      <p className="label">{label}</p>
		</div>
	);
};

export default MediaMobileFilter;
