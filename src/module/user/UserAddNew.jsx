import { Button } from '@/components/button';
import { Radio } from '@/components/checkbox';
import { Field, FieldCheckboxes } from '@/components/field';
import ImageUpload from '@/components/image/ImageUpload';
import { Input } from '@/components/input';
import InputPasswordToggle from '@/components/input/InputPasswordToggle';
import { Label } from '@/components/label';
import { useAuth } from '@/contexts/auth-context';
import { auth, db } from '@/firebase/firebase-config';
import useFirebaseImage from '@/hooks/useFirebaseImage';
import DashboardHeading from '@/module/dashboard/DashboardHeading';
import { userRole, userStatus } from '@/utils/constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import slugify from 'slugify';

const UserAddNew = () => {
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		watch,
		formState: { isValid, isSubmitting },
		reset,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			fullname: '',
			email: '',
			password: '',
			username: '',
			avatar: '',
			status: userStatus.ACTIVE,
			role: userRole.USER,
			createdAt: new Date(),
		},
	});
	const {
		image,
		handleResetUpload,
		progress,
		handleSelectImage,
		handleDeleteImage,
	} = useFirebaseImage(setValue, getValues);
	const { userInfo } = useAuth();
	const handleCreateUser = async (values) => {
		if (!isValid) return;
		try {
			await createUserWithEmailAndPassword(auth, values.email, values.password);
			await addDoc(collection(db, 'users'), {
				fullname: values.fullname,
				email: values.email,
				password: values.password,
				username: slugify(values.username || values.fullname, {
					lower: true,
					replacement: ' ',
					trim: true,
				}),
				avatar: image,
				status: Number(values.status),
				role: Number(values.role),
				createdAt: serverTimestamp(),
			});
			toast.success(`Create new user with email: ${values.email} successfully`);
			reset({
				fullname: '',
				email: '',
				password: '',
				username: '',
				avatar: '',
				status: userStatus.ACTIVE,
				role: userRole.USER,
				createdAt: new Date(),
			});
			handleResetUpload();
		} catch (error) {
			toast.error('Can not create new user');
		}
	};
	const watchStatus = watch('status');
	const watchRole = watch('role');
	return (
		<div>
			<DashboardHeading
				title="New user"
				desc="Add new user to system"
			></DashboardHeading>
			<form onSubmit={handleSubmit(handleCreateUser)}>
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
				<Button
					type="submit"
					kind="primary"
					className="mx-auto w-[200px]"
					isLoading={isSubmitting}
					disabled={isSubmitting}
				>
					Add new user
				</Button>
			</form>
		</div>
	);
};

export default UserAddNew;
