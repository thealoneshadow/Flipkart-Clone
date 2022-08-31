/** @format */

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import "../Home/Home.css";
export default function Home(props) {
	return (
		<div>
			<Layout>
				<Container fluid>
					<Row>
						<Col md={2} className="sidebar">
							sidebar
						</Col>
						<Col md={10} style={{ marginLeft: "auto" }}>
							container
						</Col>
					</Row>
				</Container>

				{/* <div
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
				</p> */}
			</Layout>
		</div>
	);
}
