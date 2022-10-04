/** @format */

import "./App.css";
import HomePage from "./container/HomePage/HomePage";
import {
	BrowserRouter as Router,
	Route,
	Routes as Switch,
} from "react-router-dom";
import ProductList from "./container/ProductListPage/ProductListPage";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact element={<HomePage />} />
					<Route path="/:slug" element={<ProductList />} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
