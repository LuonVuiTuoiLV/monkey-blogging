import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { Input } from '@/components/input';
import InputPasswordToggle from '@/components/input/InputPasswordToggle';
import { Label } from '@/components/label';
import { auth, db } from '@/firebase/firebase-config';
import { userRole, userStatus } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import * as yup from 'yup';
import AuthenticationPage from './AuthenticationPage';

const schema = yup.object({
	fullname: yup.string().required('Please enter your fullname'),
	email: yup
		.string()
		.email('Please enter your email address')
		.required('Please enter your email address'),
	password: yup
		.string()
		.min(8, 'Your password must be at least 8 characters or greater')
		.required('Please enter your password'),
});

const SignUpPage = () => {
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		watch,
		reset,
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	const handleSignUp = async (values) => {
		if (!isValid) return;
		await createUserWithEmailAndPassword(auth, values.email, values.password);
		await updateProfile(auth.currentUser, {
			displayName: values.fullname,
			photoURL:
				'https://instagram.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/362656597_18267600523155095_109746791294946418_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDk1NC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fsgn2-6.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2AFiImZ2gsoQ073y7rOOoKWfoOywGrFIK-whrdlRk5gkosULVl7rfU3hW4H14RRIWUk&_nc_ohc=YQT6yIsISgQQ7kNvgHM7krD&_nc_gid=9aacc3f2b09946aebbc4fa96ce65b853&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzE1ODk5MDkzNTg2MDQ4ODU5OA%3D%3D.3-ccb7-5&oh=00_AYAnWtaqsbBhId8VW4H15RGWuR1qaUAuBhU2bilEK_F9aA&oe=677EB9BA&_nc_sid=7a9f4b',
		});

		await setDoc(doc(db, 'users', auth.currentUser.uid), {
			fullname: values.fullname,
			email: values.email,
			password: values.password,
			username: slugify(values.fullname, { lower: true }),
			avatar:
				'https://instagram.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/362656597_18267600523155095_109746791294946418_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDk1NC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fsgn2-6.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2AFiImZ2gsoQ073y7rOOoKWfoOywGrFIK-whrdlRk5gkosULVl7rfU3hW4H14RRIWUk&_nc_ohc=YQT6yIsISgQQ7kNvgHM7krD&_nc_gid=9aacc3f2b09946aebbc4fa96ce65b853&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzE1ODk5MDkzNTg2MDQ4ODU5OA%3D%3D.3-ccb7-5&oh=00_AYAnWtaqsbBhId8VW4H15RGWuR1qaUAuBhU2bilEK_F9aA&oe=677EB9BA&_nc_sid=7a9f4b',
			status: userStatus.ACTIVE,
			role: userRole.USER,
			createdAt: serverTimestamp(),
		});

		toast.success('Register successfully!!!');
		navigate('/');
	};

	useEffect(() => {
		const arrErrors = Object.values(errors);
		if (arrErrors.length > 0) {
			toast.error(arrErrors[0]?.message, {
				pauseOnHover: false,
				delay: 0,
			});
		}
	}, [errors]);

	useEffect(() => {
		document.title = 'Register Page';
	});
	return (
		<AuthenticationPage>
			<form
				className="form"
				onSubmit={handleSubmit(handleSignUp)}
				autoComplete="off"
			>
				<Field>
					<Label htmlFor="fullname" className="label">
						Fullname
					</Label>
					<Input
						name="fullname"
						type="text"
						placeholder="Please enter your fullname"
						control={control}
					/>
				</Field>
				<Field>
					<Label htmlFor="email" className="label">
						Email address
					</Label>
					<Input
						name="email"
						type="email"
						placeholder="Please enter your email address"
						control={control}
					/>
				</Field>
				<Field>
					<Label htmlFor="password" className="label">
						Password
					</Label>
					<InputPasswordToggle control={control}></InputPasswordToggle>
				</Field>
				<div className="have-account">
					You already have an account? <NavLink to={'/sign-in'}>Login</NavLink>
				</div>
				<Button
					type="submit"
					kind="primary"
					disabled={isSubmitting}
					isLoading={isSubmitting}
					className="max-w-[300px] w-full mx-auto"
				>
					Sign Up
				</Button>
			</form>
		</AuthenticationPage>
	);
};

export default SignUpPage;
