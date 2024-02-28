import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import Loader from "../common/Loader";

import FolderForm from "./FolderForm";

// import { useFoldersByUser } from "../../hooks/mutations/folders/useFoldersByUserId";
import { useFoldersByParent } from "../../hooks/mutations/folders/useGetFoldersByParent";
import { useNewFolder } from "../../hooks/mutations/folders/useNewFolder";

import { EModal } from "../../interfaces/common";
import { IFolder, IFolderFormValues } from "../../interfaces/folders";

const Folders: FC = () => {
	const [folders, setFolders] = useState<IFolder[]>([]);
	const [parentFodersIds, setParentFoldersIds] = useState<number[]>([]);
	const [modal, setModal] = useState<EModal | null>(null);

	const parentId = useMemo(() => {
		if (parentFodersIds.length > 0) {
			return parentFodersIds[parentFodersIds.length - 1];
		}

		return 0;
	}, [parentFodersIds]);

	// const {
	// 	data: foldersByUser,
	// 	isFetching: isFetchingFoldersByUser,
	// 	refetch: refetchByUser,
	// } = useFoldersByUser();
	const { data: foldersByParent, isFetching: isFetchingFoldersByParent } = useFoldersByParent(parentId);
	const { mutate: createNewFolder, data: newFolder, isPending: isPendingNewFolder } = useNewFolder();

	// useEffect(() => {
	// 	if (!foldersByUser?.data) return;

	// 	setFolders(foldersByUser.data);
	// }, [foldersByUser]);

	// useEffect(() => {
	// 	if (parentFodersIds.length > 0) return;

	// 	refetchByUser();
	// }, [parentFodersIds, refetchByUser]);

	useEffect(() => {
		if (!foldersByParent?.data) return;

		setFolders(foldersByParent.data);
	}, [foldersByParent]);

	useEffect(() => {
		if (!newFolder?.data) return;

		setFolders((prev) => [...prev, newFolder.data]);
		onModalClose();
	}, [newFolder]);

	const onModalNew = () => setModal(EModal.New);
	const onModalClose = () => setModal(null);

	const createFolder = (formValues: IFolderFormValues) => {
		createNewFolder({ ...formValues, parentId: parentId || undefined });
	};

	const onFolderClick = (folderId: number) => {
		setParentFoldersIds((prev) => [...prev, folderId]);
	};

	const isFetchingFolders =
		// isFetchingFoldersByUser &&
		isFetchingFoldersByParent;
	const hasFolders = folders.length > 0 && !isFetchingFolders;

	return (
		<FoldersStyled>
			<button type="button">
				<Title>Folders</Title>
			</button>

			<FoldersList>
				{isFetchingFolders && <Loader />}

				{hasFolders &&
					folders.map((folder) => (
						<FoldersItem key={folder.id}>
							<Button type="button" onClick={() => onFolderClick(folder.id)}>
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
	padding: 20px 0;
`;

const Title = styled.h2`
	color: #4c758b;
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
