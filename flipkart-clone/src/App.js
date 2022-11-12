/** @format */

import "./App.css";
import HomePage from "./container/HomePage/HomePage";
import {
	BrowserRouter as Router,
	Route,
	Routes as Switch,
} from "react-router-dom";
import ProductList from "./container/ProductListPage/ProductListPage";
import { useEffect } from "react";
import { isUserLoggedIn, updateCart } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsPage from "./container/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./container/CartPage/CartPage";

function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}
	}, [auth.authenticate]);

	useEffect(() => {
		dispatch(updateCart());
	}, [auth.authenticate]);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact element={<HomePage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route
						path="/:productSlug/:productId/p"
						element={<ProductDetailsPage />}
					/>
					<Route path="/:slug" element={<ProductList />} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
