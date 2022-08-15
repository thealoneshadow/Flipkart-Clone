/** @format */

const express = require("express");
const {
	singup,
	signin,
	requireSignin,
} = require("../../controller/admin/auth");
const router = express.Router();

router.post("/admin/signup", singup);

router.post("/admin/signin", signin);

module.exports = router;
