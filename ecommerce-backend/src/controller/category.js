/** @format */

const slugify = require("slugify");
const Category = require("../models/category");

function createCategories(categories, parentId = null) {
	const categoryList = [];
	let category;
	if (parentId == null) {
		category = categories.filter((cat) => cat.parentId == undefined);
	} else {
		category = categories.filter((cat) => cat.parentId == parentId);
	}

	for (let cat of category) {
		categoryList.push({
			_id: cat._id,
			name: cat.name,
			slug: cat.slug,
			children: createCategories(categories, cat._id),
		});
	}
	return categoryList;
}

exports.addCategory = (req, res) => {
	const categoryObj = {
		name: req.body.name,
		slug: slugify(req.body.name),
	};

	if (req.body.parentId) {
		categoryObj.parentId = req.body.parentId;
	}
	const cat = new Category(categoryObj);
	cat.save((err, doc) => {
		if (err) {
			return res.status(400).json({
				status: 500,
				message: err,
			});
		}
		if (doc) {
			return res.status(200).json({
				status: 200,
				message: "Category Created",
				data: doc,
			});
		}
	});
};

exports.getCategories = (req, res) => {
	Category.find({}).exec((err, categories) => {
		if (err) {
			return res.status(400).json({
				message: err,
			});
		}
		if (categories) {
			const categoryList = createCategories(categories);

			return res.status(200).json({
				categoryList,
			});
		}
	});
};
