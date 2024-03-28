// country
import za from "../maps/za/za.geojson";

// Provinces
import za_gp from "../maps/za/za_gp.geojson";
import za_nw from "../maps/za/za_nw.geojson";
import za_mp from "../maps/za/za_mp.geojson";
import za_ec from "../maps/za/za_ec.geojson";
import za_lp from "../maps/za/za_lp.geojson";
import za_wc from "../maps/za/za_wc.geojson";
import za_nc from "../maps/za/za_nc.geojson";
import za_kzn from "../maps/za/za_kzn.geojson";
import za_fs from "../maps/za/za_fs.geojson";

// district municipalities
import za_gp_sedibeng from "../maps/za/za_gp_sedibeng.geojson";
import za_mp_gert_sibande from "../maps/za/za_mp_gert_sibande.geojson";
import za_mp_nkangala from "../maps/za/za_mp_nkangala.geojson";
import za_kzn_zululand from "../maps/za/za_kzn_zululand.geojson";

// Metros
import za_fs_mangaung from "../maps/za/za_fs_mangaung.geojson";
import za_ec_nelson_mandela from "../maps/za/za_ec_nelson_mandela.geojson";
import za_ec_bufallo_city from "../maps/za/za_ec_bufallo_city.geojson";
import za_kzn_ethekwini from "../maps/za/za_kzn_ethekwini.geojson";
import za_gp_ekurhuleni from "../maps/za/za_gp_ekurhuleni.geojson";
import za_gp_jhb from "../maps/za/za_gp_jhb.geojson";
import za_gp_tshwane from "../maps/za/za_gp_tshwane.geojson";
import za_wc_cape_town from "../maps/za/za_wc_cape_town.geojson";

// local municipalities
import za_mp_nkangala_vk from "../maps/za/za_mp_nkangala_vk.geojson";
import za_gp_sedibeng_lesedi from "../maps/za/za_gp_sedibeng_lesedi.geojson";
import za_kzn_zululand_edumbe from "../maps/za/za_kzn_zululand_edumbe.geojson";
import za_kzn_uthungulu_nkandla from "../maps/za/za_kzn_uthungulu_nkandla.geojson";

// Wards
// za_gp_sedidbeng_lesedi
import za_gp_sedidbeng_lesedi_w1 from "../maps/za/za_gp_sedibeng_lesedi_w1.geojson";
import za_gp_sedidbeng_lesedi_w1_cadastral from "../maps/za/gp/sedibeng/lesedi/w1/za_gp_sedibeng_lesedi_w1_cadastral.geojson";

import za_gp_sedidbeng_lesedi_w2 from "../maps/za/za_gp_sedibeng_lesedi_w2.geojson";

import za_gp_sedidbeng_lesedi_w3 from "../maps/za/za_gp_sedibeng_lesedi_w3.geojson";

import za_gp_sedidbeng_lesedi_w4 from "../maps/za/za_gp_sedibeng_lesedi_w4.geojson";

import za_gp_sedidbeng_lesedi_w5 from "../maps/za/za_gp_sedibeng_lesedi_w5.geojson";
import za_gp_sedidbeng_lesedi_w6 from "../maps/za/za_gp_sedibeng_lesedi_w6.geojson";
import za_gp_sedidbeng_lesedi_w7 from "../maps/za/za_gp_sedibeng_lesedi_w7.geojson";
import za_gp_sedidbeng_lesedi_w8 from "../maps/za/za_gp_sedibeng_lesedi_w8.geojson";
import za_gp_sedidbeng_lesedi_w9 from "../maps/za/za_gp_sedibeng_lesedi_w9.geojson";
import za_gp_sedidbeng_lesedi_w10 from "../maps/za/za_gp_sedibeng_lesedi_w10.geojson";
import za_gp_sedidbeng_lesedi_w11 from "../maps/za/za_gp_sedibeng_lesedi_w11.geojson";
import za_gp_sedidbeng_lesedi_w12 from "../maps/za/za_gp_sedibeng_lesedi_w12.geojson";
import za_gp_sedidbeng_lesedi_w13 from "../maps/za/za_gp_sedibeng_lesedi_w13.geojson";

// za_mp_nkangala_vk;
import za_mp_nkangala_vk_w1 from "../maps/za/za_mp_nkangala_vk_w1.geojson";
import za_mp_nkangala_vk_w1_cadastral from "../maps/za/mp/nkangala/vk/w1/za_mp_nkangala_vk_w1_cadastral.geojson";
import za_mp_nkangala_vk_w2 from "../maps/za/za_mp_nkangala_vk_w2.geojson";
import za_mp_nkangala_vk_w3 from "../maps/za/za_mp_nkangala_vk_w3.geojson";
import za_mp_nkangala_vk_w4 from "../maps/za/za_mp_nkangala_vk_w4.geojson";
import za_mp_nkangala_vk_w5 from "../maps/za/za_mp_nkangala_vk_w5.geojson";
import za_mp_nkangala_vk_w6 from "../maps/za/za_mp_nkangala_vk_w6.geojson";
import za_mp_nkangala_vk_w7 from "../maps/za/za_mp_nkangala_vk_w7.geojson";
import za_mp_nkangala_vk_w8 from "../maps/za/za_mp_nkangala_vk_w8.geojson";
import za_mp_nkangala_vk_w9 from "../maps/za/za_mp_nkangala_vk_w9.geojson";

// import za_gp_sed_lsd_obn_A from "../maps/za/za_gp_sed_lsd_obn_A.geojson";
// import za_gp_sed_lsd_obn_B from "../maps/za/za_gp_sed_lsd_obn_B.geojson";
// import za_gp_sed_lsd_obn_C from "../maps/za/za_gp_sed_lsd_obn_C.geojson";
// import { useEffect, useState } from "react";

const useIrepsMap = () => {
	// console.log(`data.features[0]`, data?.features[0]?.geometry?.coordinates);

	const showBoundaries = (name, isSelected, map, maps) => {
		if (!name) return;

		switch (name) {
			// Country
			case "South Africa":
				// map?.data?.loadGeoJson(za);
				displayMap(map, za, isSelected);
				break;

			// Province
			case "GP":
				displayMap(map, za_gp, isSelected);
				break;
			case "NW":
				displayMap(map, za_nw, isSelected);
				break;
			case "MP":
				displayMap(map, za_mp, isSelected);
				break;
			case "EC":
				displayMap(map, za_ec, isSelected);
				break;
			case "WC":
				displayMap(map, za_wc, isSelected);
				break;
			case "NC":
				displayMap(map, za_nc, isSelected);
				break;
			case "LP":
				displayMap(map, za_lp, isSelected);
				break;
			case "KZN":
				displayMap(map, za_kzn, isSelected);
				break;
			case "FS":
				displayMap(map, za_fs, isSelected);
				break;

			// District Municipalities
			case "Zululand":
				displayMap(map, za_kzn_zululand, isSelected);
				break;
			case "Gert Sibande":
				displayMap(map, za_mp_gert_sibande, isSelected);
				break;
			case "Nkangala":
				displayMap(map, za_mp_nkangala, isSelected);
				break;
			case "Sedibeng":
				displayMap(map, za_gp_sedibeng, isSelected);
				break;

			// Metros
			case "Cape Town":
				displayMap(map, za_wc_cape_town, isSelected);
				break;
			case "Ethekwini":
				displayMap(map, za_kzn_ethekwini, isSelected);
				break;
			case "Tshwane":
				displayMap(map, za_gp_tshwane, isSelected);
				break;
			case "Johhanesburg":
				displayMap(map, za_gp_jhb, isSelected);
				break;
			case "Ekurhuleni":
				displayMap(map, za_gp_ekurhuleni, isSelected);
				break;
			case "Mangaung":
				displayMap(map, za_fs_mangaung, isSelected);
				break;
			case "Bufallo City":
				displayMap(map, za_ec_bufallo_city, isSelected);
				break;
			case "Nelson Mandela":
				displayMap(map, za_ec_nelson_mandela, isSelected);
				break;

			// Local Municipalities

			// Mpumalanga - Nkangala
			case "Victor Khanye":
				displayMap(map, za_mp_nkangala_vk, isSelected);
				// displayMap(map, za_mp_nkangala_vk_w1, isSelected);
				// displayMap(map, za_mp_nkangala_vk_w2, isSelected);
				// displayMap(map, za_mp_nkangala_vk_w3, isSelected);

				break;
			// Gauteng - Sedibeng - Lesedi
			case "Lesedi":
				displayMap(map, za_gp_sedibeng_lesedi, isSelected);
				break;
			// KZN - Zululand - eDumbe
			case "eDumbe":
				displayMap(map, za_kzn_zululand_edumbe, isSelected);
				break;
			// KZN - Uthungulu - Nkandla
			case "Nkandla":
				displayMap(map, za_kzn_uthungulu_nkandla, isSelected);
				break;

			// Wards

			// Gauteng - Sedibeng - Lesedi
			case "Lesedi Wards":
				isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi);

				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w1);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w2);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w3);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w4);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w5);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w6);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w7);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w8);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w9);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w10);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w11);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w12);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedibeng_lesedi_w13);

				break;

			case "Lesedi W1":
				// console.log(`Lesedi W1`, za_gp_sedidbeng_lesedi_w1);
				displayMap(
					map,
					za_gp_sedidbeng_lesedi_w1,
					isSelected,
					za_gp_sedidbeng_lesedi_w1_cadastral
				);
				break;

			case "Lesedi W2":
				displayMap(map, za_gp_sedidbeng_lesedi_w2, isSelected);

				// isSelected && map?.data?.loadGeoJson(za_gp_sedidbeng_lesedi_w2);

				// map.setCenter({ lat: -26.55582, lng: 28.315242 });
				// map.setZoom(15.5);
				break;
			case "Lesedi W3":
				displayMap(map, za_gp_sedidbeng_lesedi_w3, isSelected);
				// isSelected && map?.data?.loadGeoJson(za_gp_sedidbeng_lesedi_w3);
				break;
			case "Lesedi W4":
				displayMap(map, za_gp_sedidbeng_lesedi_w4, isSelected);
				break;
			case "Lesedi W5":
				displayMap(map, za_gp_sedidbeng_lesedi_w5, isSelected);
				break;
			case "Lesedi W6":
				displayMap(map, za_gp_sedidbeng_lesedi_w6, isSelected);
				break;
			case "Lesedi W7":
				displayMap(map, za_gp_sedidbeng_lesedi_w7, isSelected);
				break;
			case "Lesedi W8":
				displayMap(map, za_gp_sedidbeng_lesedi_w8, isSelected);
				break;
			case "Lesedi W9":
				displayMap(map, za_gp_sedidbeng_lesedi_w9, isSelected);
				break;
			case "Lesedi W10":
				displayMap(map, za_gp_sedidbeng_lesedi_w10, isSelected);
				break;
			case "Lesedi W11":
				displayMap(map, za_gp_sedidbeng_lesedi_w11, isSelected);
				break;
			case "Lesedi W12":
				displayMap(map, za_gp_sedidbeng_lesedi_w12, isSelected);
				break;
			case "Lesedi W13":
				displayMap(map, za_gp_sedidbeng_lesedi_w13, isSelected);
				break;

			// Mpumalanga - Nkangala - Victor Khanye

			case "Victor Khanye Wards":
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w1);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w2);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w3);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w4);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w5);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w6);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w7);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w8);
				isSelected && map?.data?.loadGeoJson(za_mp_nkangala_vk_w9);

				const drawBrondary = async () => {
					const jsonData = await fetch(za_mp_nkangala_vk);
					const data = await jsonData.json();
					let myBounds = new window.google.maps.LatLngBounds();
					data.features[0].geometry.coordinates[0][0].forEach(latLng => {
						myBounds.extend({ lat: latLng[1], lng: latLng[0] });
					});
					map.fitBounds(myBounds);
				};
				drawBrondary();
				break;

			case "Victor Khanye W1":
				displayMap(
					map,
					za_mp_nkangala_vk_w1,
					isSelected,
					za_mp_nkangala_vk_w1_cadastral
				);
				break;
			case "Victor Khanye W2":
				displayMap(map, za_mp_nkangala_vk_w2, isSelected);
				break;
			case "Victor Khanye W3":
				displayMap(map, za_mp_nkangala_vk_w3, isSelected);
				break;
			case "Victor Khanye W4":
				displayMap(map, za_mp_nkangala_vk_w4, isSelected);
				break;
			case "Victor Khanye W5":
				displayMap(map, za_mp_nkangala_vk_w5, isSelected);
				break;
			case "Victor Khanye W6":
				displayMap(map, za_mp_nkangala_vk_w6, isSelected);
				break;
			case "Victor Khanye W7":
				displayMap(map, za_mp_nkangala_vk_w7, isSelected);
				break;
			case "Victor Khanye W8":
				displayMap(map, za_mp_nkangala_vk_w8, isSelected);
				break;
			case "Victor Khanye W9":
				displayMap(map, za_mp_nkangala_vk_w9, isSelected);
				break;

			// Towns

			// Wards

			// Areaa

			default:
				break;
		}

		// if (name === "Obed Nkosi" && isSelected) {
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_A);
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_B);
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_C);
		// 	// console.log(`mapRef.data`, map.data);
		// 	return;
		// }

		// if (name === "Obed Nkosi A" && isSelected) {
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_A);
		// 	// console.log(`mapRef.data`, map.data);
		// 	const bounds = map.data?.map?.getBounds();
		// 	console.log(`bounds`, bounds);
		// }
		// if (name === "Obed Nkosi B" && isSelected) {
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_B);
		// 	// console.log(`mapRef.data`, map.data);
		// 	const bounds = map.data?.map?.getBounds();
		// 	console.log(`bounds`, bounds);
		// }
		// if (name === "Obed Nkosi C" && isSelected) {
		// 	map.data?.loadGeoJson(za_gp_sed_lsd_obn_C);
		// 	// console.log(`mapRef.data`, map.data);
		// 	const bounds = map.data?.map?.getBounds();
		// 	console.log(`bounds`, bounds);
		// }
	};

	const displayMap = async (map, boundaryFile, selected, cadastralFile) => {
		// console.log(`map`, map);

		selected && map?.data?.loadGeoJson(boundaryFile);
		const jsonData = await fetch(boundaryFile);
		const data = await jsonData.json();
		let myBounds = new window.google.maps.LatLngBounds();
		data.features[0].geometry.coordinates[0][0].forEach(latLng => {
			myBounds.extend({ lat: latLng[1], lng: latLng[0] });
		});
		map.fitBounds(myBounds);
		selected && map?.data?.loadGeoJson(cadastralFile);
		  map.data.setStyle({
					fillColor: "green",
					fillOpacity: 0.1,
				strokeWeight: 1,
					title: 'qqqqqq'
				});
	};

	return { showBoundaries };
};

export default useIrepsMap;
