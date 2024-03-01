import { FC, useState } from "react";
import styled from "styled-components";

import { Container } from "../common/Container";

import Navigation from "./Navigation";

import Folders from "../folders/Folders";
import Files from "../files/Files";

import { IFolder } from "../../interfaces/folders";

const FileSystem: FC = () => {
	const [parentFolders, setParentFolders] = useState<IFolder[]>([]);

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

				<Folders parentFolders={parentFolders} setParentFolders={setParentFolders} />

				<Files />
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
