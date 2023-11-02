import { useState, useEffect } from 'react';
import adminAuth from '../../hooks/adminAuth';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import { publicRequest } from '../../hooks/requestMethods.js';

export default function AdminCheckinHistoryPage() {
    adminAuth();
    const [checkIns, setCheckIns] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        publicRequest().get('/checkin')
            .then((response) => {
                setCheckIns(response.data.reverse());
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []); 

    const formatDateAndTime = (datetime) => {
        const dateObj = new Date(datetime);
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString();
        return { date, time };
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Members Check-In History</h1>
                    {loading ? (
                        <div className="flex justify-center items-center h-60">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {checkIns?.map((checkIn) => {
                                        const { date, time } = formatDateAndTime(checkIn.checkInTime);
                                        return (
                                            <tr key={checkIn._id}>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm sm:text-base text-gray-900">{checkIn.user.firstName} {checkIn.user.lastName}</div>
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm sm:text-base text-gray-900">{date}</div>
                                                </td>
                                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm sm:text-base text-gray-900">{time}</div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
