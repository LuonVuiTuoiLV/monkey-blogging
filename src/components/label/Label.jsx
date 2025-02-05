import styled from 'styled-components';

const LabelStyles = styled.label`
	color: ${(props) => props.theme.gray4b};
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
`;

const Label = ({ htmlFor = '', children, ...props }) => {
	return (
		<LabelStyles htmlFor={htmlFor} {...props}>
			{children}
		</LabelStyles>
	);
};

export default Label;
