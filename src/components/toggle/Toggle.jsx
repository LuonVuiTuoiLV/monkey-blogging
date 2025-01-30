import PropTypes from 'prop-types';

const Toggle = (props) => {
	const { on, onClick, ...rest } = props;
	return (
		<label>
			<input
				type="checkbox"
				className="hidden-input"
				onChange={() => {}}
				onClick={onClick}
				checked={on}
			/>
			<div
				className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
					on ? 'bg-green-500' : 'bg-gray-300'
				}`}
				{...rest}
			>
				<span
					className={`transition-all w-[34px] bg-white h-[34px] rounded-full inline-block ${
						on ? 'translate-x-[28px]' : ''
					}`}
				></span>
			</div>
		</label>
	);
};

Toggle.propTypes = {
	on: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Toggle;
