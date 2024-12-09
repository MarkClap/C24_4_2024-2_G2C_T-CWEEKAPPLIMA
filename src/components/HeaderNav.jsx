import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { logout } from "../services/config";

export function HeaderNav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState("");
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.clear();
            setLogoutMessage("Sesión cerrada exitosamente. Redirigiendo...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Logout fallido:", error.response || error);
            alert("Error al cerrar sesión. Por favor, intenta nuevamente.");
        }
    };

    return (
        <header>
            {/* Header Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-sky-500/90 backdrop-blur-sm shadow-md transition duration-300">
                <div className="max-w-[110rem] mx-auto flex items-center justify-between p-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center text-white text-2xl font-bold tracking-wide">
                        <img
                            src="https://www.tecsup.edu.pe/wp-content/uploads/2024/07/Group-680.png"
                            alt="tecsup"
                            className="h-12 bg-white p-2 rounded-2xl hover:scale-105 transition duration-300"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm font-medium px-4 py-2 rounded-lg transition-all transform ${
                                    isActive
                                        ? "bg-sky-700 text-white shadow-lg scale-105"
                                        : "text-white hover:bg-sky-600 hover:scale-105"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/events"
                            className={({ isActive }) =>
                                `text-sm font-medium px-4 py-2 rounded-lg transition-all transform ${
                                    isActive
                                        ? "bg-sky-700 text-white shadow-lg scale-105"
                                        : "text-white hover:bg-sky-600 hover:scale-105"
                                }`
                            }
                        >
                            Events
                        </NavLink>
                        <NavLink
                            to="/scores"
                            className={({ isActive }) =>
                                `text-sm font-medium px-4 py-2 rounded-lg transition-all transform ${
                                    isActive
                                        ? "bg-sky-700 text-white shadow-lg scale-105"
                                        : "text-white hover:bg-sky-600 hover:scale-105"
                                }`
                            }
                        >
                            Score
                        </NavLink>
                    </div>

                    {/* Logout Button */}
                    <div className="hidden md:block">
                        <button
                            onClick={handleLogout}
                            className="text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 px-6 py-2 rounded-lg shadow-lg font-semibold transition-transform transform hover:scale-110"
                        >
                            Log out
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Sidebar (Mobile Navigation) */}
            <div
                className={`fixed top-0 left-0 z-40 h-screen w-64 bg-sky-500/90 backdrop-blur-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full p-4 text-white">
                    {/* Sidebar Header */}
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-bold">Menu</span>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg hover:bg-sky-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    {/* Sidebar Links */}
                    <NavLink
                        to="/"
                        onClick={toggleSidebar}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition-all ${
                                isActive
                                    ? "bg-sky-700 shadow-md"
                                    : "hover:bg-sky-600"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/events"
                        onClick={toggleSidebar}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition-all ${
                                isActive
                                    ? "bg-sky-700 shadow-md"
                                    : "hover:bg-sky-600"
                            }`
                        }
                    >
                        Events
                    </NavLink>
                    <NavLink
                        to="/scores"
                        onClick={toggleSidebar}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition-all ${
                                isActive
                                    ? "bg-sky-700 shadow-md"
                                    : "hover:bg-sky-600"
                            }`
                        }
                    >
                        Scores
                    </NavLink>
                    {/* Sidebar Logout Button */}
                    <button
                        onClick={() => {
                            toggleSidebar();
                            handleLogout();
                        }}
                        className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 shadow-lg font-semibold transition-transform transform hover:scale-105"
                    >
                        Log out
                    </button>
                </div>
            </div>

            {/* Background Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Logout Message */}
            {logoutMessage && (
                <p className="fixed bottom-4 right-4 w-64 bg-green-500 text-white text-center px-4 py-2 rounded-lg shadow-lg transition-transform transform scale-100">
                    {logoutMessage}
                </p>
            )}
        </header>
    );
}
