import { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Checkbox from "../common/Checkbox";
import Input from "../common/Input";
import { Button } from "../common/Button";

import { IFolderFormValues } from "../../interfaces/folders";

interface IProps {
	initialFolder?: IFolderFormValues;
	isLoading: boolean;
	onSaveClick: (values: IFolderFormValues) => void;
	onCancelClick: () => void;
}

const FolderForm: FC<IProps> = ({ initialFolder, isLoading, onSaveClick, onCancelClick }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFolderFormValues>({
		defaultValues: {
			name: initialFolder?.name || "",
			isPublick: initialFolder?.isPublick || false,
		},
	});

	return (
		<FormStyled onSubmit={handleSubmit(onSaveClick)}>
			<LabelIsPublick>
				<Checkbox name="isPublick" register={register} />
				<span>Is Publick</span>
			</LabelIsPublick>

			<Input
				type="text"
				name="name"
				label={<NameLabel>Name</NameLabel>}
				placeholder="Name"
				register={register}
				rules={{ required: { value: true, message: "Required" } }}
				error={errors.name}
			/>

			<ButtonWrapper>
				<Button disabled={isLoading}>Save</Button>
				<Button type="button" disabled={isLoading} onClick={onCancelClick}>
					Cancel
				</Button>
			</ButtonWrapper>
		</FormStyled>
	);
};

export default FolderForm;

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
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

const NameLabel = styled.span`
	font-size: 18px;
	margin-bottom: -5px;
`;
