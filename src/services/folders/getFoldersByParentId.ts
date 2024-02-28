import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../interfaces/api";
import { IFolder } from "../../interfaces/folders";

export const getFoldersByParentIdApi = async (parentId: number): Promise<ApiResult<IFolder[]>> => {
	const { data } = await apiInstance.get<Promise<ApiResult<IFolder[]>>>(`folders/list-by-parent/${parentId}`);

	return data;
};
