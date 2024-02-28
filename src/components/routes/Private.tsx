import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

interface IProps {
	component: React.ComponentType;
}

const Private: FC<IProps> = ({ component: Component }) => {
	const { auth } = useAuthContext();

	return auth.email ? <Component /> : <Navigate to="/" />;
};

export default Private;
