import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import Input from "../Input";
import Checkbox from "../Checkbox";
import { Button } from "../Button";

import { useFiles } from "../../../hooks/useFiles";

import { IFilesFormValues } from "../../../interfaces/files";

interface IProps {
	initialFile?: IFilesFormValues;
	isOwner: boolean;
	isLoading: boolean;
	onSaveClick: (formValues: IFilesFormValues) => void;
	onCancelClick: () => void;
}

const FilesForm: FC<IProps> = ({ initialFile, isOwner, isLoading, onSaveClick, onCancelClick }) => {
	const { uploadedFile, uploadErrors, isUploadLoading, handleFileUpload, setUploadErrors, handleOnDrop } =
		useFiles();
	const { getRootProps, getInputProps } = useDropzone({ onDrop: handleOnDrop, noClick: true });

	const inputRef = useRef(null);

	const {
		register,
		setValue,
		setError,
		clearErrors,
		handleSubmit,
		formState: { errors },
	} = useForm<IFilesFormValues>({
		defaultValues: {
			name: initialFile?.name || "",
			key: initialFile?.key || "",
			isPublick: initialFile?.isPublick || false,
		},
	});

	useEffect(() => {
		if (!uploadErrors) return;

		setError("name", {
			type: "custom",
			message: uploadErrors,
		});
	}, [setError, uploadErrors]);

	useEffect(() => {
		if (!uploadedFile) return;

		setValue("name", uploadedFile.name);
		setValue("key", uploadedFile.key);
	}, [setValue, uploadedFile]);

	const handleChooseBtnClick = () => {
		if (!inputRef.current) return;

		(inputRef.current as HTMLElement).click();
	};

	const resetErrors = () => {
		clearErrors("name");
		setUploadErrors("");
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];

		if (!file) return;

		await handleFileUpload(file);
		resetErrors();
	};

	const isLoad = isUploadLoading || isLoading;

	return (
		<>
			<DropzoneUploaderStyled {...(!isLoad && !initialFile ? getRootProps() : {})}>
				<FilesFormStyled onSubmit={handleSubmit(onSaveClick)}>
					{isOwner && (
						<LabelIsPublick>
							<Checkbox name="isPublick" register={register} />
							<span>Is Publick</span>
						</LabelIsPublick>
					)}

					<FileInputWrapper>
						<Input
							type="text"
							name="name"
							register={register}
							rules={{ required: { value: true, message: "Required" } }}
							error={errors.name}
						/>
						{!initialFile && (
							<Button type="button" disabled={isLoading} onClick={handleChooseBtnClick} $minHeight="43px">
								Choose
							</Button>
						)}
					</FileInputWrapper>

					<DropzonePlaceholder>Drop files to upload</DropzonePlaceholder>

					{!isLoading && !initialFile && <input {...getInputProps()} />}
					{!isLoading && !initialFile && (
						<input className="hidden" ref={inputRef} type="file" onChange={handleFileChange} />
					)}

					<ButtonWrapper>
						<Button disabled={isLoading}>Save</Button>
						<Button type="button" disabled={isLoading} onClick={onCancelClick}>
							Cancel
						</Button>
					</ButtonWrapper>
				</FilesFormStyled>
			</DropzoneUploaderStyled>
		</>
	);
};

export default FilesForm;

const FilesFormStyled = styled.form`
	padding: 20px;
`;

const LabelIsPublick = styled.label`
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 18px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 15px;
`;

const DropzoneUploaderStyled = styled.div`
	width: 100%;
	height: 100%;
`;

const DropzonePlaceholder = styled.p`
	color: #ccc;
	pointer-events: none;
	text-align: center;
	margin-bottom: 20px;
`;

const FileInputWrapper = styled.div`
	width: 70%;
	display: flex;
	align-items: center;
	gap: 5px;
	margin: 10px 0 10px;
`;
