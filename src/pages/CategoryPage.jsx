import Heading from '@/components/layout/Heading';
import Layout from '@/components/layout/Layout';
import { db } from '@/firebase/firebase-config';
import PostItem from '@/module/post/PostItem';
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
	const params = useParams();
	const [posts, setPosts] = useState([]);
	const [categoryInfo, setCategoryInfo] = useState('');
	console.log('categoryInfo:', categoryInfo[0].name);

	useEffect(() => {
		async function getCategoriesData() {
			const docRef = query(
				collection(db, 'posts'),
				where('category.slug', '==', params.slug)
			);
			const querySnapshot = await getDocs(docRef);
			let result = [];
			querySnapshot.forEach((doc) => {
				result.push({
					name: doc.data().category?.name,
				});
			});
			setCategoryInfo(result);
		}
		getCategoriesData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const docRef = query(
				collection(db, 'posts'),
				where('category.slug', '==', params.slug)
			);
			onSnapshot(docRef, (snapshot) => {
				const results = [];
				snapshot.forEach((doc) => {
					results.push({
						id: doc.id,
						...doc.data(),
					});
				});
				setPosts(results);
			});
		}
		fetchData();
	}, [params.slug]);

	if (posts.length <= 0) return null;
	return (
		<Layout>
			<div className="container">
				<div className="pt-10">
					<Heading>Danh mục {categoryInfo[0].name}</Heading>

					<div className="grid-layout grid-layout--primary">
						{posts.map((item) => (
							<PostItem key={item.id} data={item}></PostItem>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CategoryPage;
