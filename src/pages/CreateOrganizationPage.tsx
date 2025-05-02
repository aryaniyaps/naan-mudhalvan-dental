import { useState } from "react";
import { Link, useNavigate } from "react-router";

interface DentalClinic {
    id: number;
    name: string;
    address: string;
    rating: number;
    services: string[];
}

const CreateDentalClinicPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        service: "", // Temporary field for adding services
    });
    const [services, setServices] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Check if user is logged in
    useState(() => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            navigate("/login");
        }
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddService = () => {
        if (formData.service.trim()) {
            setServices([...services, formData.service.trim()]);
            setFormData({ ...formData, service: "" });
        }
    };

    const handleRemoveService = (indexToRemove: number) => {
        setServices(services.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        // Validate form
        if (!formData.name.trim() || !formData.address.trim() || services.length === 0) {
            setError("Please fill all required fields and add at least one dental service");
            return;
        }

        setLoading(true);

        try {
            // Get existing dental clinics
            const storedClinics = localStorage.getItem("dental_clinics");
            const existingClinics: DentalClinic[] = storedClinics ? JSON.parse(storedClinics) : [];
            
            // Create a new clinic with a unique ID
            const newId = existingClinics.length > 0 
                ? Math.max(...existingClinics.map(clinic => clinic.id)) + 1 
                : 1;
            
            const newClinic: DentalClinic = {
                id: newId,
                name: formData.name,
                address: formData.address,
                rating: 4.5, // Default rating
                services: [...services],
            };
            
            // Add to existing dental clinics and save to localStorage
            const updatedClinics = [...existingClinics, newClinic];
            localStorage.setItem("dental_clinics", JSON.stringify(updatedClinics));
            
            // Navigate back to the dashboard
            navigate("/");
        } catch (err) {
            console.error("Error saving dental clinic:", err);
            setError("An error occurred while saving the dental clinic. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-800 flex items-center">
                            <Link to="/" className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Dashboard
                            </Link>
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto px-4 py-6">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 mt-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Dental Clinic</h2>
                    
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                Clinic Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter dental clinic name"
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                                Address *
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter full address"
                                required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                Dental Services Offered *
                            </label>
                            <p className="text-sm text-gray-500 mb-2">Add all dental services provided by this clinic (e.g., General Dentistry, Root Canal, Orthodontics, Teeth Whitening)</p>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add a dental service"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddService}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                            
                            <div className="mt-3">
                                {services.length === 0 ? (
                                    <p className="text-sm text-gray-500">No services added yet. Add at least one dental service offered by this clinic.</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {services.map((service, index) => (
                                            <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                                                <span className="text-sm text-gray-800">{service}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveService(index)}
                                                    className="ml-1 text-gray-500 hover:text-red-600"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <Link
                                to="/"
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Creating...' : 'Create Dental Clinic'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateDentalClinicPage;