import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"; // Make sure to use the correct import

interface DentalClinic {
	id: number;
	name: string;
	address: string;
	rating: number;
	services: string[];
}

interface User {
	email: string;
}

const DashboardPage = () => {
	const [dentalClinics, setDentalClinics] = useState<DentalClinic[]>([]);
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
			setDentalClinics(JSON.parse(storedClinics));
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
			localStorage.setItem('dental_clinics', JSON.stringify(defaultDentalClinics));
		}
	}, [navigate]);

	// Handle logout
	const handleLogout = () => {
		sessionStorage.removeItem('loggedInUser');
		navigate('/login');
	};

	return (
		<>
			{/* Dashboard Navbar */}
			<nav className="bg-white shadow-sm py-3 mb-4">
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
							</svg>
							<span className="font-bold text-blue-600 text-xl">Dental Management System</span>
						</div>
						<div className="flex items-center">
							<span className="text-gray-600 mr-4">
								{user && `Welcome, ${user.email}`}
							</span>
							<button 
								onClick={handleLogout}
								className="text-gray-700 hover:text-red-600 font-medium"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Dashboard Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Your Dental Clinics</h1>
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

				{dentalClinics.length === 0 ? (
					<div className="bg-gray-50 rounded-lg p-8 text-center">
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
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{dentalClinics.map((clinic) => (
							<div key={clinic.id} className="bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden">
								<div className="bg-gray-50 p-4 border-b">
									<div className="flex justify-between items-center">
										<h3 className="font-bold text-lg text-gray-800">{clinic.name}</h3>
										<span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
											{clinic.rating} ★
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
											className="flex-1 text-center border border-blue-600 text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition duration-200"
										>
											View Details
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<footer className="py-6 text-center text-gray-500 mt-12 border-t">
				<div className="container mx-auto px-4">
					<p>© 2025 Dental Management System. All rights reserved.</p>
					<p className="text-sm mt-2">Current Date: May 2, 2025</p>
				</div>
			</footer>
		</>
	);
};

export default DashboardPage;
