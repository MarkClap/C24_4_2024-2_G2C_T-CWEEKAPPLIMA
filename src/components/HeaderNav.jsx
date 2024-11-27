import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function HeaderNav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header>
            <nav className="fixed top-0 left-0 w-full z-50 bg-sky-300">
                <div className="max-w flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            LOGO
                        </span>
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link to="/login">
                            <button
                                type="button"
                                className="text-white bg-sky-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Log out
                            </button>
                        </Link>
                        <button
                            onClick={toggleSidebar}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                            <span className="sr-only">Toggle menu</span>
                        </button>
                    </div>
                    <div className="hidden md:flex md:w-auto md:order-1">
                        <ul className="flex flex-row font-medium p-4 md:p-0 mt-4 space-x-8 rtl:space-x-reverse md:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded ${
                                            isActive
                                                ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700'
                                                : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
                                        }`
                                    }
                                    end
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/events"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded ${
                                            isActive
                                                ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700'
                                                : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
                                        }`
                                    }
                                >
                                    Events
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/idk"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded ${
                                            isActive
                                                ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700'
                                                : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'
                                        }`
                                    }
                                >
                                    IDK
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div
                className={`fixed top-0 left-0 z-40 h-screen w-64 transform bg-white transition-transform duration-300 ease-in-out dark:bg-gray-800 md:hidden ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col overflow-y-auto py-4 px-3">
                    <div className="mb-6 flex items-center justify-between px-4">
                        <span className="text-2xl font-semibold">Menu</span>
                        <button
                            onClick={toggleSidebar}
                            className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <ul className="space-y-4">
                        <li>
                            <NavLink
                                to="/"
                                onClick={toggleSidebar}
                                className={({ isActive }) =>
                                    `flex items-center rounded-lg px-4 py-2 ${
                                        isActive
                                            ? 'bg-blue-700 text-white'
                                            : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                    }`
                                }
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/events"
                                onClick={toggleSidebar}
                                className={({ isActive }) =>
                                    `flex items-center rounded-lg px-4 py-2 ${
                                        isActive
                                            ? 'bg-blue-700 text-white'
                                            : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                    }`
                                }
                            >
                                Events
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/idk"
                                onClick={toggleSidebar}
                                className={({ isActive }) =>
                                    `flex items-center rounded-lg px-4 py-2 ${
                                        isActive
                                            ? 'bg-blue-700 text-white'
                                            : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                    }`
                                }
                            >
                                IDK
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </header>
    );
}