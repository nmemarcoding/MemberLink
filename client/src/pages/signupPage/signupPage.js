import React from 'react';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0 pt-12 pb-12">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2 tracking-wide text-blue-600 uppercase">memberLink</h2>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Sign Up</h1>
      <form className="w-full max-w-md">
        
        <div className="mb-4">
          <label htmlFor="firstName" className="text-gray-700 font-bold mb-2 block">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your first name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="lastName" className="text-gray-700 font-bold mb-2 block">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your last name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700 font-bold mb-2 block">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="text-gray-700 font-bold mb-2 block">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your phone number"
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
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-gray-700 font-bold mb-2 block">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Confirm your password"
          />
        </div>

        <div className="flex items-center justify-center mt-6 sm:mt-8 mb-4 sm:mb-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
          >
            Sign Up
          </button>
        </div>

      </form>
    </div>
  )
}
