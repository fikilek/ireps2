import React, { createContext, useState } from "react";
// Create context:
export const AnomalyContext = createContext();

const initSettings = {
	anomalyDetail: {
		meterFaulty: [
			{ key: "choose", value: "choose" },
			{ key: "Not Accepting SGC Tokens", value: "Not Accepting SGC Tokens" },
			{ key: "Meter Display Blank", value: "Meter Display Blank" },
			{ key: "Negative Credit Units", value: "Negative Credit Units" },
			{
				key: "Zero Readings Conventional Meter",
				value: "Zero Readings Conventional Meter",
			},
			{ key: "Meter Wheel Not Moving", value: "Meter Wheel Not Moving" },
			{
				key: "Meter Wheel Running In Reverse Mode",
				value: "Meter Wheel Running In Reverse Mode",
			},
			"",
		],
		meterOk: [
			{ key: "choose", value: "choose" },
			{ key: "Operationally Ok", value: "Operationally Ok" },
			{ key: "Meter Not On Portal", value: "Meter Not On Portal" },
			{ key: "No TID KC Tokens on Portal", value: "No TID KC Tokens on Portal" },
			{ key: "No SGC Tokens Avaiabl", value: "No SGC Tokens Avaiabl" },
		],
		meterDamaged: [
			{ key: "choose", value: "choose" },
			{ key: "Meter Number Unclear", value: "Meter Number Unclear" },
			{ key: "Meter Burnt", value: "Meter Burnt" },
			{ key: "Buttons Not Working", value: "Buttons Not Working" },
			{ key: "Meter Broken", value: "Meter Broken" },
		],
		meterIllegalyConnected: [
			{ key: "choose", value: "choose" },
			{
				key: "Staight Connection (Meter Bypassed)",
				value: "Staight Connection (Meter Bypassed)",
			},
			{ key: "Bridge Wire on Meter", value: "Bridge Wire on Meter" },
		],
		meterMissing: [
			{ key: "choose", value: "choose" },
			{
				key: "Property Has Power (Illegal Conection)",
				value: "Property Has Power (Illegal Conection)",
			},
			{ key: "No Power Supply To Property", value: "No Power Supply To Property" },
		],
	},
	anomaly: "",
};

export const AnomalyContextProvider = props => {
	const [anomalyContext, setAnomalyContext] = useState(initSettings);
	// console.log(`anomalyContext`, anomalyContext);
	return (
		<AnomalyContext.Provider value={{ anomalyContext, setAnomalyContext }}>
			{props.children}
		</AnomalyContext.Provider>
	);
};
