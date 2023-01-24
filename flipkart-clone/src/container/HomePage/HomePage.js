/** @format */
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import React, { useState, useEffect } from "react";

import { Box, styled } from "@mui/material";

import NavBar from "./Home/NavBar";
import Banner from "./Home/Banner";
import MidSlide from "./Home/MidSlide";
import MidSection from "./Home/MidSection";
import Slide from "./Home/Slide";
import { useSelector, useDispatch } from "react-redux"; // hooks
import { getProductsByCategory, talktoChatGPT } from "../../actions";
import ChatBoxModal from "../../components/ChatBoxModal/ChatBoxModal";
const Component = styled(Box)`
	padding: 20px 10px;
	background: #f2f2f2;
`;

export default function HomePage() {
	const getAllProducts = useSelector((state) => state.product);
	const { products, error } = getAllProducts;
	console.log(products);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProductsByCategory(""));
	}, [dispatch]);

	return (
		<Layout>
			<Component style={{ background: "#f1f3f6" }}>
				<Banner />
				<MidSlide products={products} />
				<MidSection />
				<Slide
					data={products}
					title="Discounts for You"
					timer={false}
					multi={true}
				/>
				<Slide
					data={products}
					title="Suggested Items"
					timer={false}
					multi={true}
				/>
				<Slide
					data={products}
					title="Top Selection"
					timer={false}
					multi={true}
				/>
				<Slide
					data={products}
					title="Recommended Items"
					timer={false}
					multi={true}
				/>
			</Component>
			<ChatBoxModal></ChatBoxModal>
		</Layout>
	);
}
