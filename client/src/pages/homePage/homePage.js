import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import store from '../../store.js';

export default function UserInfo() {
    const userInfo = store.getState().userInf;
    useAuthRedirect();
    

    

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">User Info</h1>
                    <div className="mt-6">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                                    <div className="flex flex-col sm:flex-row items-center justify-between">
                                        <p className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">Name: </p>
                                        <p className="text-lg text-gray-500"> {userInfo.firstName} {userInfo.lastName}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between">
                                        <p className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">Membership Number:</p>
                                        <p className="text-lg text-gray-500">{userInfo.membershipNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
