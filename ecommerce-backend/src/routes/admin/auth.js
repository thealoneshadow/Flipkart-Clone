/** @format */

const express = require("express");
const {
	validateSignupRequest,
	validateSigninRequest,
	isRequestValidated,
} = require("../../validators/auth");
const { singup, signin } = require("../../controller/admin/auth");
const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, singup);

router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);

module.exports = router;
