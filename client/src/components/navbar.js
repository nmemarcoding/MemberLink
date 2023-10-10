import React, { useState } from 'react';
import store from '../store';
import useStore from '../store';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userInfo = store.getState().userInf;
    const deleteUserInfo = useStore((state) => state.deleteUserInfo);

    const handleSignOut = () => {
        deleteUserInfo();
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 shadow-md text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-extrabold">MEMBER LINK</div>
                <div className="hidden md:flex space-x-5 items-center">
                    <span className="text-lg font-medium">Hi,{userInfo.firstName}</span>
                    <button className="text-lg font-medium">Membership</button>
                    <button onClick={handleSignOut} className="bg-red-600 px-5 py-2 rounded-full hover:bg-red-700 transition duration-300 text-lg font-medium">Sign Out</button>
                </div>
                <div className="md:hidden flex items-center">
                    <button className="text-white" onClick={toggleMenu}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-4 mt-5">
                    <span className="text-lg font-medium">Hi,{userInfo.firstName}</span>
                    <span className="text-lg font-medium">Membership</span>
                    <button onClick={handleSignOut} className="bg-red-600 px-5 py-2 rounded-full hover:bg-red-700 transition duration-300 text-lg font-medium">Sign Out</button>
                </div>
            )}
        </div>
    );
}

export default Navbar;
