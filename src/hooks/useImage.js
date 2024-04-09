import { useContext } from "react";
import { MediaContext } from "../contexts/MediaContext";

const useImage = () => {
	// convert a base64 image file to image dom element
	const { mediaData, setMediaData } = useContext(MediaContext);
	
	function _createImg(photo) {
		const img = new Image();
		img.src = photo;
		return img;
	}

	function prefixFileName(url, prefix) {
		let filename = url.split("%2F").pop();
		filename = `${prefix}${filename}`;
		return `${url.split("%2F").slice(0, -1).join("%2F")}%2F${filename}`;
	}

	function _resizer(img, size) {
		// console.log(`resize used`)
		let x = 0,
			y = 0,
			w = 500,
			h = 500;

		if (img.naturalWidth > img.naturalHeight) {
			if (img.naturalWidth > size) {
				w = size;
				h = (size * img.naturalHeight) / img.naturalWidth;
			}
		} else {
			if (img.naturalHeight > size) {
				h = size;
				w = (size * img.naturalWidth) / img.naturalHeight;
			}
		}
		console.log(x, y, w, h);
		return [x, y, w, h];
	}

	function _cropper(img, size) {
		// console.log(`cropper used`)
		let x = 0,
			y = 0,
			w = size,
			h = size;

		if (img.naturalWidth > img.naturalHeight) {
			w = (size * img.naturalWidth) / img.naturalHeight;
			x = -Math.abs(w - size) / 2;
		} else {
			h = (size * img.naturalHeight) / img.naturalWidth;
			y = -Math.abs(h - size) / 2;
		}
		// console.log(x, y, w, h);
		return [x, y, w, h];
	}

	async function getBase64URL(file) {
		if (!file || !file.type.startsWith("image/"))
			throw new Error("Only images are accepted (jpeg, gif, png)");
		const reader = new FileReader();
		reader.readAsDataURL(file);

		return new Promise(resolve => {
			reader.onload = e => {
				resolve(e.target.result);
			};
		});
	}

	function resizeImg(photo, size, crop = false, mediaMetadata) {
		// console.log(`mediaMetadata`, mediaMetadata);
		const {
			mediaCategory,
			// astNo,
			erfNo,
			createdAtDatetime,
			createdByUser,
			createdAtLocation,
		} = mediaMetadata;
		const canvas = document.createElement("canvas");
		// console.log(`canvas`, canvas);

		const ctx = canvas.getContext("2d");
		const img = _createImg(photo);
		// console.log(`img`, img);

		const [x, y, w, h] = crop ? _cropper(img, size) : _resizer(img, size);
		// console.log(`x,y, w,h :`, x, y, w, h);
		canvas.width = crop ? size : w;
		canvas.height = crop ? size : h;

		ctx.drawImage(img, x, y, w, h);
		// console.log(`ctx`, ctx);

		// ctx.fillRect(10, 10, 420, 210)
		ctx.fillStyle = "blue";
		ctx.font = "30px sans-serif";
		ctx.fillText(mediaCategory, 10, 50);
		// ctx.fillText("Ast No: 04 123 3456 ", 10, 300);
		ctx.fillText(`Efr No: ${erfNo}`, 10, 250);
		ctx.fillText(createdAtDatetime, 10, 100);
		ctx.fillText(createdByUser, 10, 150);
		ctx.fillText(
			`(${Number(createdAtLocation?.lat).toFixed(6).trim()}/${Number(createdAtLocation?.lng).toFixed(6).trim()})`,
			10,
			200
		);
		return new Promise(resolve => {
			canvas.toBlob(blob => {
				resolve(blob);
			}, "image/jpeg");
		});
	}

	return { resizeImg, getBase64URL, prefixFileName };
};

export default useImage;
