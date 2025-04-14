import {
	Button,
	Card,
	Col,
	Container,
	Form,
	InputGroup,
	Row,
} from "react-bootstrap";
import { Link } from "react-router";
import "../App.css";

const LoginPage = () => {
	return (
		<Container fluid>
			<Row className="vh-100">
				<Col
					md={6}
					className="d-none d-md-flex bg-primary align-items-center justify-content-center"
				>
					<div className="text-center text-white p-5">
						<div className="mb-4">
							<i className="bi bi-tooth fs-1"></i>
						</div>
						<h2 className="fw-bold mb-4">
							Welcome to Dental Management System
						</h2>
						<p className="lead mb-5">
							Manage your dental appointments and services with our easy-to-use
							platform.
						</p>
						<img
							src="https://placehold.co/600x400/eef/fff?text=Dental+Care"
							alt="Dental Care"
							className="img-fluid rounded shadow-sm"
							style={{ maxWidth: "80%" }}
						/>
					</div>
				</Col>
				<Col
					md={6}
					className="d-flex align-items-center justify-content-center"
				>
					<Card
						className="border-0 shadow-sm p-4"
						style={{ maxWidth: "450px", width: "100%" }}
					>
						<Card.Body className="p-4">
							<div className="text-center mb-4">
								<h2 className="fw-bold text-primary">Sign In</h2>
								<p className="text-muted">
									Access your dental management account
								</p>
							</div>

							<Form>
								<Form.Group controlId="formBasicEmail" className="mb-3">
									<Form.Label className="fw-medium">Email address</Form.Label>
									<InputGroup>
										<InputGroup.Text className="bg-light border-end-0">
											<i className="bi bi-envelope text-muted"></i>
										</InputGroup.Text>
										<Form.Control
											type="email"
											placeholder="Enter your email"
											className="bg-light border-start-0"
										/>
									</InputGroup>
								</Form.Group>

								<Form.Group controlId="formBasicPassword" className="mb-4">
									<div className="d-flex justify-content-between">
										<Form.Label className="fw-medium">Password</Form.Label>
										<Link
											to="/forgot-password"
											className="text-decoration-none small"
										>
											Forgot password?
										</Link>
									</div>
									<InputGroup>
										<InputGroup.Text className="bg-light border-end-0">
											<i className="bi bi-lock text-muted"></i>
										</InputGroup.Text>
										<Form.Control
											type="password"
											placeholder="Enter your password"
											className="bg-light border-start-0"
										/>
									</InputGroup>
								</Form.Group>

								<Form.Group className="mb-4">
									<Form.Check
										type="checkbox"
										label="Remember me"
										id="remember-me"
									/>
								</Form.Group>

								<Button
									variant="primary"
									type="submit"
									className="w-100 py-2 mb-3 rounded-pill fw-medium"
								>
									Sign In
								</Button>

								<div className="text-center">
									<p className="mb-0 text-muted">
										Don't have an account?{" "}
										<Link
											to="/signup"
											className="text-decoration-none fw-medium"
										>
											Sign up
										</Link>
									</p>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginPage;
