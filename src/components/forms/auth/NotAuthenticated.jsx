import React from "react";
import "./NotAuthenticated.css";
import oops1 from "../../../images/oops1.jpg";
import { useLocation, useNavigate } from "react-router-dom";

const NotAuthenticated = () => {
	const navigate = useNavigate();

	const location = useLocation();

	const msg = location?.state?.msg || null;

	return (
		<div className="not-authenticated">
			<img src={oops1} alt="not authenticated" />
			<h3 className="na-msg">{msg}</h3>
			<div className="na-btns">
				<button className="na-btn na-go-home-btn" onClick={() => navigate("/")}>
					Go Home...
				</button>
			</div>
		</div>
	);
};

export default NotAuthenticated;
