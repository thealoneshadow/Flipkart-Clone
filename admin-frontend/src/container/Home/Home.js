/** @format */

import React from "react";
import Layout from "../../components/Layout/Layout";
import "../Home/Home.css";
export default function Home(props) {
	return (
		<div>
			<Layout>
				<div
					style={{
						marginTop: "1rem",
						marginBottom: "-3.6rem",
						background: "#fff",
						fontSize: "2.6rem",
					}}
					className="jumbotron text-center"
				>
					Welcome to Admin Dashboard
				</div>
				<p
					style={{ background: "#fff", fontSize: "1.3rem" }}
					className="jumbotron text-center"
				>
					This is a simple hero unit, a simple jumbotron-style component for
					calling
				</p>
			</Layout>
		</div>
	);
}
