import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

const useModal = () => {
	const { toOpen, setToOpen, setModalOpened } = useContext(ModalContext);

	const openModal = ({ modalName, payload }) => {
		setToOpen({
			...toOpen,
			modalName, // name of the modal to open. see <Modal />
			payload, // data to be passed as props to the component to be opened
		});
		setModalOpened(true);
	};

	const closeModal = () => {
		setToOpen({
			modalName: "", // name of the modal to open. see <Modal />
			payload: "", // data to be passed as props to the component to be opened
		});
		setModalOpened(false);
	};

	return { openModal, closeModal };
};

export default useModal;
