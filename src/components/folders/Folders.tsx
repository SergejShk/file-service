import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import Loader from "../common/Loader";
import FolderForm from "../common/forms/FolderForm";
import PermissionForm from "../common/forms/PermissionForm";

import Navigation from "./Navigation";

import { useAuthContext } from "../../context/AuthContext";

import { useFoldersByParent } from "../../hooks/mutations/folders/useGetFoldersByParent";
import { useNewFolder } from "../../hooks/mutations/folders/useNewFolder";
import { useUpdateFolder } from "../../hooks/mutations/folders/useUpdateFolder";

import { EModal } from "../../interfaces/common";
import { IFolder, IFolderFormValues } from "../../interfaces/folders";

const Folders: FC = () => {
	const { auth } = useAuthContext();

	const [folders, setFolders] = useState<IFolder[]>([]);
	const [parentFolders, setParentFolders] = useState<IFolder[]>([]);
	const [modal, setModal] = useState<EModal | null>(null);
	const [selectedFolder, setSelectedFolder] = useState<IFolder | undefined>(undefined);

	const parentId = useMemo(() => {
		if (parentFolders.length > 0) {
			return parentFolders[parentFolders.length - 1].id;
		}

		return 0;
	}, [parentFolders]);

	const { data: foldersByParent, isFetching } = useFoldersByParent(parentId);
	const { mutate: createNewFolder, data: newFolder, isPending: isPendingNewFolder } = useNewFolder();
	const { mutate: updateFolder, data: updatedFolder, isPending: isPendingUpdateFolder } = useUpdateFolder();

	useEffect(() => {
		if (!foldersByParent?.data) return;

		setFolders(foldersByParent.data);
	}, [foldersByParent]);

	useEffect(() => {
		if (!newFolder?.data) return;

		setFolders((prev) => [...prev, newFolder.data]);
		onModalClose();
	}, [newFolder]);

	useEffect(() => {
		if (!updatedFolder?.data) return;

		setFolders((prev) =>
			prev.map((folder) => {
				if (folder.id === updatedFolder.data.id) {
					return updatedFolder.data;
				}

				return folder;
			})
		);
		onModalClose();
	}, [updatedFolder]);

	const onModalClose = () => setModal(null);

	const onActionBtnClick = (action: EModal, folder?: IFolder) => {
		switch (action) {
			case EModal.New:
				return setModal(EModal.New);

			case EModal.Edit:
				setModal(EModal.Edit);
				setSelectedFolder(folder);
				return;

			case EModal.Permission:
				setModal(EModal.Permission);
				setSelectedFolder(folder);
				break;
		}
	};

	const handleSaveFolderForm = (formValues: IFolderFormValues) => {
		switch (modal) {
			case EModal.New:
				return createNewFolder({ ...formValues, parentId: parentId || undefined });
			case EModal.Edit:
				if (!selectedFolder?.id) return;
				return updateFolder({ ...formValues, id: selectedFolder.id });

			default:
				return;
		}
	};

	const handleSavePermissionsForm = (editors: number[]) => {
		console.log(editors);
	};

	const onFolderClick = (folder: IFolder) => {
		setParentFolders((prev) => [...prev, folder]);
	};

	const onCrumbsClick = (folder?: IFolder) => {
		if (!folder) {
			return setParentFolders([]);
		}
		const folderId = folder.id;
		setParentFolders((prev) => {
			const index = prev.findIndex((f) => f.id === folderId);
			if (index === -1) {
				return prev;
			}

			return prev.slice(0, index + 1);
		});
	};

	const hasFolders = folders.length > 0 && !isFetching;
	const hasParentsFolders = parentFolders.length > 0 && !isFetching;

	return (
		<FoldersStyled>
			<Navigation
				hasParentsFolders={hasParentsFolders}
				parentFolders={parentFolders}
				onCrumbsClick={onCrumbsClick}
			/>

			<button type="button">
				<Title>Folders</Title>
			</button>

			<FoldersList>
				{isFetching && <Loader />}

				{hasFolders &&
					folders.map((folder) => (
						<FoldersItem key={folder.id}>
							<SettingsBtnWrapper>
								{auth.id === folder.userId && folder.isPublick && (
									<button type="button" onClick={() => onActionBtnClick(EModal.Permission, folder)}>
										<svg width="15" height="15">
											<use xlinkHref="/icons/sprite.svg#key" />
										</svg>
									</button>
								)}
								<button type="button" onClick={() => onActionBtnClick(EModal.Edit, folder)}>
									<svg width="20" height="20">
										<use xlinkHref="/icons/sprite.svg#pencil" />
									</svg>
								</button>
							</SettingsBtnWrapper>

							<Button type="button" onClick={() => onFolderClick(folder)}>
								<Icon width="50" height="50">
									<use xlinkHref="/icons/sprite.svg#folder" />
								</Icon>
							</Button>
							<p>{folder.name}</p>
						</FoldersItem>
					))}

				{!isFetching && (
					<FoldersItem>
						<SettingsBtnWrapper />
						<Button type="button" onClick={() => onActionBtnClick(EModal.New)}>
							<Icon width="50" height="50">
								<use xlinkHref="/icons/sprite.svg#folder-plus" />
							</Icon>
						</Button>
					</FoldersItem>
				)}
			</FoldersList>

			{modal === EModal.New && (
				<Modal onModalClose={onModalClose}>
					<FolderForm
						isOwner={true}
						isLoading={isPendingNewFolder}
						onSaveClick={handleSaveFolderForm}
						onCancelClick={onModalClose}
					/>
				</Modal>
			)}

			{modal === EModal.Edit && !!selectedFolder && (
				<Modal onModalClose={onModalClose}>
					<FolderForm
						initialFolder={selectedFolder}
						isOwner={auth.id === selectedFolder.userId}
						isLoading={isPendingUpdateFolder}
						onSaveClick={handleSaveFolderForm}
						onCancelClick={onModalClose}
					/>
				</Modal>
			)}

			{modal === EModal.Permission && !!selectedFolder && (
				<Modal onModalClose={onModalClose}>
					<PermissionForm
						ownerId={auth.id}
						entityName={selectedFolder.name}
						isLoading={false}
						onSaveClick={handleSavePermissionsForm}
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
	min-height: 74px;
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

const SettingsBtnWrapper = styled.div`
	min-height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	margin-bottom: -5px;
`;

const Button = styled.button`
	width: 50px;
	height: 50px;
`;

const Icon = styled.svg`
	fill: #d1c847;
`;
