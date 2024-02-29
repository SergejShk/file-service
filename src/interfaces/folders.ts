export interface INewFolderBody {
	name: string;
	isPublick: boolean;
	editorsIds?: string[];
	parentId?: number;
}

export interface IFolder {
	id: number;
	name: string;
	isPublick: boolean;
	editorsIds: string[] | null;
	parentId: number | null;
	userId: number;
}

export interface IFolderFormValues {
	name: string;
	isPublick: boolean;
}

export interface IUpdateFolderBody {
	id: number;
	name: string;
	isPublick: boolean;
}
