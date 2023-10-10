import React from 'react';
import Navbar from '../../components/navbar';
import useAuthRedirect from '../../hooks/useAuthRedirect';
export default function MembershipPage() {
    useAuthRedirect();
    // Replace these with actual user data
    const membershipDetails = {
        expirationDate: '2024-12-31',
        // Add any other membership details here
    };

    const today = new Date();
    const expiration = new Date(membershipDetails.expirationDate);

    let status = membershipDetails.status;
    if (expiration < today) {
        status = 'Expired';
    }else if (expiration > today) {
        status = 'Active';
    }

    const handlePayMembership = () => {
        // Add logic to handle payment for membership
        console.log('Payment for membership initiated');
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-semibold text-gray-900 mb-10">Membership Details</h1>
                <div className="bg-white rounded-xl shadow-xl p-6 md:w-1/2 mx-auto">
                    <p className="text-xl font-medium mb-4">Status: <span className={status === 'Active' ? 'text-green-500' : 'text-red-500'}>{status}</span></p>
                    <p className="text-xl font-medium mb-4">Expiration Date: <span className="text-gray-600">{membershipDetails.expirationDate}</span></p>
                    {/* Add any other membership details here */}
                    {status === 'Expired' && (
                        <button className="bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white font-semibold py-2 px-6 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none" onClick={handlePayMembership}>
                            Pay for Membership
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
