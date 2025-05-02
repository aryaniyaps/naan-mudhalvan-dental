import { Route, Routes } from "react-router";

import CreateDentalClinicPage from "./pages/CreateDentalClinicPage";
import DentalClinicDetailPage from "./pages/DentalClinicDetailPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PrivacyPage from "./pages/PrivacyPage";
import SignupPage from "./pages/SignupPage";
import TermsPage from "./pages/TermsPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/dental-clinic/new" element={<CreateDentalClinicPage />} />
			<Route path="/dental-clinic/:id" element={<DentalClinicDetailPage />} />
			<Route path="/terms" element={<TermsPage />} />
			<Route path="/privacy" element={<PrivacyPage />} />
		</Routes>
	);
}

export default App;
