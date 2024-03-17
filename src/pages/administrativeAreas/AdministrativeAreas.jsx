import "./AdministrativeAreas.css";
import PageHeader from "../PageHeader";
import TreeAdministrativeArea from "../../components/trees/TreeAdministrativeAreas";
import PageBody from "../PageBody";
import { flattenTree } from "react-accessible-treeview";
import MapAdministrativeAreas from "../../components/maps/MapAdminstrativeAreas";

export const tree = {
	name: "",
	children: [
		{
			name: "South Africa",
			gpsCenter: {},
			children: [
				{
					name: "GP",
					gpsCenter: {},
					children: [
						{
							name: "Sedibeng",
							gpsCenter: {},
							children: [
								{
									name: "Lesedi",
									gpsCenter: {},
									children: [
										{
											name: "Lesedi Wards",
											children: [
												{
													name: "Lesedi W1",
												},
												{
													name: "Lesedi W2",
												},
												{
													name: "Lesedi W3",
												},
												{
													name: "Lesedi W4",
												},
												{
													name: "Lesedi W5",
												},
												{
													name: "Lesedi W6",
												},
												{
													name: "Lesedi W7",
												},
												{
													name: "Lesedi W8",
												},
												{
													name: "Lesedi W9",
												},
												{
													name: "Lesedi W10",
												},
												{
													name: "Lesedi W11",
												},
												{
													name: "Lesedi W12",
												},
												{
													name: "Lesedi W13",
												},
											],
										},
										{
											name: "Suburbs/Tships",
											children: [
												{
													name: "Obed Nkosi",
													gpsCenter: {},
													children: [
														{
															name: "Obed Nkosi A",
															gpsCenter: { lat: -26.541960658447646, lng: 28.338629116440828 },
														},
														{
															name: "Obed Nkosi B",
															gpsCenter: { lat: -26.52888160075503, lng: 28.3352936276032 },
														},
														{
															name: "Obed Nkosi C",
															gpsCenter: { lat: -26.532998883501552, lng: 28.345134598723572 },
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							name: "West Rand",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Johhanesburg",
							children: [
								{
									name: "Sandton",
								},
								{
									name: "Midrand",
								},
							],
						},
						{
							name: "Ekurhuleni",
							gpsCenter: {},
							children: [
								{
									name: "Edenvale",
								},
								{
									name: "Germiston",
								},
							],
						},
						{
							name: "Tshwane",
							gpsCenter: {},
							children: [],
						},
					],
				},
				{
					name: "KZN",
					children: [
						{
							name: "Zululand",
							children: [
								{
									name: "eDumbe",
									children: [
										{
											name: "Paulpeteresburg",
										},
									],
								},
							],
						},
						{
							name: "Uthungulu",
							children: [
								{
									name: "Nkandla",
								},
							],
						},
						{
							name: "Ethekwini",
							gpsCenter: {},
							children: [],
						},
					],
				},
				{
					name: "MP",
					children: [
						{
							name: "Gert Sibande",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Nkangala",
							gpsCenter: {},
							children: [
								{
									name: "Victor Khanye",
									children: [
										{
											name: "Victor Khanye Wards",
											children: [
												{ name: "Victor Khanye W1" },
												{ name: "Victor Khanye W2" },
												{ name: "Victor Khanye W3" },
												{ name: "Victor Khanye W4" },
												{ name: "Victor Khanye W5" },
												{ name: "Victor Khanye W6" },
												{ name: "Victor Khanye W7" },
												{ name: "Victor Khanye W8" },
												{ name: "Victor Khanye W9" },
											],
										},
									],
								},
							],
						},
						{
							name: "Ehlanzeni",
							gpsCenter: {},
							children: [],
						},
						{
							name: "",
							gpsCenter: {},
							children: [],
						},
					],
				},
				{
					name: "LP",
					children: [
						{
							name: "Capricorn",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Vhembe",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Waterberg",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Sekhukhune",
							gpsCenter: {},
							children: [],
						},
					],
				},
				{
					name: "WC",
					children: [
						{
							name: "Cape Town",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Overberg",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Eden",
							gpsCenter: {},
							children: [],
						},
						{
							name: "West Coast",
							gpsCenter: {},
							children: [],
						},
					],
				},
				{
					name: "NC",
					children: [
						{
							name: "Frances Baard",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Z F Mgcawu",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Pixley ka Seme",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Namakwa",
							gpsCenter: {},
							children: [],
						},
					],
				},
				{
					name: "NW",
					children: [
						{
							name: "Bojanala",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Ngaka Modiri Molema",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Dr Kenneth Kaunda",
							gpsCenter: {},
							children: [],
						},
						{
							name: "",
							gpsCenter: {},
							children: [],
						},
					],
				},
				{
					name: "FS",
					children: [
						{
							name: "Thabo Mofutsanyane",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Lejweleputswa",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Mangaung",
							gpsCenter: {},
							children: [],
						},
						{
							name: "",
							gpsCenter: {},
							children: [],
						},
					],
				},
				{
					name: "EC",
					children: [
						{
							name: "OR Tambo",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Chris Hani",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Bufallo City",
							gpsCenter: {},
							children: [],
						},
						{
							name: "Nelson Mandela",
							gpsCenter: {},
							children: [],
						},
					],
				},
			],
		},
		{
			name: "China",
			children: [{ name: "Gonzou" }],
		},
		{
			name: "Russia",
			children: [{ name: "St Petersburg" }],
		},
	],
};

const AdministrativeAreas = () => {
	const flattenedTree = flattenTree(tree);
	console.log(`flattenedTree`, flattenedTree);

	return (
		<div className="administrative-areas">
			<PageHeader phLl="Administrative Areas"></PageHeader>
			<PageBody>
				<TreeAdministrativeArea tree={flattenedTree} />
				<MapAdministrativeAreas tree={flattenedTree} />
			</PageBody>
		</div>
	);
};

export default AdministrativeAreas;
