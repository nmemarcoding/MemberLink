import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import store from '../../store.js';
import { publicRequest } from '../../hooks/requestMethods.js';

export default function MembershipPage() {
    useAuthRedirect();
    const userInfo = store.getState().userInf;
    const [membershipExpiration, setMembershipExpiration] = useState();
    const [planName, setPlanName] = useState();
    const [selectedPlan, setSelectedPlan] = useState();
    const [membershipDetails, setMembershipDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    useEffect(() => {
        setIsLoading(true); // Set loading to true before API call
        publicRequest().get(`/membership/${userInfo._id}`)
            .then((response) => {
                setMembershipExpiration(response.data.membershipExpiration);
                setPlanName(response.data.name);
                setIsLoading(false); // Set loading to false after API call
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false); // Set loading to false if there's an error
            });
    }, []);

    useEffect(() => {
        setIsLoading(true); // Set loading to true before API call
        publicRequest().get('/membership')
                .then((response) => {
                    setMembershipDetails(response.data);
                    setIsLoading(false); // Set loading to false after API call
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false); // Set loading to false if there's an error
                });
    }, []);

    const today = new Date();
    const expiration = new Date(membershipExpiration);
    let status = 'N/A';
  
    if (expiration < today) {
        status = 'Expired';
    } else if (expiration > today) {
        status = 'Active';
    }

    const handlePayMembership = () => {
        if (!selectedPlan) {
            window.alert('Please select a membership plan');
            return;
        }
        publicRequest().post('/payment/create', {
            planId: selectedPlan,
            userId: userInfo._id,
        })
        .then((response) => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleSelectMembership = (membership) => {
        setSelectedPlan(membership._id);
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {isLoading ? (
                    <div className="animate-pulse flex justify-center items-center h-64">
                        <div className="bg-gray-400 rounded-full h-12 w-12"></div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-4xl font-semibold text-gray-900 mb-10">Membership Details</h1>
                        <div className="bg-white rounded-xl shadow-xl p-6 md:w-1/2 mx-auto">
                            <p className="text-xl font-medium mb-4">Status: <span className={status === 'Active' ? 'text-green-500' : 'text-red-500'}>{status}</span></p>
                            {status === 'Active' ? (
                                <>
                                    <p className="text-xl font-medium mb-4">Membership Plan: <span className="text-gray-600">{planName}</span></p>
                                    <p className="text-xl font-medium mb-4">Expiration Date: <span className="text-gray-600">{new Date(membershipExpiration).toLocaleDateString()}</span></p>
                                </>
                            ) : (
                                <>
                                    <p className="text-xl font-medium mb-4">Your membership has expired. Please select a new plan:</p>
                                    <div className="flex flex-col space-y-4">
                                        {membershipDetails.map((membership) => (
                                            <div key={membership._id} className={`bg-gray-200 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-300 transition duration-200 ease-in-out ${selectedPlan === membership._id ? 'bg-green-300' : ''}`} onClick={() => handleSelectMembership(membership)}>
                                                <div>
                                                    <p className="text-lg font-medium">{membership.name}</p>
                                                    <p className="text-gray-600">${membership.price} / month</p>
                                                </div>
                                                <p className="text-gray-600">{membership.expirationDate}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white font-semibold py-2 px-6 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none mt-4" onClick={handlePayMembership}>
                                        Pay for Membership
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
