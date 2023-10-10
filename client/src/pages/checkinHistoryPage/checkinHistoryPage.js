import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import useAuthRedirect from '../../hooks/useAuthRedirect';

export default function CheckinHistoryPage() {
    useAuthRedirect();

    const [checkinHistory, setCheckinHistory] = useState([]);

    useEffect(() => {
        // Hardcoded data
        const history = [
            { id: 1, date: '2021-09-01', time: '09:00:00', location: 'Gym' },
            { id: 2, date: '2021-09-02', time: '10:00:00', location: 'Pool' },
            { id: 3, date: '2021-09-03', time: '11:00:00', location: 'Tennis Court' },
        ];
        setCheckinHistory(history);
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900 mb-6">Check-in History</h1>
                <div className="mt-4">
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {checkinHistory.map((checkin) => (
                            <li key={checkin.id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="w-full flex flex-col items-start p-4 space-y-2">
                                    <h3 className="text-gray-900 text-lg font-medium truncate">{checkin.location}</h3>
                                    <span className="inline-block px-3 py-1 text-green-800 text-sm font-medium bg-green-100 rounded-full">{checkin.date}</span>
                                    <p className="text-gray-500 text-sm">{checkin.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
