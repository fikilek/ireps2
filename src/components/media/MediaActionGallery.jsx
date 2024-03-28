import { useContext, useEffect, useState } from "react";
import "./MediaActionGallery.css";
import useAuthContext from "../../hooks/useAuthContext";
import useGeoLocation from "../../hooks/useGeolocation";
import { format } from "date-fns";
import useStorage from "../../hooks/useStorage";
import { MediaContext } from "../../contexts/MediaContext";
import { BsSend } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { constants } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const MediaActionGallery = props => {
	// console.log(`props`, props);
	const { data } = props;

	const { mediaData, setMediaData } = useContext(MediaContext);

	const [file, setFile] = useState(null);
	// console.log(`file`, file);
	const [error, setError] = useState(null);
	const [mediaMetadata, setMediaMetadata] = useState({});
	// console.log(`mediaMetadata`, mediaMetadata);
	const [preview, setPreview] = useState();
	// console.log(`preview`, preview);

	const [isPending, setIsPending] = useState(null);
	// console.log(`isPending`, isPending);

	const { uploadFile, url, error: storageError } = useStorage(data);
	// console.log(`progress`, progress);
	// console.log(`url`, url);
	// console.log(`storageError`, storageError);

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
			setError(storageError);
		}
	}, [url, storageError]);

	const { userLocation } = useGeoLocation();
	// console.log(`userLocation`, userLocation);

	useEffect(() => {
		if (useLocation.error) {
			setError(useLocation.error);
		}
	}, [userLocation]);

	const { user } = useAuthContext();

	const handleChange = e => {
		const selectedFile = e.target.files[0];
		const allowedType = ["image/png", "image/jpeg"];
		if (!selectedFile) return;
		if (allowedType.includes(selectedFile.type)) {
			setFile(selectedFile);
			setError(null);
			setMediaMetadata({
				erfId: data.id,
				erfNo: data.erfNo,
				contentType: file?.type,
				mediaType: "photo",
				mediaCategory: "erfPhoto", // eg meter no photo, meter serail no photo , etc
				createdByUser: user.displayName,
				createdByUserId: user.uid,
				createdAtDatetime: format(new Date(), constants.dateFormat2),
				createdAtLocation: {
					lat: userLocation?.coordinates?.lat,
					lng: userLocation?.coordinates?.lng,
				},
			});
		} else {
			setFile(null);
			setError("File must be of type jpeg or png");
		}
	};

	const uploadMedia = e => {
		// console.log(`uploading media`);

		// Check id data is ready for upload.
		if (!mediaMetadata.createdAtLocation.lat) {
			toast.error(`Cannot upload without user Gps coordinates.`, {
				position: "top-right",
			});
			return null
		}
		setIsPending(true);
		uploadFile(file, data.irepsKeyItem, data.id, mediaMetadata);
	};

	// create a preview as a side effect, whenever selected file is changed
	useEffect(() => {
		if (!file) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(file);
		setPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [file]);

	const handleClick = e => {
		setMediaData({
			...mediaData,
			activeMediaAction: null,
		});
	};

	return (
		<div className="media-action-gallery">
			<div className="mag mac-form">
				<form>
					<input type="file" onChange={handleChange} />
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
			{error && <p className="error">{error}</p>}
			{file && (
				<div className="mag photo-preview">
					<img
						className="img-preview"
						width={"100%"}
						height={"auto"}
						src={preview}
						alt="preview"
					/>
				</div>
			)}
		</div>
	);
};

export default MediaActionGallery;
