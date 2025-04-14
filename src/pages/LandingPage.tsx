import {
	Badge,
	Button,
	Card,
	Col,
	Container,
	Nav,
	Navbar,
	Row,
} from "react-bootstrap";
import { Link } from "react-router";
import "../App.css";

const LandingPage = () => {
	const organizations = [
		{
			id: 1,
			name: "Dental Clinic XYZ",
			address: "123 Dental Street, Smile City",
			rating: 4.8,
			services: ["General Dentistry", "Orthodontics"],
		},
		{
			id: 2,
			name: "Happy Teeth Dental",
			address: "456 Bright Avenue, Tooth Town",
			rating: 4.5,
			services: ["Pediatric Dentistry", "Cosmetic Dentistry"],
		},
		{
			id: 3,
			name: "Smile Care Center",
			address: "789 Grin Road, Molar City",
			rating: 4.7,
			services: ["Implants", "Oral Surgery"],
		},
	];

	return (
		<>
			<Navbar bg="white" expand="lg" className="shadow-sm mb-4 py-3">
				<Container>
					<Navbar.Brand href="/" className="fw-bold text-primary">
						<i className="bi bi-tooth me-2"></i>
						Dental Management System
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse
						id="basic-navbar-nav"
						className="justify-content-end"
					>
						<Nav>
							<Nav.Link as={Link} to="/" className="mx-2 fw-medium">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/login" className="mx-2 fw-medium">
								Login
							</Nav.Link>
							<Nav.Link as={Link} to="/signup" className="mx-2">
								<Button
									variant="primary"
									size="sm"
									className="rounded-pill px-4"
								>
									Sign Up
								</Button>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<div className="bg-primary text-white py-5 mb-5">
				<Container className="text-center">
					<h1 className="display-4 fw-bold mb-3">
						Welcome to the Dental Management System
					</h1>
					<p className="lead fs-4 mb-4 w-75 mx-auto">
						Your one-stop solution for managing dental appointments and services
					</p>
					<Button
						variant="light"
						className="rounded-pill px-4 py-2 shadow-sm me-3"
					>
						Learn More
					</Button>
					<Button variant="outline-light" className="rounded-pill px-4 py-2">
						Contact Us
					</Button>
				</Container>
			</div>

			<Container>
				<Row className="mb-5">
					<Col lg={6} className="mb-4 mb-lg-0">
						<h2 className="fw-bold mb-4">Find the Right Dental Clinic</h2>
						<p className="lead text-muted mb-4">
							Select an organization from our curated list to view details and
							manage appointments with ease.
						</p>
						<div className="d-flex gap-3 mb-4">
							<div className="d-flex align-items-center">
								<div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
									<i className="bi bi-calendar-check fs-4 text-primary"></i>
								</div>
								<div>
									<h5 className="fw-bold">Easy Booking</h5>
									<p className="mb-0 text-muted">
										Schedule appointments online
									</p>
								</div>
							</div>
						</div>
					</Col>
					<Col lg={6}>
						<img
							src="https://placehold.co/600x400/eef/fff?text=Dental+Care"
							alt="Dental Care"
							className="img-fluid rounded shadow-sm"
						/>
					</Col>
				</Row>

				<h3 className="fw-bold mb-4 text-center">
					Featured Dental Organizations
				</h3>
				<Row className="g-4">
					{organizations.map((org) => (
						<Col key={org.id} md={4}>
							<Card className="shadow-sm h-100 border-0 hover-card">
								<div className="bg-light text-primary text-center py-4">
									<i className="bi bi-hospital fs-1"></i>
								</div>
								<Card.Body className="d-flex flex-column">
									<div className="d-flex justify-content-between align-items-center mb-2">
										<Card.Title className="fw-bold mb-0">{org.name}</Card.Title>
										<Badge bg="primary" pill className="px-2">
											{org.rating}{" "}
											<i className="bi bi-star-fill ms-1 small"></i>
										</Badge>
									</div>
									<Card.Text className="text-muted">
										<i className="bi bi-geo-alt me-1"></i> {org.address}
									</Card.Text>
									<div className="mb-3">
										{org.services.map((service, index) => (
											<Badge
												key={index}
												bg="light"
												text="dark"
												className="me-2 mb-2"
											>
												{service}
											</Badge>
										))}
									</div>
									<Link to={`/organization/${org.id}`} className="mt-auto">
										<Button
											variant="outline-primary"
											className="w-100 rounded-pill"
										>
											View Details <i className="bi bi-arrow-right ms-1"></i>
										</Button>
									</Link>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>

				<div className="text-center mt-5 pt-4">
					<Button
						variant="primary"
						size="lg"
						className="rounded-pill px-5 py-2"
					>
						View All Organizations
					</Button>
				</div>

				<hr className="my-5" />

				<footer className="py-4 text-center text-muted">
					<p>© 2025 Dental Management System. All rights reserved.</p>
				</footer>
			</Container>
		</>
	);
};

export default LandingPage;
