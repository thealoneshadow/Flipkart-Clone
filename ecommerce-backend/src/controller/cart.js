/** @format */

const Cart = require("../models/cart");

function runUpdate(condition, updateData) {
	return new Promise((resolve, reject) => {
		//you update code here

		Cart.findOneAndUpdate(condition, updateData, { new: true, upsert: true })
			.then((result) => resolve())
			.catch((err) => reject(err));
	});
}

exports.addItemToCart = (req, res) => {
	Cart.findOne({ user: req.user._id }).exec((error, cart) => {
		console.log("I am 1");
		if (error) return res.status(400).json({ error });
		if (cart) {
			console.log("I am 2");
			//if cart already exists then update cart by quantity
			let promiseArray = [];

			req.body.cartItems.forEach((cartItem) => {
				const product = cartItem.product;
				const item = cart.cartItems.find((c) => c.product == product);
				console.log(item);
				let condition, update;
				if (item) {
					condition = { user: req.user._id, "cartItems.product": product };
					update = {
						$set: {
							cartItems: cartItem,
						},
					};
				} else {
					condition = { user: req.user._id };
					update = {
						$push: {
							cartItems: cartItem,
						},
					};
				}
				promiseArray.push(runUpdate(condition, update));
			});
			console.log("I am 3" + promiseArray[0]);
			console.log("I am 3" + promiseArray[1]);
			console.log("I am 3" + promiseArray[2]);
			Promise.all(promiseArray)
				.then((response) => res.status(201).json({ response }))
				.catch((error) => {
					console.log("I am 4");
					res.status(400).json({ error });
				});
		} else {
			//if cart not exist then create a new cart
			const cart = new Cart({
				user: req.user._id,
				cartItems: req.body.cartItems,
			});
			cart.save((error, cart) => {
				if (error) return res.status(400).json({ error });
				if (cart) {
					return res.status(201).json({ cart });
				}
			});
		}
	});
};

exports.getCartItems = (req, res) => {
	//const { user } = req.body.payload;
	//if(user){
	Cart.findOne({ user: req.user._id })
		.populate("cartItems.product", "_id name price productPictures")
		.exec((error, cart) => {
			console.log("cart data" + cart);

			if (error) return res.status(400).json({ error });
			if (cart) {
				let cartItems = {};
				cart.cartItems.forEach((item, index) => {
					cartItems[item.product._id.toString()] = {
						_id: item.product._id.toString(),
						name: item.product.name,
						img: item.product.productPictures[0].img,
						price: item.product.price,
						qty: item.quantity,
					};
				});
				res.status(200).json({ cartItems });
			}
		});
	//}
};

// new update remove cart items
exports.removeCartItems = (req, res) => {
	const { productId } = req.body.payload;
	if (productId) {
		Cart.update(
			{ user: req.user._id },
			{
				$pull: {
					cartItems: {
						product: productId,
					},
				},
			}
		).exec((error, result) => {
			if (error) return res.status(400).json({ error });
			if (result) {
				res.status(202).json({ result });
			}
		});
	}
};
