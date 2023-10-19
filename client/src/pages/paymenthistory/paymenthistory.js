import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import { publicRequest } from '../../hooks/requestMethods.js';
import store from '../../store';
import useAdminAuth from '../../hooks/adminAuth.js';

export default function PaymentHistory() {
    useAdminAuth();
    const userInfo = store.getState().userInf;
    const [payments, setPayments] = useState([]);


    // Add the hard-coded payment data to the existing payments state
    useEffect(() => {
        publicRequest().get(`/payment/${userInfo._id}`)
            .then((response) => {
                setPayments(response.data.reverse());
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Format the date as "YYYY-MM-DD"
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `0${d.getMonth() + 1}`.slice(-2);
        const day = `0${d.getDate()}`.slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
                    <div className="mt-6">
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Amount
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {payments.map(payment => (
                                                    <tr key={payment._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{formatDate(payment.date)}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{payment.amount}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Paid
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
