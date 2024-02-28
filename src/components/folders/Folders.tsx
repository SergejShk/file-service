import { FC, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";

import FolderForm from "./FolderForm";

import { EModal } from "../../interfaces/common";
import { IFolderFormValues } from "../../interfaces/folders";

const Folders: FC = () => {
	const [modal, setModal] = useState<EModal | null>(null);

	const onModalNew = () => setModal(EModal.New);

	const onModalClose = () => setModal(null);

	const createFolder = (formValues: IFolderFormValues) => {
		console.log(formValues);
	};

	return (
		<div>
			<Button type="button" onClick={onModalNew}>
				<Icon width="50" height="50">
					<use xlinkHref="/icons/sprite.svg#folder-plus" />
				</Icon>
			</Button>

			{modal === EModal.New && (
				<Modal onModalClose={onModalClose}>
					<FolderForm isLoading={false} onSaveClick={createFolder} onCancelClick={onModalClose} />
				</Modal>
			)}
		</div>
	);
};

export default Folders;

const Button = styled.button`
	width: 50px;
	height: 50px;
`;

const Icon = styled.svg`
	fill: #d1c847;
`;
