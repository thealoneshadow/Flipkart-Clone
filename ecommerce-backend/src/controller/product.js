/** @format */

const shortid = require("shortid");
const Product = require("../models/product");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
	// res.status(200).json({
	// 	file: req.files,
	// 	body: req.body,
	// });

	const { name, price, description, category, quantity, createdBy } = req.body;
	let productPictures = [];
	if (req.files.length > 0) {
		req.files.map((file) => {
			productPictures.push({
				img: file.filename,
			});
		});
	}
	const product = new Product({
		name: name,
		slug: slugify(name),
		price,
		quantity,
		description,
		productPictures,
		category,
		createdBy: req.user._id,
	});
	await product.save((err, doc) => {
		if (err) {
			return res.status(400).json({
				status: 500,
				message: err,
			});
		}
		if (doc) {
			return res.status(200).json({
				status: 200,
				message: "Product Created",
				data: doc,
			});
		}
	});
};
