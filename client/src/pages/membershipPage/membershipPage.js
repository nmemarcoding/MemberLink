import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import store from '../../store.js';
import { publicRequest } from '../../hooks/requestMethods.js';

export default function MembershipPage() {
    useAuthRedirect();
    const userInfo = store.getState().userInf;
    const [membershipExpiration, setMembershipExpiration] = useState();
    const [selectedPlan, setSelectedPlan] = useState();
    // fetch membership expiration date from database
    publicRequest().get(`/membership/${userInfo._id}`)
        .then((response) => {
            setMembershipExpiration(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    // Replace these with actual user data
    const [membershipDetails, setMembershipDetails] = useState([
        {
            id: 1,
            name: 'Basic',
            price: 10,
            expirationDate: '2022-12-31',
            // Add any other membership details here
        },
        {
            id: 2,
            name: 'Premium',
            price: 20,
            expirationDate: '2024-12-31',
            // Add any other membership details here
        },
        {
            id: 3,
            name: 'Gold',
            price: 30,
            expirationDate: '2023-12-31',
            // Add any other membership details here
        }
    ]);

    

    useEffect(() => {
        publicRequest().get('/membership')
                .then((response) => {
                    setMembershipDetails(response.data);
                    
                })
                .catch((error) => {
                    console.log(error);
                });
    }, []);
    
    const today = new Date();
    const expiration = new Date(membershipExpiration);
    let status = 'Active';
  
        if (expiration < today) {
     
            status = 'Expired';
        }


    const handlePayMembership = () => {
        if (!selectedPlan) {
            window.alert('Please select a membership plan');
            return
        }
        // creat payment
        publicRequest().post('/payment/create', {
            planId: selectedPlan,
            userId: userInfo._id,
            
        })
            .then((response) => {
                // refresh page
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
                <h1 className="text-4xl font-semibold text-gray-900 mb-10">Membership Details</h1>
                <div className="bg-white rounded-xl shadow-xl p-6 md:w-1/2 mx-auto">
                    <p className="text-xl font-medium mb-4">Status: <span className={status === 'Active' ? 'text-green-500' : 'text-red-500'}>{status}</span></p>
                    {status === 'Active' ? (
                        <>
                            <p className="text-xl font-medium mb-4">Membership Plan: <span className="text-gray-600">{membershipDetails[0].name}</span></p>
                            <p className="text-xl font-medium mb-4">Expiration Date: <span className="text-gray-600">{new Date(membershipExpiration).toLocaleDateString()}</span></p>
                            {/* Add any other membership details here */}
                        </>
                    ) : (
                        <>
                            <p className="text-xl font-medium mb-4">Your membership has expired. Please select a new plan:</p>
                            <div className="flex flex-col space-y-4">
                                {membershipDetails.map((membership) => (
                                    <div key={membership._id} className={`bg-gray-200 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-300 transition duration-200 ease-in-out ${selectedPlan === membership._id ? 'bg-blue-200' : ''}`} onClick={() => handleSelectMembership(membership)}>
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
            </div>
        </div>
    );
}
