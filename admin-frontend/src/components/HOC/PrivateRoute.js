/** @format */

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
	let auth = localStorage.getItem("token");
	return auth ? <Outlet {...rest} /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
