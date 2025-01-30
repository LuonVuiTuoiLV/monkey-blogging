import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { Input } from '@/components/input';
import InputPasswordToggle from '@/components/input/InputPasswordToggle';
import { Label } from '@/components/label';
import { useAuth } from '@/contexts/auth-context';
import { auth } from '@/firebase/firebase-config';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AuthenticationPage from './AuthenticationPage';

const schema = yup.object({
	email: yup
		.string()
		.email('Please enter your email address')
		.required('Please enter your email address'),
	password: yup
		.string()
		.min(8, 'Your password must be at least 8 characters or greater')
		.required('Please enter your password'),
});

const SignInPage = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isValid, errors },
	} = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

	const { userInfo } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		document.title = 'Login Page';
		if (userInfo?.email) navigate('/');
		// else navigate('/');
	}, [userInfo]);

	useEffect(() => {
		const arrErrors = Object.values(errors);
		if (arrErrors.length > 0) {
			toast.error(arrErrors[0]?.message, {
				pauseOnHover: false,
				delay: 0,
			});
		}
	}, [errors]);

	const handleSignIn = async (values) => {
		if (!isValid) return;
		await signInWithEmailAndPassword(auth, values.email, values.password);
		navigate('/');
	};

	return (
		<AuthenticationPage>
			<form
				className="form"
				onSubmit={handleSubmit(handleSignIn)}
				autoComplete="off"
			>
				<Field>
					<Label htmlFor="email">Email address</Label>
					<Input
						type="email"
						name="email"
						placeholder="Please enter your email address"
						control={control}
					></Input>
				</Field>
				<Field>
					<Label htmlFor="password">Password</Label>
					<InputPasswordToggle control={control}></InputPasswordToggle>
				</Field>
				<div className="have-account">
					You have not had an account?{' '}
					<NavLink to={'/sign-up'}>Register an account</NavLink>
				</div>
				<Button
					type="submit"
					kind="primary"
					disabled={isSubmitting}
					isLoading={isSubmitting}
					className="max-w-[300px] w-full mx-auto"
				>
					Sign In
				</Button>
			</form>
		</AuthenticationPage>
	);
};

export default SignInPage;
