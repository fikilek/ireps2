import React from "react";
import "./NoPageFound.css";
import oops1 from "../../images/oops1.jpg";
import { useNavigate } from "react-router-dom";

const NoPageFound = () => {
	const navigate = useNavigate();
	return (
		<div className="no-page-found">
			<img src={oops1} alt="error 404" />
			<h3 className="npf-404">Page Not Found</h3>
			<div className="pnf-btns">
				<button className="npf-btn npf-go-home-btn" onClick={() => navigate("/")}>
					Go Home...
				</button>
				<button className="npf-btn npf-go-back-btn" onClick={() => navigate(-1)}>
					Go Back...
				</button>
			</div>
		</div>
	);
};

export default NoPageFound;
