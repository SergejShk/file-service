import { FC, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import FilesForm from "../common/forms/FilesForm";

import { EModal } from "../../interfaces/common";
import { IFilesFormValues } from "../../interfaces/files";

const Files: FC = () => {
	const [modal, setModal] = useState<EModal | null>(null);

	const onActionBtnClick = (action: EModal) => {
		switch (action) {
			case EModal.New:
				return setModal(EModal.New);
		}
	};

	const onModalClose = () => setModal(null);

	const handleSaveFilesForm = (formValues: IFilesFormValues) => {
		console.log(formValues);
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
						isLoading={false}
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
