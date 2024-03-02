import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { deleteFileApi } from "../../../services/files/deleteFile";

import { ApiError, ApiResult } from "../../../interfaces/api";
import { IDeleteFileBody } from "../../../interfaces/files";

export const useDeleteFile = () => {
	return useMutation<ApiResult<boolean>, AxiosError<ApiError>, IDeleteFileBody>({
		mutationFn: async (body) => {
			const data = await deleteFileApi(body);

			return data;
		},
	});
};
