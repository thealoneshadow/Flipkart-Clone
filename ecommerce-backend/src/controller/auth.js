/** @format */
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
exports.singup = (req, res, next) => {
	User.findOne({ email: req.body.email }).exec(async (err, user) => {
		if (user) {
			return res.status(400).json({
				message: "User Alrerady Exists",
			});
		}
		const { firstName, lastName, email, password } = req.body;
		const hash_password = await bcrypt.hashSync(password, 10);
		const _user = new User({
			firstName,
			lastName,
			email,
			hash_password,
			username: shortid.generate(),
		});

		_user.save((error, data) => {
			if (error) {
				return res.status(400).json({
					message: "Something went wrong",
				});
			}
			if (data) {
				return res.status(201).json({
					message: "User Created",
				});
			}
		});
	});
};

exports.signin = (req, res) => {
	User.findOne({ email: req.body.email }).exec((err, user) => {
		if (err) return res.status(400).json({ error });
		if (user) {
			if (user.authenticate(req.body.password)) {
				const token = jwt.sign(
					{ _id: user._id, role: user.role },
					process.env.JWT_SECRET,
					{
						expiresIn: "24h",
					}
				);
				const { _id, firstName, lastName, email, role, fullName } = user;
				res.status(200).json({
					token,
					user: {
						_id,
						firstName,
						lastName,
						email,
						role,
						fullName,
					},
				});
			} else {
				return res.status(400).json({
					message: "Invalid Password",
				});
			}
		} else {
			return res.status(400).json({
				message: "User does not exist",
			});
		}
	});
};
