/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/UI/Card/Card";
import CartItem from "./CartItem/CartItem";
// import CartItem from "./CartItem";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
// import PriceDetails from "../../components/PriceDetails";

import "./CartPage.css";
//import { MaterialButton } from "../../components/MaterialUI";

/**
 * @author
 * @function CartPage
 **/

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage
*/

const CartPage = (props) => {
	const cart = useSelector((state) => state.cart);
	const auth = useSelector((state) => state.auth);
	const [cartItems, setCartItems] = useState(cart.cartItems);
	const dispatch = useDispatch();

	useEffect(() => {
		setCartItems(cart.cartItems);
	}, [cart.cartItems]);

	useEffect(() => {
		if (auth.authenticate) {
			dispatch(getCartItems());
		}
	}, [auth.authenticate]);

	const onQuantityIncrement = (_id, qty) => {
		const { name, price, img } = cartItems[_id];
		dispatch(addToCart({ _id, name, price, img }, 1));
	};

	const onQuantityDecrement = (_id, qty) => {
		const { name, price, img } = cartItems[_id];
		dispatch(addToCart({ _id, name, price, img }, -1));
	};

	const onRemoveCartItem = (_id) => {
		dispatch(removeCartItem({ productId: _id }));
	};

	if (props.onlyCartItems) {
		return (
			<>
				{Object.keys(cartItems).map((key, index) => (
					<CartItem
						key={index}
						cartItem={cartItems[key]}
						onQuantityInc={onQuantityIncrement}
						onQuantityDec={onQuantityDecrement}
					/>
				))}
			</>
		);
	}

	return (
		<Layout>
			<div className="cartContainer" style={{ alignItems: "flex-start" }}>
				<Card
					headerLeft={`My Cart`}
					headerRight={<div>Deliver to</div>}
					style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
				>
					{Object.keys(cartItems).map((key, index) => (
						<CartItem
							key={index}
							cartItem={cartItems[key]}
							onQuantityInc={onQuantityIncrement}
							onQuantityDec={onQuantityDecrement}
							onRemoveCartItem={onRemoveCartItem}
						/>
					))}
				</Card>
				<Card headerLeft={`Price `} style={{ width: "500px" }}></Card>
			</div>
		</Layout>
	);
};

export default CartPage;
