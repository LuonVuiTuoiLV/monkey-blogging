import { useState } from 'react';
import { IconEyeClose, IconEyeOpen } from '../icon';
import Input from './Input';

const InputPasswordToggle = ({ control }) => {
	const [togglePassword, setTogglePassword] = useState(false);
	if (!control) return null;
	return (
		<>
			<Input
				type={togglePassword ? 'text' : 'password'}
				name="password"
				placeholder="Please enter your password"
				control={control}
			>
				{!togglePassword ? (
					<IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
				) : (
					<IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
				)}
			</Input>
		</>
	);
};

export default InputPasswordToggle;
