import { useEffect, useReducer, useRef } from "react";

const initUserGps = {
	loaded: false,
	coordinates: {},
	error: null,
};

const userGpsReducer = (state, action) => {
	switch (action.type) {
		case "SUCCESS":
			return {
				...state,
				loaded: action.payload?.loaded,
				coordinates: action.payload?.coordinates,
				error: "",
			};
		case "ERROR":
			return {
				...state,
				loaded: false,
				coordinates: null,
				error: action.payload.error,
			};
		default:
			return state;
	}
};

const options = {
	enableHighAccuracy: true,
	timeout: 1000,
	maximumAge: 0,
};

const useGeoLocation = () => {
	const [userLocation, dispatch] = useReducer(userGpsReducer, initUserGps);
	console.log(`userLocation`, userLocation);

	const onSuccess = userPositionGps => {
		dispatch({
			type: "SUCCESS",
			payload: {
				loaded: true,
				coordinates: {
					lat: userPositionGps.coords?.latitude,
					lng: userPositionGps.coords?.longitude,
				},
			},
		});
	};

	const onError = error => {
		dispatch({
			type: "ERROR",
			payload: {
				loaded: false,
				error: {
					code: error.code,
					message: error.message,
				},
			},
		});
	};

	
	useEffect(() => {
		if (!("geolocation" in navigator)) {
			onError({
				code: 0,
				message: "Geolocation not supported",
			});
		}
		const watchId = navigator.geolocation.watchPosition(
			onSuccess,
			onError,
			options
		);
		return () => navigator.geolocation.clearWatch(watchId);
	});

	return { userLocation };
};

export default useGeoLocation;
