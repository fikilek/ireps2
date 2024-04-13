import { useContext, useEffect, useRef, useState } from "react";
import "./MediaActionVoice.css";
import useAuthContext from "../../hooks/useAuthContext";
import useGeoLocation from "../../hooks/useGeolocation";
import { format } from "date-fns";
import useStorage from "../../hooks/useStorage";
import { MediaContext } from "../../contexts/MediaContext";
import { BsSend } from "react-icons/bs";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { constants, irepsIcons } from "../../utils/utils";
import { toast } from "react-toastify";
import WindowCloseBtn from "../irepsInfoWindow/WindowCloseBtn";
import MediaActionBtn from "./MediaActionBtn";

const mimeType = "audio/webm";

const MediaActionVoice = props => {
	// console.log(`MediaActionVoice props`, props);
	const { data } = props;

	const [permission, setPermission] = useState(false);
	// console.log(`permission`, permission);

	const mediaRecorder = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");
	// console.log(`recordingStatus`, recordingStatus);

	const [stream, setStream] = useState(null);
	// console.log(`stream`, stream);

	const [audioChunks, setAudioChunks] = useState([]);
	// console.log(`audioChunks`, audioChunks);

	const [audio, setAudio] = useState(null);
	// console.log(`audio`, audio);

	const [audioBlob, setAudioBlob] = useState(null);
	// console.log(`audioBlob`, audioBlob);

	const [isPending, setIsPending] = useState(null);
	// console.log(`isPending`, isPending);

	const { uploadFile, url, error: storageError } = useStorage(data);

	const [mediaMetadata, setMediaMetadata] = useState({});
	// console.log(`mediaMetadata`, mediaMetadata);

	const { user } = useAuthContext();

	const { mediaData, setMediaData } = useContext(MediaContext);

	const { userLocation } = useGeoLocation();

	const uploadMedia = e => {
		// Check id data is ready for upload.
		// console.log(`uploading voice`, e)
		if (!mediaMetadata.createdAtLocation.lat) {
			toast.error(`Cannot upload without user Gps coordinates.`, {
				position: "top-right",
			});
			return null;
		}
		setIsPending(true);
		uploadFile(audioBlob, data.irepsKeyItem, data.id, mediaMetadata, "audio");
	};

	useEffect(() => {
		// console.log(`url`, url);
		if (Boolean(url) || storageError) {
			setIsPending(false);
			// hide MediaActionVoice window
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
			setAudio(null);
			// setBase64URL(null);
		};
	}, [url, storageError, mediaData, setMediaData]);

	const discard = e => {
		console.log(`discard`);
		setAudio(null);
		setAudioBlob(null);
		setAudioChunks(null);
	};

	const closeMediaAction = e => {
		setMediaData({
			...mediaData,
			activeMediaAction: null,
		});
	};

	const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setPermission(true);
				setStream(streamData);
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
		//create new Media recorder instance using the stream
		const media = new MediaRecorder(stream, { type: "mime/mp4" });
		//set the MediaRecorder instance to the mediaRecorder ref
		mediaRecorder.current = media;
		//invokes the start method to start the recording process
		mediaRecorder.current.start();
		let localAudioChunks = [];
		mediaRecorder.current.ondataavailable = event => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};
		setAudioChunks(localAudioChunks);
	};

	const stopRecording = () => {
		// console.log(`stop audio recording`);
		setRecordingStatus("inactive");
		//stops the recording instance
		mediaRecorder.current.stop();
		mediaRecorder.current.onstop = () => {
			// console.log(`stop audio recording  callback - audioChunks :`, audioChunks);
			//creates a blob file from the audiochunks data
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			//creates a playable URL from the blob file.
			const audioUrl = URL.createObjectURL(audioBlob);
			setAudio(audioUrl);
			setAudioBlob(audioBlob);
			// setAudioChunks([]);
			setMediaMetadata({
				erfId: data.id,
				erfNo: data.erfNo,
				// contentType: file?.type,
				// TODO: revisit - mediaType should not be hardcoded
				mediaType: mimeType,
				// TODO: revisit - mediaCategory should not be hardcoded
				mediaCategory: "erfAudio", // eg meter no photo, meter serail no photo , etc
				createdByUser: user.displayName,
				createdByUserId: user.uid,
				createdAtDatetime: format(new Date(), constants.dateFormat2),
				createdAtLocation: {
					lat: userLocation?.coordinates?.lat,
					lng: userLocation?.coordinates?.lng,
				},
			});
		};
	};

	return (
		<div className="media-action-voice">
			<div className="recording-status">
				{audio && recordingStatus !== "recording" && (
					// display audio player
					<div className="audio-player">
						<audio src={audio} controls></audio>
					</div>
				)}
				{recordingStatus === "recording" && (
					<>
						<ScaleLoader
							color={"#F86F03"}
							loading={isPending < 100}
							size={20}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
						<ScaleLoader
							color={"#F86F03"}
							loading={isPending < 100}
							size={20}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</>
				)}
			</div>

			<div className="mac mac-control-bar">
				<div className="maccb maccb-left">
					{/* Btn to get permission to record audio */}
					{!permission && (
						<MediaActionBtn
							id={""}
							actionClassname={""}
							title={"Get PERMISSION to record voice"}
							clickHanderFunction={getMicrophonePermission}
							actionIcon={irepsIcons.ICON_PERMISSION}
							color={"blue"}
						/>
					)}
					{/* Btn to discard recorded audio */}
					{audio && (
						<MediaActionBtn
							id={""}
							actionClassname={""}
							title={"DISCARD recorded voice"}
							clickHanderFunction={discard}
							actionIcon={irepsIcons.ICON_DELETE}
							color={"blue"}
						/>
					)}
					{/* Btn to start voice recording */}
					{!audio && permission && (
						<MediaActionBtn
							id={""}
							actionClassname={""}
							title={"START vocie recording"}
							clickHanderFunction={startRecording}
							actionIcon={irepsIcons.ICON_START_RECORDING}
							color={"blue"}
						/>
					)}
					{/* Btn to stop voice recording */}
					{recordingStatus === "recording" && (
						<MediaActionBtn
							id={""}
							actionClassname={""}
							title={"STOP voice recording"}
							clickHanderFunction={stopRecording}
							actionIcon={irepsIcons.ICON_STOP}
							color={"blue"}
						/>
					)}
				</div>

				<div className="maccb maccb-right">
					{audio && (
						<button
							disabled={!Boolean(audio)}
							// title={title}
							className="mab"
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

export default MediaActionVoice;
