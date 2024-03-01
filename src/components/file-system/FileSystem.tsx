import { FC, useMemo, useState } from "react";
import styled from "styled-components";

import { Container } from "../common/Container";

import Navigation from "./Navigation";

import Folders from "../folders/Folders";
import Files from "../files/Files";

import { IFolder } from "../../interfaces/folders";

const FileSystem: FC = () => {
	const [parentFolders, setParentFolders] = useState<IFolder[]>([]);

	const currentFolderId = useMemo(() => {
		if (parentFolders.length > 0) {
			return parentFolders[parentFolders.length - 1].id;
		}

		return 0;
	}, [parentFolders]);

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

	return (
		<Container>
			<FileSystemStyled>
				<Navigation
					hasParentsFolders={parentFolders.length > 0}
					parentFolders={parentFolders}
					onCrumbsClick={onCrumbsClick}
				/>

				<Folders parentId={currentFolderId} setParentFolders={setParentFolders} />

				<Files folderId={currentFolderId} />
			</FileSystemStyled>
		</Container>
	);
};

export default FileSystem;

const FileSystemStyled = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
