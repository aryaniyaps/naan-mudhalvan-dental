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

const SignupPage = () => {
	return (
		<Container fluid>
			<Row className="vh-100">
				<Col
					md={6}
					className="d-flex align-items-center justify-content-center"
				>
					<Card
						className="border-0 shadow-sm p-4"
						style={{ maxWidth: "500px", width: "100%" }}
					>
						<Card.Body className="p-4">
							<div className="text-center mb-4">
								<h2 className="fw-bold text-primary">Create Account</h2>
								<p className="text-muted">
									Join our dental management platform
								</p>
							</div>

							<Form>
								<Row>
									<Col md={6}>
										<Form.Group controlId="formFirstName" className="mb-3">
											<Form.Label className="fw-medium">First Name</Form.Label>
											<InputGroup>
												<InputGroup.Text className="bg-light border-end-0">
													<i className="bi bi-person text-muted"></i>
												</InputGroup.Text>
												<Form.Control
													type="text"
													placeholder="First name"
													className="bg-light border-start-0"
												/>
											</InputGroup>
										</Form.Group>
									</Col>
									<Col md={6}>
										<Form.Group controlId="formLastName" className="mb-3">
											<Form.Label className="fw-medium">Last Name</Form.Label>
											<Form.Control
												type="text"
												placeholder="Last name"
												className="bg-light"
											/>
										</Form.Group>
									</Col>
								</Row>

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
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>

								<Form.Group controlId="formBasicPhone" className="mb-3">
									<Form.Label className="fw-medium">Phone Number</Form.Label>
									<InputGroup>
										<InputGroup.Text className="bg-light border-end-0">
											<i className="bi bi-phone text-muted"></i>
										</InputGroup.Text>
										<Form.Control
											type="tel"
											placeholder="Enter your phone number"
											className="bg-light border-start-0"
										/>
									</InputGroup>
								</Form.Group>

								<Form.Group controlId="formBasicPassword" className="mb-3">
									<Form.Label className="fw-medium">Password</Form.Label>
									<InputGroup>
										<InputGroup.Text className="bg-light border-end-0">
											<i className="bi bi-lock text-muted"></i>
										</InputGroup.Text>
										<Form.Control
											type="password"
											placeholder="Create a password"
											className="bg-light border-start-0"
										/>
									</InputGroup>
									<Form.Text className="text-muted">
										Password must be at least 8 characters long.
									</Form.Text>
								</Form.Group>

								<Form.Group
									controlId="formBasicConfirmPassword"
									className="mb-4"
								>
									<Form.Label className="fw-medium">
										Confirm Password
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirm your password"
										className="bg-light"
									/>
								</Form.Group>

								<Form.Group className="mb-4">
									<Form.Check
										type="checkbox"
										label="I agree to the Terms of Service and Privacy Policy"
										id="terms-agreement"
									/>
								</Form.Group>

								<Button
									variant="primary"
									type="submit"
									className="w-100 py-2 mb-3 rounded-pill fw-medium"
								>
									Sign Up
								</Button>

								<div className="text-center">
									<p className="mb-0 text-muted">
										Already have an account?{" "}
										<Link
											to="/login"
											className="text-decoration-none fw-medium"
										>
											Sign in
										</Link>
									</p>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</Col>
				<Col
					md={6}
					className="d-none d-md-flex bg-primary align-items-center justify-content-center"
				>
					<div className="text-center text-white p-5">
						<div className="mb-4">
							<i className="bi bi-shield-plus fs-1"></i>
						</div>
						<h2 className="fw-bold mb-4">Trusted Dental Management</h2>
						<p className="lead mb-4">
							Join thousands of dental clinics using our platform to streamline
							their operations.
						</p>
						<div className="d-flex justify-content-center gap-4 mb-5">
							<div className="text-center">
								<h3 className="fw-bold">1000+</h3>
								<p>Dental Clinics</p>
							</div>
							<div className="text-center">
								<h3 className="fw-bold">50k+</h3>
								<p>Appointments</p>
							</div>
							<div className="text-center">
								<h3 className="fw-bold">98%</h3>
								<p>Satisfaction</p>
							</div>
						</div>
						<img
							src="https://placehold.co/600x300/eef/fff?text=Dental+Management"
							alt="Dental Management"
							className="img-fluid rounded shadow-sm"
							style={{ maxWidth: "80%" }}
						/>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default SignupPage;
