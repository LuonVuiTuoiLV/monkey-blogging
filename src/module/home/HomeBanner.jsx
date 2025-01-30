import { Button } from '@/components/button';
import styled from 'styled-components';

const HomeBannerStyles = styled.div`
	min-height: 520px;
	padding: 40px 0;
	margin-bottom: 60px;
	background-image: linear-gradient(
		to right bottom,
		${(props) => props.theme.primary},
		${(props) => props.theme.secondary}
	);

	.banner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		&-content {
			max-width: 650px;
			color: white;
		}
		&-heading {
			font-weight: 700;
			font-size: 48px;
			margin-bottom: 20px;
		}
		&-desc {
			line-height: 1.75;
			margin-bottom: 40px;
			font-size: 14px;
		}
	}
	@media screen and (max-width: 1023.98px) {
		.banner {
			flex-direction: column;
			min-height: unset;
			&-heading {
				font-size: 30px;
				margin-bottom: 10px;
			}
			&-desc {
				font-size: 14px;
				margin-bottom: 20px;
			}
			&-image {
				margin-top: 25px;
			}
			&-button {
				font-size: 14px;
				height: auto;
				padding: 15px;
			}
		}
	}
`;

const HomeBanner = () => {
	return (
		<HomeBannerStyles>
			<div className="container">
				<div className="banner">
					<div className="banner-content">
						<h1 className="banner-heading">Monkey Blogging</h1>
						<p className="banner-desc">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Perspiciatis voluptatibus numquam dolor iusto quisquam ex ratione
							perferendis dolore laudantium quos fugiat cum earum consectetur
							eius iure, cumque esse? In, itaque.
						</p>
						<Button
							to="/sign-in"
							kind="secondary"
							className="inline-block banner-button"
						>
							Get started
						</Button>
					</div>
					<div className="banner-image">
						<img src="/banner.png" alt="banner" />
					</div>
				</div>
			</div>
		</HomeBannerStyles>
	);
};

export default HomeBanner;
