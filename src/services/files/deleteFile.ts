import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IDeleteFileBody } from "../../interfaces/files";

export const deleteFileApi = async (body: IDeleteFileBody): Promise<ApiResult<boolean>> => {
	const { data } = await apiInstance.put<Promise<ApiResult<boolean>>>(`files/delete`, body);

	return data;
};
