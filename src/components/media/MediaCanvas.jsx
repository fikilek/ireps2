import { useEffect, useRef } from "react";
import "./MediaCanvas.css";
import useImage from "../../hooks/useImage";

const draw = ctx => {
	ctx.fillStyle = "red";
	ctx.fillRect(10, 10, 100, 100);
};

const MediaCanvas = () => {
	const imgRef = useRef(null);

	useEffect(() => {
		const canvas = imgRef.current;
		console.log(`canvas`, canvas);
    const ctx = canvas.getContext("2d");
    draw(ctx)
	}, []);

	return <canvas ref={imgRef} className="media-canvas"></canvas>;
};

export default MediaCanvas;
