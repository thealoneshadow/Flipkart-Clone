/** @format */

import React from "react";
import Header from "../Header/Header";
import MenuHeader from "../MenuHeader/MenuHeader";
import NavBar from "../../container/HomePage/Home/NavBar";
import { useLocation } from "react-router-dom";
export default function Layout(props) {
	const location = useLocation();
	let color = location.pathname != "/" ? "#f1f3f6" : "#fff";
	return (
		<div style={{ background: `${color}` }}>
			<Header />
			{location.pathname === "/" ? <NavBar /> : <MenuHeader />}

			{props.children}
		</div>
	);
}
