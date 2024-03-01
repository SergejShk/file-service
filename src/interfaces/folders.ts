export interface INewFolderBody {
	name: string;
	isPublick: boolean;
	editorsIds?: number[];
	parentId?: number;
}

export interface IFolder {
	id: number;
	name: string;
	isPublick: boolean;
	editorsIds: number[] | null;
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

export interface IUpdateFolderEditorsBody {
	id: number;
	editorsIds: number[];
}
