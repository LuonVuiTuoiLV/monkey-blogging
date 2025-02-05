import slugify from 'slugify';
import styled from 'styled-components';
import PostCategory from './PostCategory';
import PostImage from './PostImage';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';
const PostItemStyles = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	.post {
		&-image {
			height: 202px;
			margin-bottom: 20px;
			display: block;
			width: 100%;
			border-radius: 16px;
		}
		&-category {
			margin-bottom: 10px;
		}
		&-title {
			margin-bottom: 20px;
		}
	}
	@media screen and (max-width: 1023.98px) {
		.post {
			&-image {
				aspect-ratio: 16/9;
				height: auto;
			}
		}
	}
`;
const PostItem = ({ data }) => {
	const date = data?.createAt?.seconds
		? new Date(data?.createAt?.seconds * 1000)
		: new Date();
	const formatDate = new Date(date).toLocaleDateString('vi-VI');
	if (!data) return null;
	return (
		<PostItemStyles>
			<PostImage url={data.image} alt="unsplash" to={data.slug}></PostImage>

			<PostCategory to={data.category?.slug}>
				{data.category?.name}
			</PostCategory>
			<PostTitle to={data.slug}>{data.title}</PostTitle>
			<PostMeta
				to={slugify(data.user?.username || '', { lower: true })}
				author={data.user?.fullname}
				date={formatDate}
			></PostMeta>
		</PostItemStyles>
	);
};
export default PostItem;
