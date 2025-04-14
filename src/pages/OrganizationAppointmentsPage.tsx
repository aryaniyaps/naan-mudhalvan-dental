import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const OrganizationAppointmentsPage = () => {
	const [appointments, setAppointments] = useState([
		{ id: 1, name: "John Doe", date: "2025-04-15", time: "10:00 AM" },
		{ id: 2, name: "Jane Smith", date: "2025-04-16", time: "11:00 AM" },
	]);

	const [newAppointment, setNewAppointment] = useState({
		name: "",
		date: "",
		time: "",
	});

	const handleAddAppointment = () => {
		setAppointments([
			...appointments,
			{ id: appointments.length + 1, ...newAppointment },
		]);
		setNewAppointment({ name: "", date: "", time: "" });
	};

	return (
		<Container className="mt-5">
			<h2>Appointments</h2>
			<Table striped bordered hover className="mt-3">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Date</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment) => (
						<tr key={appointment.id}>
							<td>{appointment.id}</td>
							<td>{appointment.name}</td>
							<td>{appointment.date}</td>
							<td>{appointment.time}</td>
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

export default OrganizationAppointmentsPage;
