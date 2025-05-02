import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"; // Make sure to use the correct import

interface DentalClinic {
	id: number;
	name: string;
	address: string;
	rating: number;
	services: string[];
}

interface ClinicStats {
	patients: number;
	appointments: number;
	treatments: number;
	dentists: number;
}

interface User {
	email: string;
}

const DashboardPage = () => {
	const [dentalClinics, setDentalClinics] = useState<DentalClinic[]>([]);
	const [filteredClinics, setFilteredClinics] = useState<DentalClinic[]>([]);
	const [clinicStats, setClinicStats] = useState<Record<number, ClinicStats>>({});
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();

	// Check if user is logged in and load dental clinics
	useEffect(() => {
		// Check authentication
		const loggedInUser = sessionStorage.getItem('loggedInUser');
		if (!loggedInUser) {
			// Redirect to login if not logged in
			navigate('/login');
			return;
		}

		// Set user state
		setUser(JSON.parse(loggedInUser));
		
		// Load dental clinics from localStorage
		const storedClinics = localStorage.getItem('dental_clinics');
		
		if (storedClinics) {
			// If dental clinics exist in localStorage, use those
			const clinics = JSON.parse(storedClinics);
			setDentalClinics(clinics);
			setFilteredClinics(clinics);
			
			// Calculate stats for each clinic from localStorage
			const stats: Record<number, ClinicStats> = {};
			clinics.forEach((clinic: DentalClinic) => {
				// Get patients data
				const patientsData = localStorage.getItem(`clinic_${clinic.id}_patients`);
				const patients = patientsData ? JSON.parse(patientsData).length : 0;
				
				// Get appointments data
				const appointmentsData = localStorage.getItem(`clinic_${clinic.id}_appointments`);
				const appointments = appointmentsData ? JSON.parse(appointmentsData).length : 0;
				
				// Get treatments data
				const treatmentsData = localStorage.getItem(`clinic_${clinic.id}_treatments`);
				const treatments = treatmentsData ? JSON.parse(treatmentsData).length : 0;
				
				// Get dentists data
				const dentistsData = localStorage.getItem(`clinic_${clinic.id}_dentists`);
				const dentists = dentistsData ? JSON.parse(dentistsData).length : 0;
				
				stats[clinic.id] = {
					patients,
					appointments,
					treatments,
					dentists
				};
			});
			
			setClinicStats(stats);
		} else {
			// If no dental clinics in localStorage, set default ones and store them
			const defaultDentalClinics = [
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
			
			setDentalClinics(defaultDentalClinics);
			setFilteredClinics(defaultDentalClinics);
			localStorage.setItem('dental_clinics', JSON.stringify(defaultDentalClinics));
			
			// Initialize default stats if no data exists
			const defaultStats: Record<number, ClinicStats> = {};
			defaultDentalClinics.forEach((clinic) => {
				// Set up mock data for the first time
				const mockPatients = Array.from({ length: Math.floor(Math.random() * 100) + 50 }, (_, i) => ({
					id: i + 1,
					name: `Patient ${i + 1}`,
					age: Math.floor(Math.random() * 50) + 18,
					gender: ["male", "female", "other"][Math.floor(Math.random() * 3)] as "male" | "female" | "other",
					contact: `555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
					complaint: "Initial consultation",
					medicalHistory: "",
				}));
				
				const mockAppointments = Array.from({ length: Math.floor(Math.random() * 60) + 20 }, (_, i) => ({
					id: i + 1,
					patientName: `Patient ${Math.floor(Math.random() * mockPatients.length) + 1}`,
					date: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
					time: `${String(Math.floor(Math.random() * 8) + 9).padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'}`,
					purpose: "Regular check-up",
					status: "scheduled"
				}));
				
				const mockTreatments = Array.from({ length: Math.floor(Math.random() * 40) + 10 }, (_, i) => ({
					id: i + 1,
					patientName: `Patient ${Math.floor(Math.random() * mockPatients.length) + 1}`,
					patientId: Math.floor(Math.random() * mockPatients.length) + 1,
					treatmentType: ["Cleaning", "Root Canal", "Filling", "Extraction"][Math.floor(Math.random() * 4)],
					status: ["planned", "in-progress", "completed"][Math.floor(Math.random() * 3)] as "planned" | "in-progress" | "completed",
					startDate: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
					notes: ""
				}));
				
				const mockDentists = Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => ({
					id: i + 1,
					name: `Dr. ${["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller"][Math.floor(Math.random() * 7)]}`,
					experience: Math.floor(Math.random() * 15) + 1,
					speciality: ["General Dentistry", "Orthodontics", "Periodontics", "Endodontics"][Math.floor(Math.random() * 4)],
					salary: (Math.floor(Math.random() * 50) + 70) * 100,
					active: true
				}));
				
				// Store the mock data in localStorage
				localStorage.setItem(`clinic_${clinic.id}_patients`, JSON.stringify(mockPatients));
				localStorage.setItem(`clinic_${clinic.id}_appointments`, JSON.stringify(mockAppointments));
				localStorage.setItem(`clinic_${clinic.id}_treatments`, JSON.stringify(mockTreatments));
				localStorage.setItem(`clinic_${clinic.id}_dentists`, JSON.stringify(mockDentists));
				
				// Set the stats based on the mock data
				defaultStats[clinic.id] = {
					patients: mockPatients.length,
					appointments: mockAppointments.length,
					treatments: mockTreatments.length,
					dentists: mockDentists.length
				};
			});
			
			setClinicStats(defaultStats);
		}
	}, [navigate]);

	// Filter clinics based on search term
	useEffect(() => {
		if (searchTerm.trim() === "") {
			setFilteredClinics(dentalClinics);
		} else {
			const filtered = dentalClinics.filter(clinic => 
				clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredClinics(filtered);
		}
	}, [searchTerm, dentalClinics]);

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	// Handle logout
	const handleLogout = () => {
		sessionStorage.removeItem('loggedInUser');
		navigate('/login');
	};

	return (
		<>
			{/* Dashboard Navbar */}
			<nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md py-4 mb-4">
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
							</svg>
							<span className="font-bold text-white text-xl">Dental Management System</span>
						</div>
						<div className="flex items-center">
							<span className="text-white mr-4">
								{user && `Welcome, ${user.email}`}
							</span>
							<button 
								onClick={handleLogout}
								className="bg-white text-blue-700 px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200 font-medium"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="bg-blue-50 py-10 mb-8">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Dental Clinic Dashboard</h1>
						<p className="text-lg text-gray-600 mb-6">Manage all your dental clinics in one place. Add new clinics, update information, and track performance.</p>
					</div>
				</div>
			</div>

			{/* Dashboard Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col md:flex-row justify-between items-center mb-8">
					<div className="flex items-center mb-4 md:mb-0">
						<h2 className="text-3xl font-bold text-gray-800">Your Dental Clinics</h2>
						<div className="ml-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
							{filteredClinics.length} Total
						</div>
					</div>
					<Link 
						to="/dental-clinic/new" 
						className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
						</svg>
						Add New Dental Clinic
					</Link>
				</div>

				{/* Search Bar */}
				<div className="mb-8">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
						</div>
						<input 
							type="search" 
							id="search-clinics" 
							className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
							placeholder="Search for dental clinics by name..." 
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</div>
				</div>

				{filteredClinics.length === 0 ? (
					<div className="bg-gray-50 rounded-lg p-8 text-center">
						{searchTerm ? (
							<>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<p className="text-gray-600 mb-4">No clinics found matching "{searchTerm}"</p>
								<button 
									onClick={() => setSearchTerm('')} 
									className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
								>
									Clear Search
								</button>
							</>
						) : (
							<>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
								</svg>
								<p className="text-gray-600 mb-4">You don't have any dental clinics yet.</p>
								<Link 
									to="/dental-clinic/new" 
									className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
								>
									Add Your First Dental Clinic
								</Link>
							</>
						)}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredClinics.map((clinic) => (
							<div key={clinic.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
								<div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b">
									<div className="flex justify-between items-center">
										<h3 className="font-bold text-lg text-gray-800">{clinic.name}</h3>
										<span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
											</svg>
											{clinic.rating}
										</span>
									</div>
								</div>
								<div className="p-5">
									<p className="text-gray-600 mb-3 flex items-center">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
										{clinic.address}
									</p>
									
									{/* Clinic Stats Overview */}
									<div className="grid grid-cols-2 gap-3 mb-4 mt-2">
										<div className="bg-blue-50 p-2 rounded flex flex-col items-center">
											<div className="flex items-center mb-1">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
												</svg>
												<span className="text-xs font-semibold text-gray-700">Patients</span>
											</div>
											<span className="text-blue-700 font-bold">
												{clinicStats[clinic.id]?.patients || 0}
											</span>
										</div>
										<div className="bg-blue-50 p-2 rounded flex flex-col items-center">
											<div className="flex items-center mb-1">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
												</svg>
												<span className="text-xs font-semibold text-gray-700">Appointments</span>
											</div>
											<span className="text-blue-700 font-bold">
												{clinicStats[clinic.id]?.appointments || 0}
											</span>
										</div>
										<div className="bg-blue-50 p-2 rounded flex flex-col items-center">
											<div className="flex items-center mb-1">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
												</svg>
												<span className="text-xs font-semibold text-gray-700">Treatments</span>
											</div>
											<span className="text-blue-700 font-bold">
												{clinicStats[clinic.id]?.treatments || 0}
											</span>
										</div>
										<div className="bg-blue-50 p-2 rounded flex flex-col items-center">
											<div className="flex items-center mb-1">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
												</svg>
												<span className="text-xs font-semibold text-gray-700">Dentists</span>
											</div>
											<span className="text-blue-700 font-bold">
												{clinicStats[clinic.id]?.dentists || 0}
											</span>
										</div>
									</div>
									
									<div className="mb-4">
										{clinic.services.map((service, index) => (
											<span
												key={index}
												className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2"
											>
												{service}
											</span>
										))}
									</div>
									<div className="flex space-x-2 mt-4">
										<Link 
											to={`/dental-clinic/${clinic.id}`} 
											className="flex-1 text-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
											View Details
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Stats Section */}
			<div className="bg-gray-50 py-12 mt-16">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Dental Management System Statistics</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<div className="text-blue-600 text-4xl font-bold mb-2">{dentalClinics.length}</div>
							<div className="text-gray-600">Total Dental Clinics</div>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<div className="text-blue-600 text-4xl font-bold mb-2">
								{dentalClinics.length > 0 ? 
									(dentalClinics.reduce((sum, clinic) => sum + clinic.rating, 0) / dentalClinics.length).toFixed(1) : 
									"0.0"
								}
							</div>
							<div className="text-gray-600">Average Rating</div>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<div className="text-blue-600 text-4xl font-bold mb-2">
								{new Set(dentalClinics.flatMap(clinic => clinic.services)).size}
							</div>
							<div className="text-gray-600">Unique Services</div>
						</div>
					</div>
				</div>
			</div>

			<footer className="py-6 text-center text-gray-500 mt-12 border-t">
				<div className="container mx-auto px-4">
					<p>© 2025 Dental Management System. All rights reserved.</p>
					<div className="flex justify-center space-x-4 mt-2">
						<Link to="/terms" className="text-blue-600 hover:underline text-sm">Terms & Conditions</Link>
						<Link to="/privacy" className="text-blue-600 hover:underline text-sm">Privacy Policy</Link>
					</div>
					<p className="text-sm mt-2">Current Date: May 2, 2025</p>
				</div>
			</footer>
		</>
	);
};

export default DashboardPage;
