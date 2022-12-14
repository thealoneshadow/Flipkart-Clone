/** @format */

const shortid = require("shortid");
const Product = require("../models/product");
const slugify = require("slugify");
const Category = require("../models/category");

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

exports.getProductsBySlug = (req, res) => {
	const { slug } = req.params;
	Category.findOne({ slug: slug })
		.select("_id type")
		.exec((error, category) => {
			if (error) {
				return res.status(400).json({ error });
			}

			if (category) {
				Product.find({ category: category._id }).exec((error, products) => {
					if (error) {
						return res.status(400).json({ error });
					}

					if (category.type) {
						if (products.length > 0) {
							res.status(200).json({
								products,
								priceRange: {
									under5k: 5000,
									under10k: 10000,
									under15k: 15000,
									under20k: 20000,
									under30k: 30000,
								},
								productsByPrice: {
									under5k: products.filter((product) => product.price <= 5000),
									under10k: products.filter(
										(product) => product.price > 5000 && product.price <= 10000
									),
									under15k: products.filter(
										(product) => product.price > 10000 && product.price <= 15000
									),
									under20k: products.filter(
										(product) => product.price > 15000 && product.price <= 20000
									),
									under30k: products.filter(
										(product) => product.price > 20000 && product.price <= 30000
									),
								},
							});
						}
					} else {
						res.status(200).json({ products });
					}
				});
			}
		});
};
exports.getProductDetailsById = async (req, res) => {
	const { productId } = req.params;
	if (productId) {
		try {
			const product = await Product.findOne({ _id: productId }).exec();
			res.status(200).json({ product });
		} catch (error) {
			return res.status(400).json({
				status: 500,
				message: error,
			});
		}
	} else {
		return res.status(400).json({
			status: 500,
			message: "Params required",
		});
	}
};
