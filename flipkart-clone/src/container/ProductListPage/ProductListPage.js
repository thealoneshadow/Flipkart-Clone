/** @format */

import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { getProductsBySlug } from "../../actions";
import { useLocation } from "react-router-dom";

export default function ProductListPage(props) {
	const dispatch = useDispatch();
	const location = useLocation();
	const slug = location.pathname.split("/")[1];
	useEffect(() => {
		console.log(location, slug);
		dispatch(getProductsBySlug(slug));
	}, []);

	return <Layout>Product List Page</Layout>;
}
