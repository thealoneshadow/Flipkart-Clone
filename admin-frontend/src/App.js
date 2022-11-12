/** @format */

import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "./container/Home/Home";
import Signin from "./container/Signin/Signin";
import Signup from "./container/Signup/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn, getInitialData } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import Products from "./container/Products/Products";
import Orders from "./container/Orders/Orders";
import Category from "./container/Category/Category";
import NewPage from "./container/NewPage/NewPage";

function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}
		if (auth.authenticate) {
			dispatch(getInitialData());
		}
	}, [auth.authenticate]);
	return (
		<div>
			<Switch>
				<Route element={<PrivateRoute />}>
					<Route path="/" element={<Home />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path="/page" element={<NewPage />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path="/category" element={<Category />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path="/products" element={<Products />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path="/orders" element={<Orders />} />
				</Route>
				<Route path="/signin" exact element={<Signin />} />
				<Route path="/signup" exact element={<Signup />} />
			</Switch>
		</div>
	);
}

export default App;
