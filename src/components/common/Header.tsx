import { FC } from "react";
import styled from "styled-components";

import { Container } from "./Container";

import { useLogOut } from "../../hooks/mutations/auth/useLogout";

const Header: FC = () => {
	const { mutate, isPending } = useLogOut();

	const handleLogOutClick = () => {
		mutate();
	};

	return (
		<HeaderStyled>
			<Container>
				<Logo>
					<svg width="30" height="30">
						<use xlinkHref="/icons/sprite.svg#file" />
					</svg>
					<p>File System</p>
				</Logo>
				<LogOutBtn type="button" onClick={handleLogOutClick} disabled={isPending}>
					Log out
				</LogOutBtn>
			</Container>
		</HeaderStyled>
	);
};

export default Header;

const HeaderStyled = styled.header`
	background-color: #4c758b;
	color: #fff;
	font-size: 18px;
	font-weight: 500;
	padding: 20px 0;
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const LogOutBtn = styled.button`
	cursor: pointer;
	font-size: 18px;
	font-weight: 500;
	color: #fff;
	border-style: none;
	background-color: transparent;
	margin-left: auto;

	&:disabled {
		cursor: auto;
	}
`;
