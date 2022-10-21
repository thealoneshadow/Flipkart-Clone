/** @format */

import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";

function Signup(props) {
	const auth = useSelector((state) => state.auth);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//const [error, setError] = useState("");
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const userSignUp = (e) => {
		e.preventDefault();
		const user = { firstName, lastName, email, password };
		dispatch(signup(user));
	};
	if (auth.authenticate) {
		return <Navigate to="/" />;
	}
	if (user.loading) {
		return <div>Loading...</div>;
	}
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "50px" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userSignUp}>
							<Row>
								<Col md={{ span: 6 }}>
									<Input
										label="First Name"
										placeholder="First Name"
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</Col>
								<Col md={{ span: 6 }}>
									<Input
										label="Last Name"
										placeholder="Last Name"
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</Col>
							</Row>
							<Input
								label="Email address"
								placeholder="Email address"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								label="Password"
								placeholder="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button variant="primary" type="submit">
								Submits
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}

export default Signup;
