import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import store from '../../store.js';
import { publicRequest } from '../../hooks/requestMethods.js';

export default function CheckinHistoryPage() {
    useAuthRedirect();
    const userInfo = store.getState().userInf;
    const [checkinHistory, setCheckinHistory] = useState([]);

    useEffect(() => {
        publicRequest().get(`/checkin/${userInfo._id}`)
            .then((response) => {
                setCheckinHistory(response.data.reverse());
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        
    }, [userInfo._id]);

    // Format date string using JS Date object
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} at ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    };


        return (
            <div className="bg-gray-100 min-h-screen">
                <Navbar />
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-gray-900 mb-6">Check-in History</h1>
                    <div className="mt-4">
                        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {checkinHistory?.map((checkin) => (
                                <li key={checkin._id} className="col-span-1 bg-white rounded-lg shadow-lg divide-y divide-gray-200 p-4">
                                    <div className="w-full flex flex-col items-start space-y-2">
                                        <p className="text-gray-500 text-sm">{formatDate(checkin.checkInTime)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
}
