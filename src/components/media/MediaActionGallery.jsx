import { useContext, useEffect, useRef, useState } from "react";
import "./MediaActionGallery.css";
import useAuthContext from "../../hooks/useAuthContext";
import useGeoLocation from "../../hooks/useGeolocation";
import { format } from "date-fns";
import useStorage from "../../hooks/useStorage";
import { MediaContext } from "../../contexts/MediaContext";
import { BsSend } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { constants, irepsIcons } from "../../utils/utils";
import { toast } from "react-toastify";
import useImage from "../../hooks/useImage";
import imagePlaceHolder from "../../images/place_holder1.png";
import MediaMBBtn from "./MediaMBBtn";
import WindowCloseBtn from "../irepsInfoWindow/WindowCloseBtn";

const MediaActionGallery = props => {
	// console.log(`props`, props);
	const { data } = props;

	const imgRef = useRef(null);
	const resizeRef = useRef(null);

	const [activeWindow, setActiveWindow] = useState("resized");
	const selectWindow = selected => {
		setActiveWindow(selected);
	};

	const [resizedBase64URL, setResizedBase64URL] = useState(null);

	const [file, setFile] = useState(null);

	const [isPending, setIsPending] = useState(null);
	// console.log(`isPending`, isPending);

	const [mediaMetadata, setMediaMetadata] = useState({});

	const { uploadFile, url, error: storageError } = useStorage(data);

	const { user } = useAuthContext();

	const { resizeImg, getBase64URL } = useImage();

	const { mediaData, setMediaData } = useContext(MediaContext);

	const { userLocation } = useGeoLocation();

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

		const reader = new FileReader();
		reader.onload = e => {
			imgRef.current.src = e.target?.result;
			setFile(e.target?.result);
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

	useEffect(() => {
		resizeImg(file, 1200, true, mediaMetadata).then(blob => {
			// console.log(`blob`, blob);
			if (file) {
				getBase64URL(blob).then(resizedFile => {
					// console.log(`resizedFile`, resizedFile);
					setResizedBase64URL(resizedFile);
				});
			}
		});
	}, [file, getBase64URL, resizeImg, mediaMetadata]);

	const uploadMedia = e => {
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

	const closeMediaAction = e => {
		setMediaData({
			...mediaData,
			activeMediaAction: null,
		});
	};

	const discardImg = e => {
		setResizedBase64URL(null);
		setFile(null);
		imgRef.current.src = "";
		imgRef.current.alt = "";
		resizeRef.current.src = "";
		resizeRef.current.alt = "";
	};

	return (
		<div className="media-action-gallery">
			<div className="mag">
				<div className="mag-wrapper">
					<div className="magw">
						<div
							className={`magpp original ${
								activeWindow === "original" ? "show" : "hide"
							} `}
						>
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
						<div
							className={`magpp resized ${
								activeWindow === "resized" ? "show" : "hide"
							}`}
						>
							<p>Resized Picture</p>
							<img
								ref={resizeRef}
								className="img-preview"
								width={150}
								height={150}
								src={resizedBase64URL || imagePlaceHolder}
								alt="resizedBase64URL"
							/>
						</div>
					</div>
					<div className="mmb-btns">
						{/* Btn to select original img window */}
						{file && (
							<MediaMBBtn
								selectWindow={discardImg}
								mmbIcon={irepsIcons.ICON_DISCARD}
								color={""}
								label={"discard"}
								title={"DISCARD Image / Reset"}
							/>
						)}

						{file && (
							<MediaMBBtn
								selectWindow={selectWindow}
								mmbIcon={irepsIcons.ICON_IMAGE1}
								color={""}
								label={"original"}
								title={"View Original Image"}
							/>
						)}

						{/* Btn to select resized img window */}
						{resizedBase64URL && (
							<MediaMBBtn
								selectWindow={selectWindow}
								mmbIcon={irepsIcons.ICON_IMAGE2}
								color={""}
								label={"resized"}
								title={"View Resized Image"}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="mag mac-control-bar">
				<div className="magcb magcb-left">
					<form>
						<input type="file" accept="image/*" onChange={handleFile} />
					</form>
				</div>

				<div className="magcb magcb-right">
					{resizedBase64URL && (
						<>
							<button
								disabled={!Boolean(resizedBase64URL)}
								// title={title}
								className="mab btn-submit-form"
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
						</>
					)}
					<WindowCloseBtn handleClose={closeMediaAction} />
				</div>
			</div>
		</div>
	);
};

export default MediaActionGallery;
