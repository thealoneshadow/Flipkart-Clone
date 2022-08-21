/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv");
//rout4es
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
//environment variables
env.config();
// mongodb+srv://AamioElectric:6397984019Jio@aamio.vtz6m.mongodb.net/?retryWrites=true&w=majority
mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ghx4xia.mongodb.net/beckend-ecommerce?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log("connected to database");
	});
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
// app.get("/", (req, res, next) => {
// 	res.status(200).json({
// 		message: "Welcome to the Ecommerce Backend",
// 	});
// });

// app.post("/data", (req, res, next) => {
// 	res.status(200).json({
// 		message: req.body,
// 	});
// });

app.listen(process.env.PORT, () => {
	console.log(process.env.PORT);
});
