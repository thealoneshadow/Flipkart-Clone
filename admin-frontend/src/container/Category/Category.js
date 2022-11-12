/** @format */

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllCategory,
	addCategory,
	updateCategories,
	deleteCategories as deleteCategoriesAction,
} from "../../actions";
import Modal from "../../components/UI/Modal/Modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
	IoIosCheckboxOutline,
	IoIosCheckbox,
	IoIosCheckmark,
	IoIosArrowDown,
	IoIosArrowForward,
	IoIosTrash,
	IoIosCloudUpload,
	IoIosAdd,
} from "react-icons/io";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import "./style.css";

export default function Category() {
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [parentCategoryId, setParentCategoryId] = useState("");
	const [categoryImage, setCategoryImage] = useState("");
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [checkedArray, setCheckedArray] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

	useEffect(() => {
		if (!category.loading) {
			setShow(false);
		}
	}, [category.loading]);

	const handleClose = () => {
		const form = new FormData();
		if (categoryName === "") {
			alert("Category name is required");
			setShow(false);
			return;
		}

		form.append("name", categoryName);
		form.append("parentId", parentCategoryId);
		form.append("categoryImage", categoryImage);
		dispatch(addCategory(form));
		setCategoryName("");
		setParentCategoryId("");
		setCategoryImage("");
		setShow(false);
	};
	const handleShow = () => setShow(true);
	const renderCategories = (categories) => {
		let myCategories = [];
		for (let category of categories) {
			myCategories.push({
				label: category.name,
				value: category._id,
				children:
					category.children.length > 0 && renderCategories(category.children),
			});
		}
		return myCategories;
	};

	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({
				value: category._id,
				name: category.name,
				parentId: category.parentId,
				type: category.type,
			});
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};

	const handleCategoryImage = (e) => {
		setCategoryImage(e.target.files[0]);
	};

	const updateCategory = () => {
		setUpdateCategoryModal(true);
		updateCheckedAndExpandedCategories();
	};

	const updateCheckedAndExpandedCategories = () => {
		const categories = createCategoryList(category.categories);
		const checkedArray = [];
		const expandedArray = [];
		checked.length > 0 &&
			checked.map((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId == category.value
				);
				category && checkedArray.push(category);
			});
		expanded.length > 0 &&
			expanded.map((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId == category.value
				);
				category && expandedArray.push(category);
			});
		setCheckedArray(checkedArray);
		setExpandedArray(expandedArray);
	};

	const handleCategoryInput = (key, value, index, type) => {
		if (type == "checked") {
			const updateCheckedArray = checkedArray.map((item, _index) =>
				index == _index ? { ...item, [key]: value } : item
			);
			setCheckedArray(updateCheckedArray);
		} else if (type == "expanded") {
			const updateExpandedArray = expandedArray.map((item, _index) =>
				index == _index ? { ...item, [key]: value } : item
			);
			setExpandedArray(updateExpandedArray);
		}
	};

	const updateCategoriesForm = () => {
		const form = new FormData();
		expandedArray.forEach((item, index) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});
		checkedArray.forEach((item, index) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});
		dispatch(updateCategories(form));
		setUpdateCategoryModal(false);
	};

	const deleteCategory = () => {
		updateCheckedAndExpandedCategories();
		setDeleteCategoryModal(true);
	};

	const deleteCategories = () => {
		const checkedIdsArray = checkedArray.map((item, index) => ({
			_id: item.value,
		}));
		const expandedIdsArray = expandedArray.map((item, index) => ({
			_id: item.value,
		}));
		const idsArray = expandedIdsArray.concat(checkedIdsArray);

		if (checkedIdsArray.length > 0) {
			dispatch(deleteCategoriesAction(checkedIdsArray));
			setDeleteCategoryModal(false);
		}
	};

	const renderDeleteCategoryModal = () => {
		return (
			<Modal
				modalTitle="Confirm"
				show={deleteCategoryModal}
				handleClose={() => setDeleteCategoryModal(false)}
				buttons={[
					{
						label: "No",
						color: "primary",
						onClick: () => {
							alert("no");
						},
					},
					{
						label: "Yes",
						color: "danger",
						onClick: deleteCategories,
					},
				]}
			>
				<h5>Expanded</h5>
				{expandedArray.map((item, index) => (
					<span key={index}>{item.name}</span>
				))}
				<h5>Checked</h5>
				{checkedArray.map((item, index) => (
					<span key={index}>{item.name}</span>
				))}
			</Modal>
		);
	};

	const categoryList = createCategoryList(category.categories);
	return (
		<Layout sidebar>
			<Container>
				<Row>
					<Col md={12}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<h3>Category</h3>
							<div className="actionBtn-Container">
								<span>Actions:</span>
								<button onClick={handleShow}>
									<IoIosAdd />
									<span>Add</span>
								</button>
								<button onClick={deleteCategory}>
									<IoIosTrash />
									<span>Delete</span>
								</button>
								<button onClick={updateCategory}>
									<IoIosCloudUpload />
									<span>Edit</span>
								</button>
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						{/* <ul>
							{renderCategories(category.categories)}
							{JSON.stringify(createCategoryList(category.categories))}
						</ul> */}
						<CheckboxTree
							nodes={renderCategories(category.categories)}
							checked={checked}
							expanded={expanded}
							onCheck={(checked) => setChecked(checked)}
							onExpand={(expanded) => setExpanded(expanded)}
							icons={{
								check: <IoIosCheckbox />,
								uncheck: <IoIosCheckboxOutline />,
								halfCheck: <IoIosCheckmark />,
								expandClose: <IoIosArrowForward />,
								expandOpen: <IoIosArrowDown />,
							}}
						/>
					</Col>
				</Row>
			</Container>
			<UpdateCategoriesModal
				show={updateCategoryModal}
				handleClose={() => setUpdateCategoryModal(false)}
				onSubmit={updateCategoriesForm}
				modalTitle={"Update Categories"}
				size="lg"
				expandedArray={expandedArray}
				checkedArray={checkedArray}
				handleCategoryInput={handleCategoryInput}
				categoryList={categoryList}
			/>

			{/* Add  Categories*/}
			<AddCategoryModal
				show={show}
				handleClose={() => setShow(false)}
				onSubmit={handleClose}
				modalTitle={"Add New Category"}
				categoryName={categoryName}
				setCategoryName={setCategoryName}
				parentCategoryId={parentCategoryId}
				setParentCategoryId={setParentCategoryId}
				categoryList={categoryList}
				handleCategoryImage={handleCategoryImage}
			/>

			{/* Update Categories To Begin From Here*/}

			{renderDeleteCategoryModal()}
		</Layout>
	);
}
