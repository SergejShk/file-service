export interface INewFolderBody {
	name: string;
	isPublick: boolean;
	editorsIds?: string[];
	parentId?: number;
}

export interface IFolderFormValues {
	name: string;
	isPublick: boolean;
}
