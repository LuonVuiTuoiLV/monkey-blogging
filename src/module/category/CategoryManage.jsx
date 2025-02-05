import { ActionDelete, ActionEdit, ActionView } from '@/components/action';
import { LabelStatus } from '@/components/label';
import { Table } from '@/components/table';
import { db } from '@/firebase/firebase-config';
import { categoryStatus } from '@/utils/constants';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	limit,
	onSnapshot,
	query,
	startAfter,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DashboardHeading from '../dashboard/DashboardHeading';

const CATEGORY_PER_PAY = 1;

const CategoryManage = () => {
	const [categoryList, setCategoryList] = useState([]);
	const navigate = useNavigate();
	const [filter, setFilter] = useState(undefined);
	const [lastDoc, setLastDoc] = useState();
	const [total, setTotal] = useState(0);

	const handleLoadMoreCategory = async () => {
		const nexRef = query(
			collection(db, 'categories'),
			startAfter(lastDoc || 0),
			limit(CATEGORY_PER_PAY)
		);

		onSnapshot(nexRef, (snapshot) => {
			let results = [];
			snapshot.forEach((doc) => {
				results.push({
					id: doc.id,
					...doc.data(),
				});
			});
			setCategoryList([...categoryList, ...results]);
		});

		const documentSnapshots = await getDocs(nexRef);
		const lastVisible =
			documentSnapshots.docs[documentSnapshots.docs.length - 1];
		setLastDoc(lastVisible);
	};
	useEffect(() => {
		async function fetchData() {
			const colRef = collection(db, 'categories');
			const newRef = filter
				? query(
						colRef,
						where('name', '>=', filter),
						where('name', '<=', filter + 'utf8')
				  )
				: query(colRef, limit(CATEGORY_PER_PAY));

			const documentSnapshots = await getDocs(newRef);

			const lastVisible =
				documentSnapshots.docs[documentSnapshots.docs.length - 1];

			onSnapshot(colRef, (snapshot) => {
				setTotal(snapshot.size);
			});

			onSnapshot(newRef, (snapshot) => {
				let results = [];
				snapshot.forEach((doc) => {
					results.push({
						id: doc.id,
						...doc.data(),
					});
				});
				setCategoryList(results);
			});
			setLastDoc(lastVisible);
		}
		fetchData();
	}, [filter]);
	const handleDeleteCategory = async (docId) => {
		const colRef = doc(db, 'categories', docId);
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then(async (result) => {
			if (result.isConfirmed) {
				await deleteDoc(colRef);
				Swal.fire({
					title: 'Deleted!',
					text: 'Your file has been deleted.',
					icon: 'success',
				});
			}
		});
	};

	const handleInputFilter = debounce((e) => {
		setFilter(e.target.value);
	}, 500);
	return (
		<div>
			<DashboardHeading
				title="Categories"
				desc="Manage your category"
			></DashboardHeading>
			<div className="flex justify-end mb-10">
				<input
					type="text"
					placeholder="Search category..."
					className="px-5 py-4 border border-gray-500 rounded-lg outline-none"
					onChange={handleInputFilter}
				/>
			</div>
			<Table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Slug</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{categoryList.length > 0 &&
						categoryList.map((category) => (
							<tr key={category.id}>
								<td>{category.id}</td>
								<td>{category.name}</td>
								<td>
									<span className="italic text-gray-400">{category.slug}</span>
								</td>
								<td>
									{Number(category.status) === categoryStatus.APPROVED && (
										<LabelStatus type="success">Approved</LabelStatus>
									)}
									{Number(category.status) === categoryStatus.UNAPPROVED && (
										<LabelStatus type="warning">Unapproved</LabelStatus>
									)}
								</td>
								<td>
									<div className="flex items-center gap-x-3">
										<ActionView></ActionView>
										<ActionEdit
											onClick={() =>
												navigate(`/manage/update-category?id=${category.id}`)
											}
										></ActionEdit>
										<ActionDelete
											onClick={() => handleDeleteCategory(category.id)}
										></ActionDelete>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
			{total > categoryList.length && (
				<div className="mt-10">
					<Button onClick={handleLoadMoreCategory} className="mx-auto">
						Load more
					</Button>
				</div>
			)}
		</div>
	);
};

export default CategoryManage;
