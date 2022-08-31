/** @format */

import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "./container/Home/Home";
import Signin from "./container/Signin/Signin";
import Signup from "./container/Signup/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn } from "./actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}
	}, []);
	return (
		<div>
			<Switch>
				<Route element={<PrivateRoute />}>
					<Route path="/" element={<Home />} />
				</Route>
				<Route path="/signin" exact element={<Signin />} />
				<Route path="/signup" exact element={<Signup />} />
			</Switch>
		</div>
	);
}

export default App;
