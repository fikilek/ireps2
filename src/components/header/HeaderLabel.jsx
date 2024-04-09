import "./HeaderLabel.css";

const HeaderLabel = (props) => {
  const {labelName, label} = props
  return (
			<div className="header-label">
				<p className="lable-name">{labelName}: <span className=" label text-emphasis2">{label}</span></p>
			</div>
		);
}

export default HeaderLabel