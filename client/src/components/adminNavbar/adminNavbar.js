import React from 'react';
import useStore from '../../store';

export default function AdminNavbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const deleteUserInfo = useStore((state) => state.deleteUserInfo);

    const handleSignOut = () => {
        deleteUserInfo();
        // reload the page
        window.location.reload();
    }
    
    return (
        <nav className="bg-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="p-2 mr-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16" />
                                )}
                            </svg>
                        </button>
                        {/* Logo */}
                        <div className="text-2xl font-extrabold">MEMBER LINK</div>
                    </div>
                    {/* Main Menu */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="flex space-x-4">
                            <a href="/admindashboard" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white">
                                Dashboard
                            </a>
                            <a href="/adminmembercheckin" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white">
                                Member Check-In
                            </a>
                            {/*/admincheckinhistory  */}
                            <a href="/admincheckinhistory" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white">
                                Member Check-In History
                            </a>
                            <a href="/memberPayments" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white">
                                Member Payment History
                            </a>
                            <button onClick={handleSignOut} className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="/admindashboard" className="text-base font-medium block px-3 py-2 rounded-md text-white bg-gray-900">
                            Dashboard
                        </a>
                        <a href="/adminmembercheckin" className="text-base font-medium block px-3 py-2 rounded-md text-white bg-gray-900">
                            Member Check-In
                        </a>
                        <a href="/admincheckinhistory" className="text-base font-medium block px-3 py-2 rounded-md text-white bg-gray-900">
                            Member Check-In History
                        </a>
                        <a href="/memberPayments" className="text-base font-medium block px-3 py-2 rounded-md text-white bg-gray-900">
                            Member Payment History
                        </a>
                        <button onClick={handleSignOut} className="text-base font-medium block px-3 py-2 rounded-md text-white bg-gray-900">
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
