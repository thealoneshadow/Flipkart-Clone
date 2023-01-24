/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/UI/Card/Card";
import CartItem from "./CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import PriceDetails from "../../components/PriceDetails/PriceDetails";
import "./CartPage.css";
import { MaterialButton } from "../../components/MaterialUI/MaterialUI";
import EmptyCart from "./EmptyCart";

/**
 * @author theAloneshadow(Divyanshu Goyal)
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
	console.log(cartItems);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setCartItems(cart.cartItems);
	}, [cart.cartItems]);

	useEffect(() => {
		if (auth.authenticate) {
			dispatch(getCartItems());
		}
	}, [auth.authenticate]);

	const onQuantityIncrement = (_id, qty) => {
		const { name, price, maximumRetailPrice, img } = cartItems[_id];
		dispatch(addToCart({ _id, name, price, maximumRetailPrice, img }, 1));
	};

	const onQuantityDecrement = (_id, qty) => {
		const { name, price, maximumRetailPrice, img } = cartItems[_id];
		dispatch(addToCart({ _id, name, price, maximumRetailPrice, img }, -1));
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
			{Object.keys(cartItems).length < 0 ? (
				<EmptyCart />
			) : (
				<div className="cartContainer" style={{ alignItems: "flex-start" }}>
					<Card
						headerLeft={`My Cart`}
						headerRight={<div>Deliver to</div>}
						style={{
							width: "calc(100% - 400px)",
							overflow: "hidden",
							background: "#ffffff",
							borderRadius: "2px",
							minHeight: "47px",
							boxShadow: "rgb(0 0 0 / 20%) 0px 1px 1px 0px",
							border: "none",
						}}
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

						<div
							style={{
								width: "100%",
								display: "flex",
								background: "#ffffff",
								justifyContent: "flex-end",
								boxShadow: "0 0 10px 4px #eee",
								padding: "10px 0",
								boxSizing: "border-box",
							}}
						>
							<div style={{ width: "250px", marginRight: "10px" }}>
								<MaterialButton
									title="PLACE ORDER"
									onClick={() => navigate(`/checkout`)}
								/>
							</div>
						</div>
					</Card>
					<PriceDetails
						totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
							return qty + cart.cartItems[key].qty;
						}, 0)}
						totalPrice={Object.keys(cart.cartItems).reduce(
							(totalPrice, key) => {
								const { price, qty } = cart.cartItems[key];
								return totalPrice + price * qty;
							},
							0
						)}
						mrp={Object.keys(cart.cartItems).reduce((mrp, key) => {
							const { maximumRetailPrice, qty } = cart.cartItems[key];
							console.log(cart.cartItems);
							return mrp + maximumRetailPrice * qty;
						}, 0)}
					/>
				</div>
			)}
		</Layout>
	);
};

export default CartPage;
