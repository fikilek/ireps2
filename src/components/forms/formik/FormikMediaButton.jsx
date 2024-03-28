import { Field } from "formik";
import "./FormikMediaButton.css";
import React, { useContext, useEffect } from "react";
// import useModal from "../../../modals/useModal";
import { MediaContext } from "../../../contexts/MediaContext";
import { getAstCatMediaCat, irepsDictionary } from "../../../utils/utils";

const FormikMediaButton = props => {
	// console.log(`props`, props);
	const { label, name, ml1, ...rest } = props;

	const { photoAppData, setPhotoAppData } = useContext(MediaContext);

	useEffect(() => {
		return () => {
			// console.log(`RESETING photoAppData context`);
			setPhotoAppData({
				data: "",
				isPhotoAppOpened: false,
				ml1: "",
			});
		};
	}, []);

	const handleClick = (e, btnProps) => {
		e.preventDefault();
		// console.log(`e.target`, e.target);
		// console.log(`btnProps`, btnProps);

		// console.log(`photoApData`, photoAppData);

		setPhotoAppData({
			...photoAppData,
			data: { ...btnProps },
			isPhotoAppOpened: true,
			ml1,
		});
	};
	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{btnProps => {
					// console.log(`btnProps`, btnProps);
					const { field, meta, form } = btnProps;
					const mediaObj = getAstCatMediaCat(field?.name);
					// console.log(`mediaObj`, mediaObj);
					const astCat = irepsDictionary.get(mediaObj?.astCat);
					const mediaCat = irepsDictionary.get(mediaObj?.mediaCatName);
					// console.log(`astCat`, astCat);
					// console.log(`mediaCat`, mediaCat);
					// console.log(`ml1`, ml1);

					let mediaString = ``;
					if (ml1 === "asts") {
						mediaString = `${astCat} ${mediaCat}`;
					}
					if (ml1 === "erfs") {
						mediaString = `Erf`;
					}

					return (
						<button className="media-cat-btn" onClick={e => handleClick(e, btnProps)}>
							<p className="media-cat-name">{label}</p>
						</button>
					);
				}}
			</Field>
		</div>
	);
};

export default FormikMediaButton;
