import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="not-found">
			<h1>OOOPS</h1>
			<h2>Page Not Found</h2>
			<p>
				Go to home page
				<Link to="/">Home Page</Link>.
			</p>
		</div>
	);
};

export default NotFound;
