import Heading from '@/components/layout/Heading';
import styled from 'styled-components';
import PostItem from '../post/PostItem';
import PostNewestItem from '../post/PostNewsItem';
import PostNewestLarge from '../post/PostNewsLarge';
const HomeNewestStyles = styled.div`
	.layout {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-gap: 40px;
		margin-bottom: 40px;
		align-items: start;
	}
	.sidebar {
		padding: 28px 20px;
		background-color: #f3edff;
		border-radius: 16px;
	}
	@media screen and (max-width: 1023.98px) {
		.layout {
			grid-template-columns: 100%;
		}
		.sidebar {
			padding: 14px 10px;
		}
	}
`;
const HomeNewest = () => {
	return (
		<HomeNewestStyles className="home-block">
			<div className="container">
				<Heading>Mới nhất</Heading>
				<div className="layout">
					<PostNewestLarge></PostNewestLarge>
					<div className="sidebar">
						<PostNewestItem></PostNewestItem>
						<PostNewestItem></PostNewestItem>
						<PostNewestItem></PostNewestItem>
					</div>
				</div>
				<div className="grid-layout grid-layout--primary">
					<PostItem></PostItem>
					<PostItem></PostItem>
					<PostItem></PostItem>
					<PostItem></PostItem>
				</div>
			</div>
		</HomeNewestStyles>
	);
};
export default HomeNewest;
