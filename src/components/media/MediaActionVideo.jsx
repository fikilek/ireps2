import { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./MediaActionVideo.css";
import useAuthContext from "../../hooks/useAuthContext";
import useGeoLocation from "../../hooks/useGeolocation";
import { format } from "date-fns";
import useStorage from "../../hooks/useStorage";
import { MediaContext } from "../../contexts/MediaContext";
import { BsSend } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { constants } from "../../utils/utils";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import MediaActionBtn from "./MediaActionBtn";
import WindowCloseBtn from "../irepsInfoWindow/WindowCloseBtn";
import { irepsIcons } from "../../utils/utils";

const videoConstraints = {
	facingMode: "user",
};

const MediaActionVideo = props => {
	// console.log(`props`, props);
	const { data } = props;

	const webcamRef = useRef(null);

	const mediaRecorderRef = useRef(null);
	// console.log(`mediaRecorderRef.current`, mediaRecorderRef.current);

	const [recording, setRecording] = useState(false);
	// console.log(`recording`, recording);

	const [recordedChunks, setRecordedChunks] = useState([]);
	// console.log(`recordedChunks`, recordedChunks);

	const [video, setVideo] = useState(null);
	// console.log(`video`, video);

	const { uploadFile, url, error: storageError } = useStorage(data);

	const [isPending, setIsPending] = useState(null);
	// console.log(`isPending`, isPending);

	const [mediaMetadata, setMediaMetadata] = useState({});
	// console.log(`mediaMetadata`, mediaMetadata);

	// video constraints
	const [vc, setVc] = useState(videoConstraints);

	const { user } = useAuthContext();

	// const { resizeImg, getBase64URL } = useImage();

	const { mediaData, setMediaData } = useContext(MediaContext);

	const { userLocation } = useGeoLocation();

	const closeMediaAction = e => {
		setMediaData({
			...mediaData,
			activeMediaAction: null,
		});
	};

	const uploadMedia = e => {
		// Check id data is ready for upload.
		console.log(`uploading video`, e);

		if (!mediaMetadata.createdAtLocation.lat) {
			toast.error(`Cannot upload without user Gps coordinates.`, {
				position: "top-right",
			});
			return null;
		}
		setIsPending(true);
		uploadFile(video, data.irepsKeyItem, data.id, mediaMetadata, 'video');
	};

	useEffect(() => {
		// console.log(`url`, url);
		if (Boolean(url) || storageError) {
			setIsPending(false);
			// remove file - this will remove image from MediaActionVideo window
			setVideo(null);
			setRecordedChunks([]);
			// hide MediaActionVideo window
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
			setVideo(null);
			setRecordedChunks([]);
		};
	}, [url, storageError, mediaData, setMediaData]);

	const discard = e => {
		setVideo(null);
		setRecordedChunks([]);
	};

	const chooseDevice = e => {
		console.log(`e.currentTarget.id`, e.currentTarget.id);
		setVc({
			...vc,
			facingMode:
				e.currentTarget.id === "selfie" ? "user" : { exact: "environment" },
		});
	};

	const handleDataAvailable = useCallback(
		({ data }) => {
			if (data.size > 0) {
				setRecordedChunks(prev => prev.concat(data));
			}
		},
		[setRecordedChunks]
	);

	const handleStartCaptureClick = useCallback(() => {
		setRecording(true);
		mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
			mimeType: "video/webm",
		});
		mediaRecorderRef.current.addEventListener(
			"dataavailable",
			handleDataAvailable
		);
		mediaRecorderRef.current.start();
	}, [webcamRef, setRecording, mediaRecorderRef, handleDataAvailable]);

	const handleStopCaptureClick = useCallback(() => {
		mediaRecorderRef.current.stop();
		setRecording(false);
		setMediaMetadata({
			erfId: data.id,
			erfNo: data.erfNo,
			// contentType: file?.type,
			// TODO: revisit - mediaType should not be hardcoded
			mediaType: "video/webm",
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
	}, [
		mediaRecorderRef,
		setRecording,
		data.erfNo,
		data.id,
		user.displayName,
		user.uid,
		userLocation?.coordinates?.lat,
		userLocation?.coordinates?.lng,
	]);

	useEffect(() => {
		if (recordedChunks.length > 0) {
			const blob = new Blob(recordedChunks, {
				type: "video/webm",
			});
			const url = URL.createObjectURL(blob);
			setVideo(url);
		}
	}, [recordedChunks]);

	return (
		<div className="media-action-camera">
			{video ? (
				<div className="macpp ">
					<video controls src={video}></video>
				</div>
			) : (
				<div className="macpp original">
					<Webcam
						className="webcam"
						width={400}
						height={400}
						ref={webcamRef}
						videoConstraints={vc}
						screenshotFormat="image/jpeg"
						audio={false}
					/>
				</div>
			)}

			<div className="mac mac-control-bar">
				<div className="maccb maccb-left">
					{/* Start recording a video */}
					{!recording && !video && (
						<MediaActionBtn
							id={""}
							actionClassname={""}
							title={"START recording"}
							clickHanderFunction={handleStartCaptureClick}
							actionIcon={irepsIcons.ICON_VIDEO_RECORDING2}
							color={"blue"}
						/>
					)}

					{/* Stop recording */}
					{recording && (
						<MediaActionBtn
							id={""}
							actionClassname={""}
							title={"STOP recording"}
							clickHanderFunction={handleStopCaptureClick}
							actionIcon={irepsIcons.ICON_STOP}
							color={"brown"}
						/>
					)}

					{/* Choose front camera */}
					{!video && !recording && (
						<>
							<MediaActionBtn
								id={"selfie"}
								actionClassname={""}
								title={"SELFIE photo"}
								clickHanderFunction={chooseDevice}
								actionIcon={irepsIcons.ICON_CAMERA_SELFIE}
								color={"green"}
							/>

							{/* Choose selfie camera */}
							<MediaActionBtn
								id={"front"}
								actionClassname={""}
								title={"FRONT photo"}
								clickHanderFunction={chooseDevice}
								actionIcon={irepsIcons.ICON_CAMERA_FRONT2}
								color={"orange"}
							/>
						</>
					)}

					{/* Discard video recording */}
					{video && (
						<MediaActionBtn
							id={"discard"}
							actionClassname={""}
							title={"DISCARD video"}
							clickHanderFunction={discard}
							actionIcon={irepsIcons.ICON_DELETE}
							color={"red"}
						/>
					)}
				</div>

				<div className="maccb maccb-right">
					{video && (
						<button
							disabled={!Boolean(video)}
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
					)}
					<WindowCloseBtn handleClose={closeMediaAction} />
				</div>
			</div>
		</div>
	);
};

export default MediaActionVideo;
