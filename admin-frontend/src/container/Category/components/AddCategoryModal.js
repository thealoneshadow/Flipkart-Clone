/** @format */

import react from "react";
import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";
import { Container, Row, Col } from "react-bootstrap";

const AddCategoryModal = (props) => {
	const {
		show,
		handleClose,
		modalTitle,
		expandedArray,
		checkedArray,
		handleCategoryInput,
		categoryName,
		setCategoryName,
		parentCategoryId,
		setParentCategoryId,
		handleCategoryImage,
		onSubmit,
		categoryList,
	} = props;
	return (
		<Modal
			show={show}
			handleClose={handleClose}
			onSubmit={onSubmit}
			modalTitle={modalTitle}
		>
			<Row>
				<Col>
					<Input
						value={categoryName}
						placeholder={`Category Name`}
						onChange={(e) => setCategoryName(e.target.value)}
						className="form-control-sm"
					/>
				</Col>
				<Col>
					<select
						className="form-control form-control-sm"
						value={parentCategoryId}
						onChange={(e) => setParentCategoryId(e.target.value)}
					>
						<option>Select Category</option>
						{categoryList.map((option) => (
							<option key={option.value} value={option.value}>
								{option.name}
							</option>
						))}
					</select>
				</Col>
			</Row>
			<Row>
				<Col>
					<Input
						type="file"
						name="categoryImage"
						onChange={handleCategoryImage}
					/>
				</Col>
			</Row>
		</Modal>
	);
};
export default AddCategoryModal;
