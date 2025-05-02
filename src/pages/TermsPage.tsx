import React from "react";
import { Link } from "react-router";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 truncate">
              Terms and Conditions
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <div className="prose max-w-none">
            <h2>Terms and Conditions for Dental Management System</h2>
            <p className="text-sm text-gray-500">Last Updated: May 2, 2025</p>
            
            <h3 className="mt-6">1. Acceptance of Terms</h3>
            <p>
              By accessing and using the Dental Management System ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). 
              If you disagree with any part of the terms, you may not access the Service.
            </p>
            
            <h3 className="mt-6">2. Use License</h3>
            <p>
              Permission is granted to temporarily use the Service for personal, non-commercial transitory viewing only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained in the Service</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            
            <h3 className="mt-6">3. Disclaimer</h3>
            <p>
              The materials on the Service are provided on an 'as is' basis. The Dental Management System makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, 
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>
            
            <h3 className="mt-6">4. Limitations</h3>
            <p>
              In no event shall the Dental Management System or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the Service, even if the Dental Management System or 
              an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h3 className="mt-6">5. Accuracy of Materials</h3>
            <p>
              The materials appearing on the Service could include technical, typographical, or photographic errors. 
              The Dental Management System does not warrant that any of the materials on the Service are accurate, complete, or current. 
              The Dental Management System may make changes to the materials contained on the Service at any time without notice.
            </p>
            
            <h3 className="mt-6">6. Links</h3>
            <p>
              The Dental Management System has not reviewed all of the sites linked to its Service and is not responsible 
              for the contents of any such linked site. The inclusion of any link does not imply endorsement by the 
              Dental Management System of the site. Use of any such linked website is at the user's own risk.
            </p>
            
            <h3 className="mt-6">7. Modifications</h3>
            <p>
              The Dental Management System may revise these Terms of Service for its Service at any time without notice. 
              By using this Service, you are agreeing to be bound by the then current version of these Terms and Conditions.
            </p>
            
            <h3 className="mt-6">8. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the laws, without regard to its 
              conflict of law provisions. Our failure to enforce any right or provision of these Terms will 
              not be considered a waiver of those rights.
            </p>
            
            <h3 className="mt-6">9. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us at support@dentalmanagement.com.
            </p>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-500 mt-12 border-t">
        <div className="container mx-auto px-4">
          <p>© 2025 Dental Management System. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
            <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;