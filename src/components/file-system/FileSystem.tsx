import { FC } from "react";
import styled from "styled-components";

import { useLogOut } from "../../hooks/mutations/auth/useLogout";

const FileSystem: FC = () => {
	const { mutate: logOut, isPending: isPendingLogOut } = useLogOut();

	const handleLogOutClick = () => {
		logOut();
	};

	return (
		<div>
			<p>My file system</p>
			<LogOutBtn type="button" onClick={handleLogOutClick} disabled={isPendingLogOut}>
				Log out
			</LogOutBtn>
		</div>
	);
};

export default FileSystem;

const LogOutBtn = styled.button`
	cursor: pointer;
	font-size: 18px;
	font-weight: 500;
	border-style: none;
	background-color: transparent;
	text-decoration: underline;
	margin-bottom: 4px;

	&:disabled {
		cursor: auto;
	}
`;
