/** @format */

import "./App.css";
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes as Switch,
} from "react-router-dom";
import Home from "./container/Home/Home";
import Signin from "./container/Signin/Signin";
import Signup from "./container/Signup/Signup";
function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/" exact element={<Home />} />
					<Route path="/signin" exact element={<Signin />} />
					<Route path="/signup" exact element={<Signup />} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
