/** @format */

const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const router = express.Router();
const Product = require("../models/product");
const {
	createProduct,
	getProductsBySlug,
	getProductDetailsById,
} = require("../controller/product");
const { upload } = require("../common-middleware");
// const multer = require("multer");
// const shortid = require("shortid");
// const path = require("path");

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, path.join(path.dirname(__dirname), "uploads"));
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, shortid.generate() + "-" + file.originalname);
// 	},
// });

// const upload = multer({ storage });

router.post(
	"/product/create",
	requireSignin,
	adminMiddleware,
	upload.array("productPicture"),
	createProduct
);

router.get("/products/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);

//router.get("/product/getProduct", getCategories);

module.exports = router;
