import { useState, useEffect } from 'react';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import adminAuth from '../../hooks/adminAuth';
import { publicRequest } from '../../hooks/requestMethods.js';

export default function AdminMembershipsDetails() {
    adminAuth();
    const [memberships, setMemberships] = useState();

    useEffect(() => {
        publicRequest().get('/membership')
            .then((response) => {
                setMemberships(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
        , []);


    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <AdminNavbar />
            <h1 className="text-2xl font-bold mb-6 text-center">All Memberships</h1>
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Price</th>
                        <th className="py-2 px-4 text-left">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {memberships?.map((membership) => (
                        <tr key={membership._id} className="border-t">
                            <td className="py-2 px-4">{membership.name}</td>
                            <td className="py-2 px-4">${membership.price}</td>
                            <td className="py-2 px-4">{membership.expiration} days</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
