import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import FilesForm from "../common/forms/FilesForm";

import { useNewFile } from "../../hooks/mutations/files/useNewFile";

import { EModal } from "../../interfaces/common";
import { IFileApi, IFilesFormValues } from "../../interfaces/files";

interface IProps {
	folderId: number;
}

const Files: FC<IProps> = ({ folderId }) => {
	const [files, setFiles] = useState<IFileApi[]>([]);
	const [modal, setModal] = useState<EModal | null>(null);
	const { mutate: createNewFile, data: newFile, isPending: isPendingNewFile } = useNewFile();
	console.log("files", files);
	useEffect(() => {
		if (!newFile?.data) return;

		setFiles((prev) => [...prev, newFile.data]);
		onModalClose();
	}, [newFile]);

	const onActionBtnClick = (action: EModal) => {
		switch (action) {
			case EModal.New:
				return setModal(EModal.New);
		}
	};

	const onModalClose = () => setModal(null);

	const handleSaveFilesForm = (formValues: IFilesFormValues) => {
		switch (modal) {
			case EModal.New:
				return createNewFile({ ...formValues, folderId });

			default:
				return;
		}
	};

	return (
		<FilesStyled>
			<Title>Files</Title>

			<FilesList>
				<FilesItem>
					<SettingsBtnWrapper />
					<Button type="button" onClick={() => onActionBtnClick(EModal.New)}>
						<Icon width="60" height="60">
							<use xlinkHref="/icons/sprite.svg#file-plus" />
						</Icon>
					</Button>
				</FilesItem>
			</FilesList>

			{modal === EModal.New && (
				<Modal onModalClose={onModalClose}>
					<FilesForm
						isOwner={true}
						isLoading={isPendingNewFile}
						onSaveClick={handleSaveFilesForm}
						onCancelClick={onModalClose}
					/>
				</Modal>
			)}
		</FilesStyled>
	);
};

export default Files;

const FilesStyled = styled.div`
	width: 100%;
`;

const Title = styled.h2`
	color: #4c758b;
	margin-top: 10px;
`;

const FilesList = styled.ul`
	min-height: 74px;
	display: flex;
	align-items: flex-start;
	gap: 10px;
	flex-wrap: wrap;
`;

const FilesItem = styled.li`
	width: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 16px;
`;

const SettingsBtnWrapper = styled.div`
	min-height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	margin-bottom: -5px;
`;

const Button = styled.button`
	width: 100%;
	height: 100%;
`;

const Icon = styled.svg`
	fill: #ccc;
`;
