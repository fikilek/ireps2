import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const intiValue = {
	modalName: "",
	payload: {},
};

const ModalContextProvider = props => {
	const [toOpen, setToOpen] = useState(intiValue);
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<ModalContext.Provider
			value={{ toOpen, setToOpen, modalOpened, setModalOpened }}
		>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalContextProvider;
