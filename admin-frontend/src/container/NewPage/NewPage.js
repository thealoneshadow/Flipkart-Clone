/** @format */

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/UI/Input/Input";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "../../components/UI/Modal/Modal";
import linearCategories from "../../helpers/linearCategories";
import { useDispatch, useSelector } from "react-redux";
export default function NewPage(props) {
	const [createModal, setCreateModal] = useState(false);
	const [title, setTitle] = useState("");
	const category = useSelector((state) => state.category);
	const [categories, setCategories] = useState([]);
	const [categoryId, setCategoryId] = useState("");
	const [desc, setDesc] = useState("");
	const [banners, setBanners] = useState([]);
	const [products, setProducts] = useState([]);
	useEffect(() => {
		setCategories(linearCategories(category.categories));
	}, [category]);

	const handleBannerImages = (e) => {
		console.log(e);
	};
	const handleProductImages = (e) => {
		console.log(e);
	};
	const renderCreatePageModal = () => {
		return (
			<Modal
				show={createModal}
				modalTitle={`Create New Page`}
				handleClose={() => setCreateModal(false)}
			>
				<Container>
					<Row>
						<Col>
							<select
								className="form-control form-control-sm"
								value={categoryId}
								onChange={(e) => setCategoryId(e.target.value)}
							>
								<option value="">Select Category</option>
								{categories.map((option) => (
									<option key={option._id} value={option.value}>
										{option.name}
									</option>
								))}
							</select>
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
			{renderCreatePageModal()}
			<button onClick={() => setCreateModal(true)}>Create Page</button>
		</Layout>
	);
}
