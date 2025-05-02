import { useEffect, useState } from "react";
import { useParams } from "react-router";

// Define types for our data
interface Appointment {
	id: number;
	patientName: string;
	date: string;
	time: string;
	purpose: string;
	status: "scheduled" | "completed" | "cancelled";
}

interface Patient {
	id: number;
	name: string;
	age: number;
	gender: "male" | "female" | "other";
	contact: string;
	complaint: string;
	medicalHistory: string;
	lastVisit?: string;
}

interface Treatment {
	id: number;
	patientName: string;
	patientId: number;
	treatmentType: string;
	assignedDentist?: string;
	status: "planned" | "in-progress" | "completed" | "cancelled";
	startDate: string;
	endDate?: string;
	notes: string;
}

interface DentalClinic {
	id: string;
	name: string;
	address: string;
	contact: string;
	description: string;
	services?: string[];
}

const DentalClinicDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const [clinic, setClinic] = useState<DentalClinic | null>(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<"patients" | "appointments" | "treatments">("patients");

	// Patient state management
	const [patients, setPatients] = useState<Patient[]>([]);
	const [newPatient, setNewPatient] = useState({
		name: "",
		age: "",
		gender: "",
		contact: "",
		complaint: "",
		medicalHistory: "",
	});
	const [showNewPatientForm, setShowNewPatientForm] = useState(false);

	// Appointment state management
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [newAppointment, setNewAppointment] = useState({
		patientName: "",
		date: "",
		time: "",
		purpose: "",
	});
	const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
	
	// Treatment state management
	const [treatments, setTreatments] = useState<Treatment[]>([]);
	const [newTreatment, setNewTreatment] = useState({
		patientName: "",
		patientId: "",
		treatmentType: "",
		assignedDentist: "",
		status: "planned",
		startDate: "",
		endDate: "",
		notes: "",
	});
	const [showNewTreatmentForm, setShowNewTreatmentForm] = useState(false);
	const [filterPatient, setFilterPatient] = useState<string>("");
	const [filterStatus, setFilterStatus] = useState<string>("");
	
	// Edit clinic state management
	const [showEditClinicForm, setShowEditClinicForm] = useState(false);
	const [editedClinic, setEditedClinic] = useState<DentalClinic | null>(null);

	// Fetch dental clinic data
	useEffect(() => {
		// In a real app, this would be an API call
		// For now, simulate fetching data
		const fetchData = () => {
			setLoading(true);

			// Simulate API delay
			setTimeout(() => {
				// Check if we can get the dental clinic from localStorage first
				const storedClinics = localStorage.getItem('dental_clinics');
				
				if (storedClinics) {
					const clinics = JSON.parse(storedClinics);
					const foundClinic = clinics.find((c: { id: number | string }) => c.id.toString() === id);
					
					if (foundClinic) {
						// Convert found clinic to match our interface
						setClinic({
							id: foundClinic.id.toString(),
							name: foundClinic.name,
							address: foundClinic.address,
							contact: foundClinic.contact || "+1 234 567 890", // Default contact if not available
							description: foundClinic.description || "A state-of-the-art dental facility providing comprehensive dental care services.",
							services: foundClinic.services || [],
						});
						
						// Fetch clinic-specific patients from localStorage
						const storedPatients = localStorage.getItem(`clinic_${id}_patients`);
						if (storedPatients) {
							setPatients(JSON.parse(storedPatients));
						}
						
						// Fetch clinic-specific appointments from localStorage
						const storedAppointments = localStorage.getItem(`clinic_${id}_appointments`);
						if (storedAppointments) {
							setAppointments(JSON.parse(storedAppointments));
						}
						
						setLoading(false);
						return;
					}
				}
				
				// If not found in localStorage, use mock data
				const mockClinic: DentalClinic = {
					id: id || "1",
					name: `Dental Clinic ${id}`,
					address: "123 Dental Street, Smile City",
					contact: "+1 234 567 890",
					description:
						"A state-of-the-art dental facility providing comprehensive dental care services.",
					services: ["General Dentistry", "Orthodontics", "Dental Implants"],
				};

				const mockPatients: Patient[] = [
					{ 
						id: 1, 
						name: "John Doe", 
						age: 35,
						gender: "male",
						contact: "123-456-7890",
						complaint: "Tooth sensitivity to cold",
						medicalHistory: "No significant medical history",
						lastVisit: "2025-04-01"
					},
					{ 
						id: 2, 
						name: "Jane Smith", 
						age: 42,
						gender: "female",
						contact: "098-765-4321",
						complaint: "Bleeding gums",
						medicalHistory: "Hypertension, taking amlodipine",
						lastVisit: "2025-03-15"
					},
				];

				const mockAppointments: Appointment[] = [
					{ 
						id: 1, 
						patientName: "John Doe", 
						date: "2025-05-15", 
						time: "10:00", 
						purpose: "Regular check-up",
						status: "scheduled"
					},
					{ 
						id: 2, 
						patientName: "Jane Smith", 
						date: "2025-05-16", 
						time: "11:00", 
						purpose: "Root canal treatment",
						status: "scheduled" 
					},
				];

				const mockTreatments: Treatment[] = [
					{
						id: 1,
						patientName: "John Doe",
						patientId: 1,
						treatmentType: "Root Canal",
						assignedDentist: "Dr. Sarah Wilson",
						status: "in-progress",
						startDate: "2025-04-28",
						endDate: "2025-05-20",
						notes: "Upper right molar, significant decay."
					},
					{
						id: 2,
						patientName: "Jane Smith",
						patientId: 2,
						treatmentType: "Scaling",
						assignedDentist: "Dr. Michael Chen",
						status: "planned",
						startDate: "2025-05-16",
						notes: "Complete cleaning needed due to plaque buildup."
					}
				];

				setClinic(mockClinic);
				setPatients(mockPatients);
				setAppointments(mockAppointments);
				setTreatments(mockTreatments);
				
				// Store mock data in localStorage for the specific clinic
				if (id) {
					localStorage.setItem(`clinic_${id}_patients`, JSON.stringify(mockPatients));
					localStorage.setItem(`clinic_${id}_appointments`, JSON.stringify(mockAppointments));
					localStorage.setItem(`clinic_${id}_treatments`, JSON.stringify(mockTreatments));
				}
				
				setLoading(false);
			}, 500);
		};

		fetchData();
	}, [id]);

	// Patient management functions
	const handleAddPatient = () => {
		if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.complaint) {
			alert("Please fill all required fields");
			return;
		}

		const newId =
			patients.length > 0
				? Math.max(...patients.map((p) => p.id)) + 1
				: 1;

		const updatedPatients = [...patients, { 
			id: newId, 
			name: newPatient.name,
			age: parseInt(newPatient.age),
			gender: newPatient.gender as "male" | "female" | "other",
			contact: newPatient.contact,
			complaint: newPatient.complaint,
			medicalHistory: newPatient.medicalHistory,
			lastVisit: new Date().toISOString().split('T')[0]
		 }];

		setPatients(updatedPatients);
		localStorage.setItem(`clinic_${id}_patients`, JSON.stringify(updatedPatients));
		
		setNewPatient({
			name: "",
			age: "",
			gender: "",
			contact: "",
			complaint: "",
			medicalHistory: "",
		});
		setShowNewPatientForm(false);
	};

	// Clinic update function
	const handleUpdateClinic = () => {
		if (!editedClinic) return;

		// Update clinic details
		setClinic(editedClinic);

		// Update in localStorage
		const storedClinics = localStorage.getItem('dental_clinics');
		
		if (storedClinics && id) {
			const clinics = JSON.parse(storedClinics);
			const updatedClinics = clinics.map((c: any) => 
				c.id.toString() === id ? { 
					...c, 
					name: editedClinic.name,
					address: editedClinic.address,
					contact: editedClinic.contact,
					description: editedClinic.description,
					services: editedClinic.services
				} : c
			);
			localStorage.setItem('dental_clinics', JSON.stringify(updatedClinics));
		}

		// Close the modal
		setShowEditClinicForm(false);
	};

	// Appointment management functions
	const handleAddAppointment = () => {
		if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time || !newAppointment.purpose) {
			alert("Please fill all appointment fields");
			return;
		}

		const newId =
			appointments.length > 0
				? Math.max(...appointments.map((a) => a.id)) + 1
				: 1;

		const updatedAppointments = [
			...appointments, 
			{ 
				id: newId, 
				patientName: newAppointment.patientName,
				date: newAppointment.date,
				time: newAppointment.time,
				purpose: newAppointment.purpose,
				status: "scheduled" as "scheduled" | "completed" | "cancelled"
			}
		];

		setAppointments(updatedAppointments);
		localStorage.setItem(`clinic_${id}_appointments`, JSON.stringify(updatedAppointments));
		
		setNewAppointment({
			patientName: "",
			date: "",
			time: "",
			purpose: "",
		});
		setShowNewAppointmentForm(false);
	};

	const handleDeleteAppointment = (id: number) => {
		const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
		setAppointments(updatedAppointments);
		localStorage.setItem(`clinic_${id}_appointments`, JSON.stringify(updatedAppointments));
	};

	// Treatment management functions
	const handleAddTreatment = () => {
		if (!newTreatment.patientName || !newTreatment.treatmentType || !newTreatment.startDate || !newTreatment.status) {
			alert("Please fill all required fields");
			return;
		}

		const patientId = patients.find(p => p.name === newTreatment.patientName)?.id || 0;
		
		const newId = treatments.length > 0
			? Math.max(...treatments.map((t) => t.id)) + 1
			: 1;

		const updatedTreatments = [
			...treatments,
			{
				id: newId,
				patientName: newTreatment.patientName,
				patientId: parseInt(newTreatment.patientId) || patientId,
				treatmentType: newTreatment.treatmentType,
				assignedDentist: newTreatment.assignedDentist,
				status: newTreatment.status as "planned" | "in-progress" | "completed" | "cancelled",
				startDate: newTreatment.startDate,
				endDate: newTreatment.endDate || undefined,
				notes: newTreatment.notes
			}
		];

		setTreatments(updatedTreatments);
		localStorage.setItem(`clinic_${id}_treatments`, JSON.stringify(updatedTreatments));

		// Reset form and close modal
		setNewTreatment({
			patientName: "",
			patientId: "",
			treatmentType: "",
			assignedDentist: "",
			status: "planned",
			startDate: "",
			endDate: "",
			notes: "",
		});
		setShowNewTreatmentForm(false);
	};

	const handleDeleteTreatment = (treatmentId: number) => {
		const updatedTreatments = treatments.filter(treatment => treatment.id !== treatmentId);
		setTreatments(updatedTreatments);
		localStorage.setItem(`clinic_${id}_treatments`, JSON.stringify(updatedTreatments));
	};
	
	// Apply filters to treatments
	const getFilteredTreatments = () => {
		let filtered = [...treatments];
		
		if (filterPatient) {
			filtered = filtered.filter(treatment => 
				treatment.patientName.toLowerCase().includes(filterPatient.toLowerCase()));
		}
		
		if (filterStatus) {
			filtered = filtered.filter(treatment => treatment.status === filterStatus);
		}
		
		return filtered;
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 py-8 w-full flex items-center justify-center">
				loading...
			</div>
		);
	}

	if (!clinic) {
		return (
			<div className="min-h-screen bg-gray-50 py-8">
				<div className="max-w-6xl mx-auto px-4">
					<div className="bg-white rounded-lg shadow-md p-6">
						<p className="text-red-500 font-medium">Dental clinic not found</p>
						<a href="/" className="mt-4 inline-block text-blue-600 hover:underline">
							Return to Dashboard
						</a>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 pb-10">
			{/* Header */}
			<div className="bg-white shadow">
				<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex items-center space-x-2">
						<a href="/" className="text-gray-500 hover:text-gray-700">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
							</svg>
						</a>
						<h1 className="text-xl font-bold text-gray-900 truncate">
							{clinic.name}
						</h1>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
				{/* Clinic Details Card */}
				<div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
					<div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex justify-between items-center">
						<h2 className="text-xl font-bold text-white">Clinic Information</h2>
						<button
							onClick={() => {
								setEditedClinic(clinic);
								setShowEditClinicForm(true);
							}}
							className="px-3 py-1 bg-white text-blue-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white flex items-center text-sm"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
								<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
							</svg>
							Edit
						</button>
					</div>
					<div className="p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
								<p className="text-gray-600 mb-1">
									<span className="font-medium text-gray-700">Address:</span> {clinic.address}
								</p>
								<p className="text-gray-600 mb-1">
									<span className="font-medium text-gray-700">Contact:</span> {clinic.contact}
								</p>
								<p className="text-gray-600">
									{clinic.description}
								</p>
							</div>
							<div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">Services</h3>
								<div className="flex flex-wrap gap-2">
									{clinic.services?.map((service, index) => (
										<span 
											key={index} 
											className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
										>
											{service}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs */}
				<div className="border-b border-gray-200 mb-6">
					<nav className="-mb-px flex space-x-8">
						<button
							onClick={() => setActiveTab("patients")}
							className={`py-4 px-1 border-b-2 font-medium text-sm ${
								activeTab === "patients"
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							Patients
						</button>
						<button
							onClick={() => setActiveTab("appointments")}
							className={`py-4 px-1 border-b-2 font-medium text-sm ${
								activeTab === "appointments"
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							Appointments
						</button>
						<button
							onClick={() => setActiveTab("treatments")}
							className={`py-4 px-1 border-b-2 font-medium text-sm ${
								activeTab === "treatments"
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							Treatments
						</button>
					</nav>
				</div>

				{/* Patients Tab Content */}
				{activeTab === "patients" && (
					<>
					<div>
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-bold text-gray-900">Patient Records</h2>
							<button
								onClick={() => setShowNewPatientForm(true)}
								className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
								</svg>
								Add New Patient
							</button>
						</div>
						
						{/* Patient List */}
						{patients.length > 0 ? (
							<div className="bg-white shadow overflow-hidden rounded-md">
								<ul className="divide-y divide-gray-200">
									{patients.map((patient) => (
										<li key={patient.id} className="px-6 py-4 hover:bg-gray-50">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<h3 className="text-lg font-medium text-blue-600">{patient.name}</h3>
													<div className="mt-1 text-sm text-gray-500 flex items-center">
														<span className="mr-6">Age: {patient.age}</span>
														<span>Gender: {patient.gender}</span>
													</div>
													<p className="mt-2 text-sm text-gray-900">
														<span className="font-medium">Contact:</span> {patient.contact}
													</p>
												</div>
												<div>
													<div className="mb-2">
														<p className="text-sm font-medium text-gray-500">Chief Complaint:</p>
														<p className="text-sm text-gray-900">{patient.complaint}</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">Medical History:</p>
														<p className="text-sm text-gray-900">{patient.medicalHistory || "None"}</p>
													</div>
													{patient.lastVisit && (
														<p className="mt-2 text-xs text-gray-500">
															Last visit: {patient.lastVisit}
														</p>
													)}
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						) : (
							<div className="bg-white rounded-lg shadow-sm p-6 text-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								<p className="text-gray-600 mb-4">No patient records found for this clinic.</p>
							</div>
						)}
						
						{/* Add New Patient Form */}
						{showNewPatientForm && (
							<div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-40">
								<div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-screen overflow-y-auto">
									<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
										<h3 className="text-lg font-medium text-gray-900">Add New Patient</h3>
										<button 
											onClick={() => setShowNewPatientForm(false)}
											className="text-gray-400 hover:text-gray-500 focus:outline-none"
										>
											<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
									<div className="p-6">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
											<div>
												<label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-1">
													Name *
												</label>
												<input
													type="text"
													id="patient-name"
													className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
													value={newPatient.name}
													onChange={(e) =>
														setNewPatient({ ...newPatient, name: e.target.value })
													}
													required
												/>
											</div>
											<div>
												<label htmlFor="patient-age" className="block text-sm font-medium text-gray-700 mb-1">
													Age *
												</label>
												<input
													type="number"
													id="patient-age"
													className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
													value={newPatient.age}
													onChange={(e) =>
														setNewPatient({ ...newPatient, age: e.target.value })
													}
													required
												/>
											</div>
										</div>
										
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
											<div>
												<label htmlFor="patient-gender" className="block text-sm font-medium text-gray-700 mb-1">
													Gender *
												</label>
												<select
													id="patient-gender"
													className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
													value={newPatient.gender}
													onChange={(e) =>
														setNewPatient({ ...newPatient, gender: e.target.value })
													}
													required
												>
													<option value="">Select gender</option>
													<option value="male">Male</option>
													<option value="female">Female</option>
													<option value="other">Other</option>
												</select>
											</div>
											<div>
												<label htmlFor="patient-contact" className="block text-sm font-medium text-gray-700 mb-1">
													Contact
												</label>
												<input
													type="text"
													id="patient-contact"
													className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
													value={newPatient.contact}
													onChange={(e) =>
														setNewPatient({ ...newPatient, contact: e.target.value })
													}
												/>
											</div>
										</div>
										
										<div className="mb-4">
											<label htmlFor="patient-complaint" className="block text-sm font-medium text-gray-700 mb-1">
												Chief Complaint *
											</label>
											<input
												type="text"
												id="patient-complaint"
												className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
												value={newPatient.complaint}
												onChange={(e) =>
													setNewPatient({ ...newPatient, complaint: e.target.value })
												}
												required
											/>
										</div>
										
										<div className="mb-6">
											<label htmlFor="patient-history" className="block text-sm font-medium text-gray-700 mb-1">
												Medical History
											</label>
											<textarea
												id="patient-history"
												rows={3}
												className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
												value={newPatient.medicalHistory}
												onChange={(e) =>
													setNewPatient({ ...newPatient, medicalHistory: e.target.value })
												}
											></textarea>
										</div>
										
										<div className="flex justify-end">
											<button
												type="button"
												onClick={() => setShowNewPatientForm(false)}
												className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
											>
												Cancel
											</button>
											<button
												type="button"
												onClick={handleAddPatient}
												className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
											>
												Add Patient
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					</>
				)}

				{/* Appointments Tab Content */}
				{activeTab === "appointments" && (
					<div>
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
							<button
								onClick={() => setShowNewAppointmentForm(true)}
								className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
								</svg>
								Schedule New Appointment
							</button>
						</div>
						
						{/* Appointments List */}
						{appointments.length > 0 ? (
							<div className="overflow-x-auto">
								<table className="min-w-full bg-white rounded-lg overflow-hidden">
									<thead className="bg-gray-100">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{appointments.map((appointment) => (
											<tr key={appointment.id} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.patientName}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.purpose}</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
														appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' : 
														appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
														'bg-red-100 text-red-800'
													}`}>
														{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													<button
														onClick={() => handleDeleteAppointment(appointment.id)}
														className="text-red-600 hover:text-red-900 focus:outline-none"
													>
														<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
															<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
														</svg>
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div className="bg-white rounded-lg shadow-sm p-6 text-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<p className="text-gray-600 mb-4">No appointments scheduled for this clinic.</p>
							</div>
						)}
						
						{/* Add New Appointment Form */}
						{showNewAppointmentForm && (
							<div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-40">
								<div className="bg-white rounded-lg shadow-xl max-w-md w-full">
									<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
										<h3 className="text-lg font-medium text-gray-900">Schedule New Appointment</h3>
										<button 
											onClick={() => setShowNewAppointmentForm(false)}
											className="text-gray-400 hover:text-gray-500 focus:outline-none"
										>
											<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
									<div className="p-6">
										<div className="mb-4">
											<label htmlFor="appointment-patient" className="block text-sm font-medium text-gray-700 mb-1">
												Patient Name *
											</label>
											<input
												type="text"
												id="appointment-patient"
												className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
												value={newAppointment.patientName}
												onChange={(e) =>
													setNewAppointment({ ...newAppointment, patientName: e.target.value })
												}
												required
												list="patient-list"
											/>
											<datalist id="patient-list">
												{patients.map(patient => (
													<option key={patient.id} value={patient.name} />
												))}
											</datalist>
										</div>
										
										<div className="mb-4">
											<label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-1">
												Date *
											</label>
											<input
												type="date"
												id="appointment-date"
												className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
												value={newAppointment.date}
												onChange={(e) =>
													setNewAppointment({ ...newAppointment, date: e.target.value })
												}
												required
											/>
										</div>
										
										<div className="mb-4">
											<label htmlFor="appointment-time" className="block text-sm font-medium text-gray-700 mb-1">
												Time *
											</label>
											<input
												type="time"
												id="appointment-time"
												className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
												value={newAppointment.time}
												onChange={(e) =>
													setNewAppointment({ ...newAppointment, time: e.target.value })
												}
												required
											/>
										</div>
										
										<div className="mb-6">
											<label htmlFor="appointment-purpose" className="block text-sm font-medium text-gray-700 mb-1">
												Purpose *
											</label>
											<input
												type="text"
												id="appointment-purpose"
												className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
												value={newAppointment.purpose}
												onChange={(e) =>
													setNewAppointment({ ...newAppointment, purpose: e.target.value })
												}
												placeholder="e.g., Regular check-up, Root canal, etc."
												required
											/>
										</div>
										
										<div className="flex justify-end">
											<button
												type="button"
												onClick={() => setShowNewAppointmentForm(false)}
												className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
											>
												Cancel
											</button>
											<button
												type="button"
												onClick={handleAddAppointment}
												className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
											>
												Schedule Appointment
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}

				{/* Edit Clinic Modal */}
				{showEditClinicForm && editedClinic && (
					<div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-40">
						<div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
							<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
								<h3 className="text-lg font-medium text-gray-900">Edit Clinic Details</h3>
								<button 
									onClick={() => setShowEditClinicForm(false)}
									className="text-gray-400 hover:text-gray-500 focus:outline-none"
								>
									<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="p-6">
								<div className="mb-4">
									<label htmlFor="clinic-name" className="block text-sm font-medium text-gray-700 mb-1">
										Clinic Name *
									</label>
									<input
										type="text"
										id="clinic-name"
										className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										value={editedClinic.name}
										onChange={(e) =>
											setEditedClinic({ ...editedClinic, name: e.target.value })
										}
										required
									/>
								</div>
								
								<div className="mb-4">
									<label htmlFor="clinic-address" className="block text-sm font-medium text-gray-700 mb-1">
										Address *
									</label>
									<input
										type="text"
										id="clinic-address"
										className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										value={editedClinic.address}
										onChange={(e) =>
											setEditedClinic({ ...editedClinic, address: e.target.value })
										}
										required
									/>
								</div>
								
								<div className="mb-4">
									<label htmlFor="clinic-contact" className="block text-sm font-medium text-gray-700 mb-1">
										Contact *
									</label>
									<input
										type="text"
										id="clinic-contact"
										className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										value={editedClinic.contact}
										onChange={(e) =>
											setEditedClinic({ ...editedClinic, contact: e.target.value })
										}
										required
									/>
								</div>
								
								<div className="mb-4">
									<label htmlFor="clinic-description" className="block text-sm font-medium text-gray-700 mb-1">
										Description
									</label>
									<textarea
										id="clinic-description"
										rows={3}
										className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										value={editedClinic.description}
										onChange={(e) =>
											setEditedClinic({ ...editedClinic, description: e.target.value })
										}
									></textarea>
								</div>
								
								<div className="mb-6">
									<label htmlFor="clinic-services" className="block text-sm font-medium text-gray-700 mb-1">
										Services (comma separated)
									</label>
									<input
										type="text"
										id="clinic-services"
										className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										value={editedClinic.services?.join(', ')}
										onChange={(e) => {
											const servicesArray = e.target.value
												.split(',')
												.map(service => service.trim())
												.filter(service => service.length > 0);
											setEditedClinic({ ...editedClinic, services: servicesArray });
										}}
										placeholder="General Dentistry, Orthodontics, etc."
									/>
								</div>
								
								<div className="flex justify-end">
									<button
										type="button"
										onClick={() => setShowEditClinicForm(false)}
										className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
									>
										Cancel
									</button>
									<button
										type="button"
										onClick={handleUpdateClinic}
										className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Treatments Tab Content */}
				{activeTab === "treatments" && (
					<div>
						<div className="flex flex-wrap justify-between items-center mb-6">
							<h2 className="text-xl font-bold text-gray-900">Treatment Plans</h2>
							<button
								onClick={() => setShowNewTreatmentForm(true)}
								className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
								</svg>
								Create New Treatment
							</button>
						</div>
						
						{/* Treatment Filters */}
						<div className="bg-white p-4 rounded-md shadow mb-6">
							<h3 className="font-medium text-gray-700 mb-3">Filter Treatments</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label htmlFor="filter-patient" className="block text-sm font-medium text-gray-700 mb-1">
										Patient
									</label>
									<input
										type="text"
										id="filter-patient"
										className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										value={filterPatient}
										onChange={(e) => setFilterPatient(e.target.value)}
										placeholder="Filter by patient name"
									/>
								</div>
								<div>
									<label htmlFor="filter-status" className="block text-sm font-medium text-gray-700 mb-1">
										Status
									</label>
									<select
										id="filter-status"
										className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										value={filterStatus}
										onChange={(e) => setFilterStatus(e.target.value)}
									>
										<option value="">All statuses</option>
										<option value="planned">Planned</option>
										<option value="in-progress">In Progress</option>
										<option value="completed">Completed</option>
										<option value="cancelled">Cancelled</option>
									</select>
								</div>
							</div>
						</div>
						
						{/* Treatments List */}
						{treatments.length > 0 ? (
							getFilteredTreatments().length > 0 ? (
								<div className="overflow-x-auto">
									<table className="min-w-full bg-white rounded-lg overflow-hidden">
										<thead className="bg-gray-100">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment Type</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dentist</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200">
											{getFilteredTreatments().map((treatment) => (
												<tr key={treatment.id} className="hover:bg-gray-50">
													<td className="px-6 py-4 whitespace-nowrap">
														<div>
															<div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
																{treatment.patientName}
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{treatment.treatmentType}</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{treatment.assignedDentist || "—"}</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
															treatment.status === 'planned' ? 'bg-yellow-100 text-yellow-800' : 
															treatment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
															treatment.status === 'completed' ? 'bg-green-100 text-green-800' : 
															'bg-red-100 text-red-800'
														}`}>
															{treatment.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
														</span>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div>
															<div>Start: {treatment.startDate}</div>
															{treatment.endDate && <div>End: {treatment.endDate}</div>}
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div className="flex space-x-2">
															<button
																onClick={() => handleDeleteTreatment(treatment.id)}
																className="text-red-600 hover:text-red-900 focus:outline-none"
															>
																<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
																	<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
																</svg>
															</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className="bg-white rounded-lg shadow-sm p-6 text-center">
									<p className="text-gray-600 mb-4">No treatments match the selected filters.</p>
								</div>
							)
						) : (
							<div className="bg-white rounded-lg shadow-sm p-6 text-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
								<p className="text-gray-600 mb-4">No treatment plans created for this clinic yet.</p>
							</div>
						)}

						{/* Add New Treatment Form Modal */}
						{showNewTreatmentForm && (
							<div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-40">
								<div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
									<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
										<h3 className="text-lg font-medium text-gray-900">Create New Treatment Plan</h3>
										<button 
											onClick={() => setShowNewTreatmentForm(false)}
											className="text-gray-400 hover:text-gray-500 focus:outline-none"
										>
											<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
									<div className="p-6">
										<div className="mb-4">
											<label htmlFor="treatment-patient" className="block text-sm font-medium text-gray-700 mb-1">
												Patient Name *
											</label>
											<input
												type="text"
												id="treatment-patient"
												className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
												value={newTreatment.patientName}
												onChange={(e) => setNewTreatment({ ...newTreatment, patientName: e.target.value })}
												required
												list="treatment-patient-list"
											/>
											<datalist id="treatment-patient-list">
												{patients.map(patient => (
													<option key={patient.id} value={patient.name} />
												))}
											</datalist>
										</div>
										
										<div className="mb-4">
											<label htmlFor="treatment-type" className="block text-sm font-medium text-gray-700 mb-1">
												Treatment Type *
											</label>
											<input
												type="text"
												id="treatment-type"
												className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
												value={newTreatment.treatmentType}
												onChange={(e) => setNewTreatment({ ...newTreatment, treatmentType: e.target.value })}
												placeholder="e.g., Root Canal, Scaling, Extraction, etc."
												required
											/>
										</div>
										
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
											<div>
												<label htmlFor="treatment-dentist" className="block text-sm font-medium text-gray-700 mb-1">
													Assigned Dentist
												</label>
												<input
													type="text"
													id="treatment-dentist"
													className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
													value={newTreatment.assignedDentist}
													onChange={(e) => setNewTreatment({ ...newTreatment, assignedDentist: e.target.value })}
												/>
											</div>
											<div>
												<label htmlFor="treatment-status" className="block text-sm font-medium text-gray-700 mb-1">
													Status *
												</label>
												<select
													id="treatment-status"
													className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
													value={newTreatment.status}
													onChange={(e) => setNewTreatment({ ...newTreatment, status: e.target.value })}
													required
												>
													<option value="planned">Planned</option>
													<option value="in-progress">In Progress</option>
													<option value="completed">Completed</option>
													<option value="cancelled">Cancelled</option>
												</select>
											</div>
										</div>
										
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
											<div>
												<label htmlFor="treatment-start-date" className="block text-sm font-medium text-gray-700 mb-1">
													Start Date *
												</label>
												<input
													type="date"
													id="treatment-start-date"
													className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
													value={newTreatment.startDate}
													onChange={(e) => setNewTreatment({ ...newTreatment, startDate: e.target.value })}
													required
												/>
											</div>
											<div>
												<label htmlFor="treatment-end-date" className="block text-sm font-medium text-gray-700 mb-1">
													Expected End Date
												</label>
												<input
													type="date"
													id="treatment-end-date"
													className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
													value={newTreatment.endDate}
													onChange={(e) => setNewTreatment({ ...newTreatment, endDate: e.target.value })}
												/>
											</div>
										</div>
										
										<div className="mb-6">
											<label htmlFor="treatment-notes" className="block text-sm font-medium text-gray-700 mb-1">
												Notes & Procedures
											</label>
											<textarea
												id="treatment-notes"
												rows={3}
												className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
												value={newTreatment.notes}
												onChange={(e) => setNewTreatment({ ...newTreatment, notes: e.target.value })}
												placeholder="Add any notes or recommended procedures for this treatment"
											></textarea>
										</div>
										
										<div className="flex justify-end">
											<button
												type="button"
												onClick={() => setShowNewTreatmentForm(false)}
												className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
											>
												Cancel
											</button>
											<button
												type="button"
												onClick={handleAddTreatment}
												className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>
												Create Treatment Plan
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default DentalClinicDetailPage;
