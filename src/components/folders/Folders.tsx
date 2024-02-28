import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import Modal from "../common/Modal";
import Loader from "../common/Loader";

import FolderForm from "./FolderForm";

import { useFoldersByParent } from "../../hooks/mutations/folders/useGetFoldersByParent";
import { useNewFolder } from "../../hooks/mutations/folders/useNewFolder";

import { EModal } from "../../interfaces/common";
import { IFolder, IFolderFormValues } from "../../interfaces/folders";

const Folders: FC = () => {
	const [folders, setFolders] = useState<IFolder[]>([]);
	const [parentFolders, setParentFolders] = useState<IFolder[]>([]);
	const [modal, setModal] = useState<EModal | null>(null);

	const parentId = useMemo(() => {
		if (parentFolders.length > 0) {
			return parentFolders[parentFolders.length - 1].id;
		}

		return 0;
	}, [parentFolders]);

	const { data: foldersByParent, isFetching } = useFoldersByParent(parentId);
	const { mutate: createNewFolder, data: newFolder, isPending: isPendingNewFolder } = useNewFolder();

	useEffect(() => {
		if (!foldersByParent?.data) return;

		setFolders(foldersByParent.data);
	}, [foldersByParent]);

	useEffect(() => {
		if (!newFolder?.data) return;

		setFolders((prev) => [...prev, newFolder.data]);
		onModalClose();
	}, [newFolder]);

	const onOpenModalNew = () => setModal(EModal.New);
	const onModalClose = () => setModal(null);

	const createFolder = (formValues: IFolderFormValues) => {
		createNewFolder({ ...formValues, parentId: parentId || undefined });
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
			<SubTitle>Navigation:</SubTitle>
			<NavList>
				<NavItem>
					<CrumbBtn type="button" onClick={() => onCrumbsClick()}>
						Main Folder
					</CrumbBtn>
				</NavItem>

				{hasParentsFolders &&
					parentFolders.map((folder) => (
						<NavItem key={folder.id}>
							<SignMore>{">"}</SignMore>
							<CrumbBtn type="button" onClick={() => onCrumbsClick(folder)}>
								{folder.name}
							</CrumbBtn>
						</NavItem>
					))}
			</NavList>

			<button type="button">
				<Title>Folders</Title>
			</button>

			<FoldersList>
				{isFetching && <Loader />}

				{hasFolders &&
					folders.map((folder) => (
						<FoldersItem key={folder.id}>
							<Button type="button" onClick={() => onFolderClick(folder)}>
								<Icon width="50" height="50">
									<use xlinkHref="/icons/sprite.svg#folder" />
								</Icon>
							</Button>
							<p>{folder.name}</p>
						</FoldersItem>
					))}

				{!isFetching && (
					<Button type="button" onClick={onOpenModalNew}>
						<Icon width="50" height="50">
							<use xlinkHref="/icons/sprite.svg#folder-plus" />
						</Icon>
					</Button>
				)}
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

const SubTitle = styled.p`
	font-weight: 700;
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

const Button = styled.button`
	width: 50px;
	height: 50px;
`;

const Icon = styled.svg`
	fill: #d1c847;
`;

const NavList = styled.ul`
	display: flex;
	align-items: center;
	gap: 5px;
	flex-wrap: wrap;
	margin-bottom: 20px;
`;

const NavItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
`;

const CrumbBtn = styled.button`
	font-size: 18px;
`;

const SignMore = styled.span`
	margin-right: 5px;
`;
