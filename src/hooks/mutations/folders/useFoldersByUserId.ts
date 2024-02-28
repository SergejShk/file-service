import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { getFoldersByUserIdApi } from "../../../services/folders/getFoldersByUserId";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IFolder } from "../../../interfaces/folders";

export const useFoldersByUser = () => {
	return useQuery<ApiResult<IFolder[]>, AxiosError<ApiError>>({
		queryKey: [],
		queryFn: async () => await getFoldersByUserIdApi(),
	});
};
