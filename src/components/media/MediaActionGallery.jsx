import { useContext, useEffect, useRef, useState } from "react";
import "./MediaActionGallery.css";
import useAuthContext from "../../hooks/useAuthContext";
import useGeoLocation from "../../hooks/useGeolocation";
import { format } from "date-fns";
import useStorage from "../../hooks/useStorage";
import { MediaContext } from "../../contexts/MediaContext";
import { BsSend } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { constants } from "../../utils/utils";
import { toast } from "react-toastify";
import useImage from "../../hooks/useImage";
import imagePlaceHolder from "../../images/place_holder1.png";

const MediaActionGallery = props => {
	// console.log(`props`, props);
	const { data } = props;

	const [file, setFile] = useState(null);

	const [resizedBase64URL, setResizedBase64URL] = useState(null);
	// console.log(`resizedBase64URL`, resizedBase64URL);

	const [isPending, setIsPending] = useState(null);
	// console.log(`isPending`, isPending);

	const [mediaMetadata, setMediaMetadata] = useState({});
	// console.log(`mediaMetadata`, mediaMetadata);

	const { uploadFile, url, error: storageError } = useStorage(data);
	// console.log(`progress`, progress);
	// console.log(`url`, url);
	// console.log(`storageError`, storageError);

	const { user } = useAuthContext();

	const { resizeImg, getBase64URL } = useImage();

	const { mediaData, setMediaData } = useContext(MediaContext);

	const { userLocation } = useGeoLocation();

	const imgRef = useRef(null);

	const handleFile = e => {
		const file = e.target.files[0];
		const allowedType = ["image/png", "image/jpeg"];
		if (!file) return;
		if (
			!Boolean(userLocation?.coordinates?.lat) ||
			!Boolean(userLocation?.coordinates?.lng)
		) {
			toast.error(`User Gps Coordinates required when uploading an image`, {
				position: "top-right",
			});
			return;
		}

		if (!allowedType.includes(file.type)) {
			toast.error(`File must be of type jpeg or png`, {
				position: "top-right",
			});
			return;
		}

		// file is now valid, create file reader object so a to read the file stream
		const reader = new FileReader();
		reader.onload = e => {
			imgRef.current.src = e.target.result;
			setFile(e.target.result);
		};
		reader.readAsDataURL(file);
		setMediaMetadata({
			erfId: data.id,
			erfNo: data.erfNo,
			contentType: file?.type,
			// TODO: revisit - mediaType should not be hardcoded
			mediaType: "photo",
			// TODO: revisit - mediaCategory should not be hardcoded
			mediaCategory: "erfPhoto", // eg meter no photo, meter serail no photo , etc
			createdByUser: user.displayName,
			createdByUserId: user.uid,
			createdAtDatetime: format(new Date(), constants.dateFormat2),
			createdAtLocation: {
				lat: userLocation?.coordinates?.lat,
				lng: userLocation?.coordinates?.lng,
			},
		});
	};

	const handleClick = e => {
		setMediaData({
			...mediaData,
			activeMediaAction: null,
		});
	};

	useEffect(() => {
		resizeImg(file, 1200, true, mediaMetadata).then(blob => {
			// console.log(`blob`, blob);
			if (file) {
				getBase64URL(blob).then(resizedFile => {
					// console.log(`resizedFile`, resizedFile);
					setResizedBase64URL(resizedFile);
				});
			} else {
				setResizedBase64URL(imagePlaceHolder);
			}
		});
	}, [file]);

	const uploadMedia = e => {
		console.log(`uploading media`);

		// Check id data is ready for upload.
		if (!mediaMetadata.createdAtLocation.lat) {
			toast.error(`Cannot upload without user Gps coordinates.`, {
				position: "top-right",
			});
			return null;
		}
		setIsPending(true);
		uploadFile(resizedBase64URL, data.irepsKeyItem, data.id, mediaMetadata);
	};

	useEffect(() => {
		// console.log(`url`, url);
		if (Boolean(url) || storageError) {
			setIsPending(false);
			// remove file - this will remove image from MediaActionGallery window
			setFile(null);
			// hide MediaActionGallery window
			setMediaData({
				...mediaData,
				activeMediaAction: null,
			});
		}
		if (storageError) {
			toast.error(`Storage Error : ${storageError}`, {
				position: "top-right",
			});
		} // free memory when ever this component is unmounted
		return () => {
			setResizedBase64URL(null);
			// setBase64URL(null);
		};
	}, [url, storageError, mediaData, setMediaData]);

	return (
		<div className="media-action-gallery">
			<div className="mag mag-form">
				<form>
					<input type="file" accept="image/*" onChange={handleFile} />
					<div className="upload-btns">
						<div className="form-submit-btn">
							<button
								disabled={!Boolean(file)}
								// title={title}
								className="form-btn btn-submit-form"
								type="button"
								onClick={uploadMedia}
							>
								{isPending ? (
									<ClipLoader
										color={"#F86F03"}
										loading={isPending < 100}
										size={20}
										aria-label="Loading Spinner"
										data-testid="loader"
									/>
								) : (
									<BsSend />
								)}
							</button>
						</div>
						<button type="button" className="mah-btn" onClick={handleClick}>
							X
						</button>
					</div>
				</form>
			</div>
			{/* {file && ( */}
			<div className="mag photo-preview">
				<div className="magpp original">
					<p>Original Picture</p>
					<img
						className="img-preview"
						ref={imgRef}
						width={150}
						height={150}
						src={imagePlaceHolder}
						alt="ireps pic"
					/>
				</div>
				<div className="magpp resized">
					<p>Resized Picture (1000px/1000px)</p>
					<img
						className="img-preview"
						width={150}
						height={150}
						src={resizedBase64URL}
						alt="resizedBase64URL"
					/>
				</div>
			</div>
		</div>
	);
};

export default MediaActionGallery;
