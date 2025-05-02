import { Route, Routes } from "react-router";

import CreateDentalClinicPage from "./pages/CreateDentalClinicPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OrganizationAppointmentsPage from "./pages/OrganizationAppointmentsPage";
import OrganizationDetailPage from "./pages/OrganizationDetailPage";
import SignupPage from "./pages/SignupPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/dental-clinic/new" element={<CreateDentalClinicPage />} />
			<Route path="/dental-clinic/:id" element={<OrganizationDetailPage />} />
			<Route path="/appointments" element={<OrganizationAppointmentsPage />} />
		</Routes>
	);
}

export default App;
