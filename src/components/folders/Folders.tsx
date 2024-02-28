import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import Loader from "../common/Loader";

import FolderForm from "./FolderForm";

import { useFoldersByUser } from "../../hooks/mutations/folders/useFoldersByUserId";
import { useNewFolder } from "../../hooks/mutations/folders/useNewFolder";

import { EModal } from "../../interfaces/common";
import { IFolder, IFolderFormValues } from "../../interfaces/folders";

const Folders: FC = () => {
	const { data: foldersByUser, isFetching: isFetchingFoldersByUser } = useFoldersByUser();
	const { mutate: createNewFolder, data: newFolder, isPending: isPendingNewFolder } = useNewFolder();

	const [folders, setFolders] = useState<IFolder[]>([]);
	const [modal, setModal] = useState<EModal | null>(null);

	useEffect(() => {
		if (!foldersByUser?.data) return;

		setFolders(foldersByUser.data);
	}, [foldersByUser]);

	useEffect(() => {
		if (!newFolder?.data) return;

		setFolders((prev) => [...prev, newFolder.data]);
		onModalClose();
	}, [newFolder]);

	const onModalNew = () => setModal(EModal.New);

	const onModalClose = () => setModal(null);

	const createFolder = (formValues: IFolderFormValues) => {
		createNewFolder({ ...formValues });
	};

	const hasFolders = folders.length > 0 && !isFetchingFoldersByUser;

	return (
		<FoldersStyled>
			<FoldersList>
				{isFetchingFoldersByUser && <Loader />}

				{hasFolders &&
					folders.map((folder) => (
						<FoldersItem key={folder.id}>
							<Button type="button" onClick={onModalNew}>
								<Icon width="50" height="50">
									<use xlinkHref="/icons/sprite.svg#folder" />
								</Icon>
							</Button>
							<p>{folder.name}</p>
						</FoldersItem>
					))}

				<Button type="button" onClick={onModalNew}>
					<Icon width="50" height="50">
						<use xlinkHref="/icons/sprite.svg#folder-plus" />
					</Icon>
				</Button>
			</FoldersList>

			{modal === EModal.New && (
				<Modal onModalClose={onModalClose}>
					<FolderForm
						isLoading={isPendingNewFolder}
						onSaveClick={createFolder}
						onCancelClick={onModalClose}
					/>
				</Modal>
			)}
		</FoldersStyled>
	);
};

export default Folders;

const FoldersStyled = styled.div`
	width: 100%;
`;

const FoldersList = styled.ul`
	display: flex;
	align-items: flex-start;
	gap: 10px;
	flex-wrap: wrap;
`;

const FoldersItem = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 16px;
`;

const Button = styled.button`
	width: 50px;
	height: 50px;
`;

const Icon = styled.svg`
	fill: #d1c847;
`;
