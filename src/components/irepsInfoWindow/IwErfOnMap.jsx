import MapIrepsMap from "../maps/MapIrepsMap";
import MapMarkerOnMap from "../maps/MapMarkerOnMap";
import IrepsInfoWindow from "./IrepsInfoWindow";
import "./IwErfOnMap.css";

const IwErfOnMap = props => {
  console.log(`props`, props)
  const { address, erfNo } = props?.data;
  const gpsPoint = {
    lat: address.gps.latitude,
    lng: address.gps.longitude
  }
	return (
    <IrepsInfoWindow fhl1={"Erf On Map"} fhl2={<span>Erf No: <span className="data-emphasis">{erfNo}</span></span>}>
      <MapIrepsMap >
        <MapMarkerOnMap gpsPoint={gpsPoint} label={erfNo} />
      </MapIrepsMap>
		</IrepsInfoWindow>
	);
};

export default IwErfOnMap;
