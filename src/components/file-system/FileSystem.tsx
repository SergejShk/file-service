import { FC } from "react";
import styled from "styled-components";

import { Container } from "../common/Container";

import Folders from "../folders/Folders";
import Files from "./Files";

const FileSystem: FC = () => {
	return (
		<Container>
			<FileSystemStyled>
				<Folders />

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
