/** @format */

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/UI/Input/Input";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "../../components/UI/Modal/Modal";
import linearCategories from "../../helpers/linearCategories";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions";
export default function NewPage(props) {
	const [createModal, setCreateModal] = useState(false);
	const [title, setTitle] = useState("");
	const category = useSelector((state) => state.category);
	const [categories, setCategories] = useState([]);
	const [categoryId, setCategoryId] = useState("");
	const [desc, setDesc] = useState("");
	const [banners, setBanners] = useState([]);
	const [products, setProducts] = useState([]);
	const [type, setType] = useState("");
	const dispatch = useDispatch();
	const page = useSelector((state) => state.page);

	useEffect(() => {
		setCategories(linearCategories(category.categories));
	}, [category]);

	useEffect(() => {
		if (!page.loading) {
			setCreateModal(false);
			setTitle("");
			setCategoryId("");
			setDesc("");
			setBanners([]);
			setProducts([]);
			setType("");
		}
	}, [page]);

	const handleBannerImages = (e) => {
		setBanners([...banners, e.target.files[0]]);
	};
	const handleProductImages = (e) => {
		setProducts([...products, e.target.files[0]]);
	};

	const onCategoryChange = (e) => {
		const category = categories.find(
			(category) => category.value === e.target.value
		);

		setCategoryId(e.target.value);
		setType(category.type);
	};

	const submitPageForm = (e) => {
		e.preventDefault();
		if (title === "") {
			alert("Title is required");
			setCreateModal(false);
			return;
		}

		const form = new FormData();
		form.append("title", title);
		form.append("description", desc);
		form.append("category", categoryId);
		form.append("type", type);
		banners.forEach((banner, index) => {
			form.append("banners", banner);
		});
		products.forEach((product, index) => {
			form.append("products", product);
		});

		dispatch(createPage(form));
		setCreateModal(true);
	};
	const renderCreatePageModal = () => {
		return (
			<Modal
				show={createModal}
				modalTitle={`Create New Page`}
				handleClose={() => setCreateModal(false)}
				onSubmit={submitPageForm}
			>
				<Container>
					<Row>
						<Col>
							{/* <select
								className="form-control form-control-sm"
								value={categoryId}
								onChange={onCategoryChange}
							>
								<option value="">Select Category</option>
								{categories.map((option) => (
									<option key={option._id} value={option._id}>
										{option.name}
									</option>
								))}
							</select> */}
							<Input
								type="select"
								value={categoryId}
								onChange={onCategoryChange}
								options={categories}
								placeholder={"Select Category"}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Input
								value={title}
								placeholder={`Page Title`}
								onChange={(e) => setTitle(e.target.value)}
								className="form-control-sm"
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Input
								value={desc}
								placeholder={`Page Description`}
								onChange={(e) => setDesc(e.target.value)}
								className="form-control-sm"
							/>
						</Col>
					</Row>
					<Row>
						{banners.length > 0
							? banners.map((banner, index) => (
									<Col key={index}>{banner.name}</Col>
							  ))
							: null}
						<Col>
							<Input
								type="file"
								name="banners"
								className="form-control form-control-sm"
								onChange={handleBannerImages}
							/>
						</Col>
					</Row>
					<Row>
						{products.length > 0
							? products.map((product, index) => (
									<Col key={index}>{product.name}</Col>
							  ))
							: null}
						<Col>
							<Input
								className="form-control form-control-sm"
								type="file"
								name="products"
								onChange={handleProductImages}
							/>
						</Col>
					</Row>
				</Container>
			</Modal>
		);
	};
	return (
		<Layout sidebar>
			{page.loading ? (
				<p>Creating Page... Please wait</p>
			) : (
				<>
					{renderCreatePageModal()}
					<button onClick={() => setCreateModal(true)}>Create Page</button>
				</>
			)}
		</Layout>
	);
}
