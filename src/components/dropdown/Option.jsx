import { useDropdown } from './dropdown-context';

const Option = (props) => {
	const { onClick } = props;
	const { setShow } = useDropdown();
	const handleClick = () => {
		onClick && onClick();
		setShow(false);
	};
	return (
		<div
			className="flex items-center justify-between p-5 transition-all cursor-pointer hover:text-primary"
			onClick={handleClick}
		>
			{props.children}
		</div>
	);
};
export default Option;
