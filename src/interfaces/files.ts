export interface IFile {
	name: string;
	key: string;
}

export interface IFilesFormValues extends IFile {
	isPublick: boolean;
}

export interface ICreatePresignedPostBody {
	key: string;
	type: string;
}

export interface IPresignedFields {
	key: string;
	acl: string;
	bucket: string;
	"X-Amz-Algorithm": string;
	"X-Amz-Credential": string;
	"X-Amz-Date": string;
	Policy: string;
	"X-Amz-Signature": string;
}

export interface ICreatePresignedPostRes {
	url: string;
	fields: IPresignedFields;
}
