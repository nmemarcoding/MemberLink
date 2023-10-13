import React, { useState } from 'react';
import adminAuth from '../../hooks/adminAuth';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';

export default function AdminMemberCheckInPage() {
    adminAuth();

    const [membershipNumber, setMembershipNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleMembershipNumberChange = (event) => {
        setMembershipNumber(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleCheckInSubmit = (event) => {
        event.preventDefault();
        // TODO: Implement check-in logic using membershipNumber or phoneNumber
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Membership Check-In</h2>
                <form onSubmit={handleCheckInSubmit}>
                    <div className="mb-4">
                        <label htmlFor="membershipNumber" className="block text-gray-700 font-bold mb-2">Membership Number:</label>
                        <input
                            type="text"
                            id="membershipNumber"
                            value={membershipNumber}
                            onChange={handleMembershipNumberChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Check In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
