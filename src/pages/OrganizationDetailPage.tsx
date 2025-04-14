import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
import { useParams } from "react-router";

// Define types for our data
interface Appointment {
	id: number;
	name: string;
	date: string;
	time: string;
}

interface Organization {
	id: string;
	name: string;
	address: string;
	contact: string;
	description: string;
}

const OrganizationDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const [organization, setOrganization] = useState<Organization | null>(null);
	const [loading, setLoading] = useState(true);

	// Appointment state management
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [newAppointment, setNewAppointment] = useState({
		name: "",
		date: "",
		time: "",
	});

	// Fetch organization data
	useEffect(() => {
		// In a real app, this would be an API call
		// For now, simulate fetching data
		const fetchData = () => {
			setLoading(true);

			// Simulate API delay
			setTimeout(() => {
				// Mock data - in a real app this would come from an API
				const mockOrg: Organization = {
					id: id || "1",
					name: `Dental Clinic ${id}`,
					address: "123 Dental Street, Smile City",
					contact: "+1 234 567 890",
					description:
						"A state-of-the-art dental facility providing comprehensive dental care services.",
				};

				const mockAppointments: Appointment[] = [
					{ id: 1, name: "John Doe", date: "2025-04-15", time: "10:00 AM" },
					{ id: 2, name: "Jane Smith", date: "2025-04-16", time: "11:00 AM" },
				];

				setOrganization(mockOrg);
				setAppointments(mockAppointments);
				setLoading(false);
			}, 500);
		};

		fetchData();
	}, [id]);

	// Appointment management functions
	const handleAddAppointment = () => {
		if (!newAppointment.name || !newAppointment.date || !newAppointment.time) {
			alert("Please fill all appointment fields");
			return;
		}

		const newId =
			appointments.length > 0
				? Math.max(...appointments.map((a) => a.id)) + 1
				: 1;

		setAppointments([...appointments, { id: newId, ...newAppointment }]);
		setNewAppointment({ name: "", date: "", time: "" });
	};

	const handleDeleteAppointment = (id: number) => {
		setAppointments(
			appointments.filter((appointment) => appointment.id !== id),
		);
	};

	if (loading) {
		return (
			<Container className="mt-5">
				<p>Loading organization details...</p>
			</Container>
		);
	}

	if (!organization) {
		return (
			<Container className="mt-5">
				<p>Organization not found</p>
			</Container>
		);
	}

	return (
		<Container className="mt-5">
			<h2>Organization Details</h2>
			<Card className="mt-3">
				<Card.Body>
					<Card.Title>{organization.name}</Card.Title>
					<Card.Text>
						Address: {organization.address}
						<br />
						Contact: {organization.contact}
						<br />
						<br />
						{organization.description}
					</Card.Text>
				</Card.Body>
			</Card>

			<h3 className="mt-5">Appointments</h3>
			<Table striped bordered hover className="mt-3">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Date</th>
						<th>Time</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment) => (
						<tr key={appointment.id}>
							<td>{appointment.id}</td>
							<td>{appointment.name}</td>
							<td>{appointment.date}</td>
							<td>{appointment.time}</td>
							<td>
								<Button
									variant="danger"
									size="sm"
									onClick={() => handleDeleteAppointment(appointment.id)}
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<h3 className="mt-5">Add New Appointment</h3>
			<Form className="mt-3">
				<Form.Group controlId="formName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						value={newAppointment.name}
						onChange={(e) =>
							setNewAppointment({ ...newAppointment, name: e.target.value })
						}
					/>
				</Form.Group>

				<Form.Group controlId="formDate" className="mt-3">
					<Form.Label>Date</Form.Label>
					<Form.Control
						type="date"
						value={newAppointment.date}
						onChange={(e) =>
							setNewAppointment({ ...newAppointment, date: e.target.value })
						}
					/>
				</Form.Group>

				<Form.Group controlId="formTime" className="mt-3">
					<Form.Label>Time</Form.Label>
					<Form.Control
						type="time"
						value={newAppointment.time}
						onChange={(e) =>
							setNewAppointment({ ...newAppointment, time: e.target.value })
						}
					/>
				</Form.Group>

				<Button
					variant="primary"
					className="mt-3"
					onClick={handleAddAppointment}
				>
					Add Appointment
				</Button>
			</Form>
		</Container>
	);
};

export default OrganizationDetailPage;
