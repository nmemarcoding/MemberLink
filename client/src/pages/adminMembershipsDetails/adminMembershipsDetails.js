import { useState, useEffect } from 'react';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import adminAuth from '../../hooks/adminAuth';
import { publicRequest } from '../../hooks/requestMethods.js';

export default function AdminMembershipsDetails() {
    adminAuth();
    const [memberships, setMemberships] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [expiration, setExpiration] = useState('');

    useEffect(() => {
        publicRequest().get('/membership')
            .then((response) => {
                setMemberships(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        publicRequest().post('/membership/create', { name, price, description, expiration })
            .then((response) => {
                console.log(response);
                alert('Membership created successfully');
                setName('');
                setPrice('');
                setDescription('');
                setExpiration('');
                setMemberships([...memberships, response.data]);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data || 'An error occurred');
            });

    }
    return (
        <>
        <AdminNavbar />
  
        <div className="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
            
            <h1 className="text-2xl font-bold mb-6 text-center">All Memberships</h1>
            
            {/* Membership Creation Form */}
            <div className="mb-8 w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Create New Membership</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-2">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-2">Expiration (days)</label>
                        <input type="number" value={expiration} onChange={(e) => setExpiration(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-2">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200">Add Membership</button>
                    </div>
                </form>
            </div>

            {/* Memberships Table */}
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Price</th>
                            <th className="py-2 px-4 text-left">Expiration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberships.map((membership) => (
                            <tr key={membership._id} className="border-t">
                                <td className="py-2 px-4">{membership.name}</td>
                                <td className="py-2 px-4">${membership.price}</td>
                                <td className="py-2 px-4">{membership.expiration} days</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}
