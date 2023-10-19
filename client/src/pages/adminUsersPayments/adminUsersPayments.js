import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import { publicRequest } from '../../hooks/requestMethods.js';
import useAdminAuth from '../../hooks/adminAuth.js';

export default function MemberPaymentHistory() {
    useAdminAuth();
    const [payments, setPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        publicRequest().get('/payment')
            .then((response) => {
                setPayments(response.data.reverse());
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const filteredPayments = payments.filter(payment => {
    const fullName = `${payment.userId?.firstName.toLowerCase()} ${payment.userId?.lastName.toLowerCase()}`;
    return fullName.includes(searchTerm.toLowerCase()) || 
           payment.userId?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           payment.userId?.lastName.toLowerCase().includes(searchTerm.toLowerCase());
});

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment History</h1>
                    <div className="flex flex-col md:flex-row mb-4">
                        <div className="md:w-2/3 mb-2 md:mb-0">
                            <input
                                type="text"
                                placeholder="Search by first or last name"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPayments.map(payment => (
                                    <tr key={payment._id}>
                                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                            <div className="text-sm text-gray-900">{new Date(payment.date).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                            <div className="text-sm text-gray-900">{payment.amount}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Paid
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 sm:hidden">
                                                <strong>User:</strong> {payment.userId?.firstName} {payment.userId?.lastName}
                                                <br />
                                                <strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}
                                                <br />
                                                <strong>Amount:</strong> {payment.amount}
                                                <br />
                                                <strong>Status:</strong> Paid
                                            </div>
                                            <div className="text-sm text-gray-900 hidden sm:block">{payment.userId?.firstName} {payment.userId?.lastName}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
