import React from "react";
import { Link } from "react-router";

const PrivacyPage: React.FC = () => {
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
              Privacy Policy
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <div className="prose max-w-none">
            <h2>Privacy Policy for Dental Management System</h2>
            <p className="text-sm text-gray-500">Last Updated: May 2, 2025</p>
            
            <h3 className="mt-6">1. Introduction</h3>
            <p>
              Dental Management System ("us", "we", or "our") operates this service (the "Service").
              This page informs you of our policies regarding the collection, use, and disclosure of personal data 
              when you use our Service and the choices you have associated with that data.
            </p>
            
            <h3 className="mt-6">2. Information Collection and Use</h3>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            
            <h4 className="mt-4">2.1 Types of Data Collected</h4>
            <h5 className="mt-2">Personal Data</h5>
            <p>
              While using our Service, we may ask you to provide us with certain personally identifiable information 
              that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
              <li>Medical and dental records</li>
              <li>Treatment history</li>
              <li>Cookies and Usage Data</li>
            </ul>
            
            <h5 className="mt-3">Usage Data</h5>
            <p>
              We may also collect information on how the Service is accessed and used ("Usage Data"). 
              This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), 
              browser type, browser version, the pages of our Service that you visit, the time and date of your visit, 
              the time spent on those pages, unique device identifiers and other diagnostic data.
            </p>
            
            <h3 className="mt-6">3. Use of Data</h3>
            <p>
              Dental Management System uses the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide patient care and services</li>
              <li>To provide analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
            
            <h3 className="mt-6">4. Security of Data</h3>
            <p>
              The security of your data is important to us, but remember that no method of transmission over 
              the Internet, or method of electronic storage is 100% secure. While we strive to use commercially 
              acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
            
            <h3 className="mt-6">5. Your Rights</h3>
            <p>
              Dental Management System aims to take reasonable steps to allow you to correct, amend, delete, 
              or limit the use of your Personal Data. You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Access and receive a copy of the Personal Data we hold about you</li>
              <li>Rectify any Personal Data that is inaccurate or incomplete</li>
              <li>Request the deletion of your Personal Data</li>
              <li>Object to the processing of your Personal Data</li>
              <li>Request the restriction of processing of your Personal Data</li>
              <li>Request the transfer of your Personal Data to another party</li>
            </ul>
            
            <h3 className="mt-6">6. Changes to This Privacy Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. 
              Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            
            <h3 className="mt-6">7. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>By email: privacy@dentalmanagement.com</li>
              <li>By phone: 1-800-DENTAL</li>
            </ul>
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

export default PrivacyPage;