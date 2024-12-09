import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderNav } from '../components/HeaderNav';
import { Trash2, Eye, X } from 'lucide-react';
import { getAllEvents, deleteEventById } from '../services/eventservice';

export function EventsOrganizadorPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const eventsList = await getAllEvents();
                setEvents(eventsList);
            } catch (err) {
                setError('Error al cargar los eventos. Por favor, intenta nuevamente.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleDeleteEvent = async () => {
        try {
            await deleteEventById(selectedEventId);
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event.id !== selectedEventId)
            );
            showAlert('Evento eliminado exitosamente.', 'success');
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
            showAlert('Error al eliminar el evento. Inténtalo nuevamente.', 'error');
        } finally {
            setShowConfirmModal(false);
            setSelectedEventId(null);
        }
    };

    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
        setTimeout(() => {
            setAlert({ ...alert, visible: false });
        }, 3000);
    };

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto px-4" style={{ paddingTop: '8rem' }}>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Lista de Eventos</h1>
                    <Link
                        to="/organizador/events/add"
                        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200"
                    >
                        Crear Evento
                    </Link>
                </div>

                {loading && (
                    <p className="text-center text-lg text-gray-600">Cargando eventos...</p>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                            >
                                <div className="relative group">
                                    <img
                                        src={event.imgEvent || 'https://via.placeholder.com/600x400'}
                                        alt={event.name}
                                        className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                        {event.name}
                                    </h2>
                                    <p className="text-gray-600 mb-6">
                                        {event.description || 'Sin descripción'}
                                    </p>

                                    <div className="mt-auto flex space-x-4">
                                        <button
                                            onClick={() => navigate(`/organizador/events/${event.id}`)}
                                            className="flex-1 flex items-center justify-center bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200"
                                        >
                                            <Eye className="mr-2" size={20} /> Ver Detalles
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedEventId(event.id);
                                                setShowConfirmModal(true);
                                            }}
                                            className="flex-1 flex items-center justify-center bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200"
                                        >
                                            <Trash2 className="mr-2" size={20} /> Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && events.length === 0 && (
                    <p className="text-center text-lg text-gray-600 mt-8">
                        No hay eventos para mostrar.
                    </p>
                )}
            </div>

            {/* Modal de confirmación */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Confirmar Eliminación
                            </h3>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">
                            ¿Estás seguro de que deseas eliminar este evento?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteEvent}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Alerta de éxito */}
            {alert.visible && (
                <div
                    className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-md text-white transition-all duration-500 transform ${
                        alert.visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                    } ${
                        alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {alert.message}
                </div>
            )}
        </>
    );
}
