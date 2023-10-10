import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethods';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';
export default function LoginPage() {
  const addUserInfo = useStore((state) => state.addUserInfo);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    publicRequest().post('auth/login', formData)
      .then((response) => {
        console.log(response);
        alert('Logged in successfully');
        addUserInfo(response.data);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data || 'An error occurred');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0 pt-12 pb-12">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2 tracking-wide text-blue-600 uppercase">memberLink</h2>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Log In</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700 font-bold mb-2 block">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-gray-700 font-bold mb-2 block">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-center mt-6 sm:mt-8 mb-4 sm:mb-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
          >
            Log In
          </button>
        </div>

        <div className="text-gray-700 font-bold mb-2 block">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
        </div>

      </form>
    </div>
  )
}
