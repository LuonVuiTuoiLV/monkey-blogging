import styled from 'styled-components';

const HeadingStyles = styled.h2`
	font-size: 28px;
	position: relative;
	margin-bottom: 30px;
	font-weight: 600;
	&:before {
		content: '';
		width: 50px;
		height: 4px;
		background-color: ${(props) => props.theme.accent};
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(0, -350%);
	}
	@media screen and (max-width: 1023.98px) {
		font-size: 22px;
		margin-bottom: 20px;
	}
`;
const Heading = ({ className = '', children }) => {
	return <HeadingStyles className={className}>{children}</HeadingStyles>;
};
export default Heading;
