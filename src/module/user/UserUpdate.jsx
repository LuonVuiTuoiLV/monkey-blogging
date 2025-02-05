import { Button } from '@/components/button';
import { Radio } from '@/components/checkbox';
import { Field, FieldCheckboxes } from '@/components/field';
import ImageUpload from '@/components/image/ImageUpload';
import { Input } from '@/components/input';
import InputPasswordToggle from '@/components/input/InputPasswordToggle';
import { Label } from '@/components/label';
import { Textarea } from '@/components/textarea';
import { db } from '@/firebase/firebase-config';
import useFirebaseImage from '@/hooks/useFirebaseImage';
import { userRole, userStatus } from '@/utils/constants';
import DashboardHeading from '@module/dashboard/DashboardHeading';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserUpdate = () => {
	const {
		control,
		handleSubmit,
		watch,
		reset,
		setValue,
		getValues,
		formState: { isValid, isSubmitting },
	} = useForm({
		mode: 'onChange',
	});
	const [params] = useSearchParams();
	const userId = params.get('id');

	const watchStatus = watch('status');
	const watchRole = watch('role');
	const imageUrl = getValues('avatar');
	const imageRegex = /@2F(\S+)\?/gm.exec(imageUrl);
	const imageName = imageRegex?.length > 0 ? imageRegex[1] : '';

	const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
		useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

	const handleUpdateUser = async (values) => {
		if (!isValid) return;
		try {
			const colRef = doc(db, 'users', userId);
			await updateDoc(colRef, {
				...values,
				avatar: image,
			});
			toast.success('Update user information successfully');
		} catch (error) {
			toast.error('Update user failed!');
		}
	};

	async function deleteAvatar() {
		const colRef = doc(db, 'users', userId);
		await updateDoc(colRef, {
			avatar: '',
		});
	}

	useEffect(() => {
		setImage(imageUrl);
	}, [imageUrl, setImage]);

	useEffect(() => {
		async function fetchData() {
			if (!userId) return;
			const colRef = doc(db, 'users', userId);
			const docData = await getDoc(colRef);
			reset(docData && docData.data());
		}
		fetchData();
	}, [userId, reset]);

	if (!userId) return null;
	return (
		<div>
			<DashboardHeading
				title="Update user"
				desc="Update user information"
			></DashboardHeading>
			<form onSubmit={handleSubmit(handleUpdateUser)}>
				<div className="w-[200px] h-[200px] mx-auto mb-10 rounded-full">
					<ImageUpload
						className="!rounded-full h-full"
						onChange={handleSelectImage}
						handleDeleteImage={handleDeleteImage}
						progress={progress}
						image={image}
					></ImageUpload>
				</div>
				<div className="form-layout">
					<Field>
						<Label>Fullname</Label>
						<Input
							name="fullname"
							placeholder="Enter your fullname"
							control={control}
						></Input>
					</Field>
					<Field>
						<Label>Username</Label>
						<Input
							name="username"
							placeholder="Enter your username"
							control={control}
						></Input>
					</Field>
				</div>
				<div className="form-layout">
					<Field>
						<Label>Email</Label>
						<Input
							name="email"
							placeholder="Enter your email"
							control={control}
							type="email"
						></Input>
					</Field>
					<Field>
						<Label htmlFor="password" className="label">
							Password
						</Label>
						<InputPasswordToggle control={control}></InputPasswordToggle>
					</Field>
				</div>
				<div className="form-layout">
					<Field>
						<Label>Status</Label>
						<FieldCheckboxes>
							<Radio
								name="status"
								control={control}
								checked={Number(watchStatus) === userStatus.ACTIVE}
								value={userStatus.ACTIVE}
							>
								Active
							</Radio>
							<Radio
								name="status"
								control={control}
								checked={Number(watchStatus) === userStatus.PENDING}
								value={userStatus.PENDING}
							>
								Pending
							</Radio>
							<Radio
								name="status"
								control={control}
								checked={Number(watchStatus) === userStatus.BAN}
								value={userStatus.BAN}
							>
								Banned
							</Radio>
						</FieldCheckboxes>
					</Field>
					<Field>
						<Label>Role</Label>
						<FieldCheckboxes>
							<Radio
								name="role"
								control={control}
								checked={Number(watchRole) === userRole.ADMIN}
								value={userRole.MOD}
							>
								Admin
							</Radio>
							<Radio
								name="role"
								control={control}
								checked={Number(watchRole) === userRole.MOD}
								value={userRole.MOD}
							>
								Moderator
							</Radio>
							<Radio
								name="role"
								control={control}
								checked={Number(watchRole) === userRole.USER}
								value={userRole.USER}
							>
								User
							</Radio>
						</FieldCheckboxes>
					</Field>
				</div>
				<div className="form-layout">
					<Field>
						<Label>Description</Label>
						<Textarea name="description" control={control}></Textarea>
					</Field>
				</div>
				<Button
					type="submit"
					kind="primary"
					className="mx-auto w-[200px]"
					isLoading={isSubmitting}
					disabled={isSubmitting}
				>
					Update
				</Button>
			</form>
		</div>
	);
};

export default UserUpdate;
