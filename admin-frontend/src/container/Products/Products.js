/** @format */

import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById } from "../../actions";
import Modal from "../../components/UI/Modal/Modal";
import "./Product.css";
import { generatePublicUrl } from "../../urlConfig";
const Products = (props) => {
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState("");
	const [maximumRetailPrice, setMaximumRetailPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [productPictures, setProductPictures] = useState([]);
	const [show, setShow] = useState(false);
	const [productDetailModal, setProductDetailModal] = useState(false);
	const [productDetails, setProductDetails] = useState(null);
	const category = useSelector((state) => state.category);
	const product = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const handleClose = () => {
		//const form = new FormData();
		// const cat = {
		// 	categoryName,
		// 	parentCategoryId,
		// 	categoryImage,
		// };

		// form.append("name", name);
		// form.append("quantity", quantity);
		// form.append("price", price);
		// form.append("description", description);
		// form.append("category", categoryId);
		// for (let pic of productPictures) {
		// 	form.append("productPicture", pic);
		// }
		// dispatch(addProduct(form));
		setShow(false);
	};
	const submitProductForm = () => {
		const form = new FormData();
		form.append("name", name);
		form.append("quantity", quantity);
		form.append("price", price);
		form.append("maximumRetailPrice", maximumRetailPrice);
		form.append("description", description);
		form.append("category", categoryId);

		for (let pic of productPictures) {
			form.append("productPicture", pic);
		}

		dispatch(addProduct(form)).then(() => setShow(false));
	};
	const handleShow = () => setShow(true);

	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({ value: category._id, name: category.name });
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};

	const handleProductPictures = (e) => {
		let files = [];
		for (let i = 0; i < e.target.files.length; i++) {
			files.push(e.target.files[i]);
		}
		productPictures.push(...files);
		setProductPictures(productPictures);
	};

	const renderProducts = () => {
		return (
			<Table style={{ fontSize: 12 }} responsive="sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Qunatity</th>
						<th>Category</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{product.products.length > 0
						? product.products.map((product) => (
								<tr
									onClick={() => showProductDetailsModal(product)}
									key={product._id}
								>
									<td>3</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.quantity}</td>
									<td>{product.category.name}</td>
									<td
										style={{ display: "flex", justifyContent: "space-between" }}
									>
										<button
											className="btn btn-info"
											onClick={() => showProductDetailsModal(product)}
										>
											info
										</button>
										<button
											className="btn btn-danger"
											style={{ marginLeft: "10px" }}
											onClick={() => {
												const payload = {
													productId: product._id,
												};
												dispatch(deleteProductById(payload));
											}}
										>
											Delete
										</button>
									</td>
								</tr>
						  ))
						: null}
				</tbody>
			</Table>
		);
	};

	const renderAddProductModal = () => {
		return (
			<Modal
				show={show}
				handleClose={handleClose}
				modalTitle={"Add New Product"}
				onSubmit={submitProductForm}
			>
				<Input
					label="Name"
					value={name}
					placeholder={`Product Name`}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					label="Quantity"
					value={quantity}
					placeholder={`Product Quantity`}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<Input
					label="Price"
					value={price}
					placeholder={`Product Price`}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<Input
					label="Price"
					value={maximumRetailPrice}
					placeholder={`Product MRP`}
					onChange={(e) => setMaximumRetailPrice(e.target.value)}
				/>
				<Input
					label="Description"
					value={description}
					placeholder={`Product Description`}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<select
					className="form-control"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					<option>Select Category</option>
					{createCategoryList(category.categories).map((option) => (
						<option key={option.value} value={option.value}>
							{option.name}
						</option>
					))}
				</select>

				{productPictures.length > 0
					? productPictures.map((pic, index) => (
							<div key={index}>{pic.name}</div>
					  ))
					: null}
				<Input
					type="file"
					name="productPicture"
					multiple
					onChange={handleProductPictures}
				/>
			</Modal>
		);
	};

	const handleCloseProductDetailsModal = () => {
		setProductDetailModal(false);
	};

	const showProductDetailsModal = (product) => {
		setProductDetails(product);
		setProductDetailModal(true);
	};

	const renderProductDetailsModal = () => {
		if (!productDetails) {
			return null;
		}
		return (
			<Modal
				show={productDetailModal}
				handleClose={handleCloseProductDetailsModal}
				modalTitle={"ProductDetails"}
				size="lg"
			>
				<Row>
					<Col md="6">
						<label className="key">Name</label>
						<p className="value">{productDetails.name}</p>
					</Col>
					<Col md="6">
						<label className="key">Price</label>
						<p className="value">{productDetails.price}</p>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<label className="key">Quantity</label>
						<p className="value">{productDetails.quantity}</p>
					</Col>
					<Col md="6">
						<label className="key">Category</label>
						<p className="value">{productDetails.category.name}</p>
					</Col>
				</Row>
				<Row>
					<Col md="12">
						<label className="key">Description</label>
						<p className="value">{productDetails.description}</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<label className="key">Product Pictures</label>
						<div style={{ display: "flex" }}>
							{productDetails.productPictures.map((picture) => (
								<div className="productImgContainer">
									<img src={picture.img} alt="productImage" />
								</div>
							))}
						</div>
					</Col>
				</Row>
			</Modal>
		);
	};

	return (
		<Layout sidebar>
			<Row>
				<Col md={12}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<h3
							style={{
								fontWeight: "600",
							}}
						>
							Products
						</h3>
						<button className="btn btn-success" onClick={handleShow}>
							Add
						</button>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>{renderProducts()}</Col>
			</Row>
			{renderAddProductModal()}
			{renderProductDetailsModal()}
		</Layout>
	);
};

export default Products;
