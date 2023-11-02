import React, { useState } from 'react';
import adminAuth from '../../hooks/adminAuth';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import { publicRequest } from '../../hooks/requestMethods.js';

export default function AdminMemberCheckInPage() {
    adminAuth();

    const [membershipNumber, setMembershipNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state

    const handleMembershipNumberChange = (event) => {
        setMembershipNumber(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleCheckInSubmit = (event) => {
        event.preventDefault();

        if (membershipNumber === '' && phoneNumber === '') {
            alert('Please fill out membership number or phone number');
            return;
        }

        setLoading(true); // Set loading to true before making the request

        publicRequest().post('/checkin', { membershipNumber, phoneNumber })
            .then((response) => {
                alert('Checked in successfully');
                setMembershipNumber('');
                setPhoneNumber('');
                setUserInfo(response.data);
            })
            .catch((error) => {
                alert(error.response.data || 'An error occurred');
            })
            .finally(() => {
                setLoading(false); // Set loading back to false once the request is completed
            });
    };

    const handleClosePopup = () => {
        setUserInfo(null);
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
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600" disabled={loading}>
                            {loading ? 'Loading...' : 'Check In'} {/* Show spinner text when loading */}
                        </button>
                    </div>
                </form>
            </div>
            {userInfo && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">User Info</h2>
                        <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
                        <p><strong>Membership Number:</strong> {userInfo.membershipNumber}</p>
                        <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
                        <button onClick={handleClosePopup} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
