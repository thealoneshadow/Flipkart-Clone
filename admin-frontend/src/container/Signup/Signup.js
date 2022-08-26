/** @format */

import React from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";
function Signup(props) {
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "50px" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form>
							<Row>
								<Col md={{ span: 6 }}>
									<Input
										label="First Name"
										placeholder="First Name"
										type="text"
										value=""
										onChange={() => {}}
									/>
								</Col>
								<Col md={{ span: 6 }}>
									<Input
										label="Last Name"
										placeholder="Last Name"
										type="text"
										value=""
										onChange={() => {}}
									/>
								</Col>
							</Row>
							<Input
								label="Email address"
								placeholder="Email address"
								type="email"
								value=""
								onChange={() => {}}
							/>
							<Input
								label="Password"
								placeholder="Password"
								type="password"
								value=""
								onChange={() => {}}
							/>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}

export default Signup;
