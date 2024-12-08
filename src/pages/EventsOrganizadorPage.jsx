import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderNav } from '../components/HeaderNav';
import { Trash2, Eye } from 'lucide-react';
import { getAllEvents, deleteEventById } from '../services/eventservice';

export function EventsOrganizadorPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Efecto para obtener los eventos al cargar el componente
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

    // Función para eliminar un evento
    const handleDeleteEvent = async (eventId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este evento?');
        if (!confirmDelete) return;

        try {
            await deleteEventById(eventId);
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
            alert('Evento eliminado exitosamente.');
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
            alert('No se pudo eliminar el evento. Inténtalo de nuevo.');
        }
    };

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto px-4 pt-20">
                <div className="flex justify-between items-center my-6">
                    <h1 className="text-3xl font-bold">Lista de Eventos</h1>
                    <Link
                        to="/organizador/events/add"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Crear Evento
                    </Link>
                </div>

                {loading && <p className="text-center text-lg">Cargando eventos...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="rounded-xl shadow-lg bg-white">
                                <div className="p-5 flex flex-col">
                                    <div className="rounded-xl overflow-hidden mb-4">
                                        <img
                                            src={event.imgEvent || 'https://via.placeholder.com/400x300'}
                                            alt={event.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <h5 className="text-2xl md:text-3xl font-medium mt-3">{event.name}</h5>
                                    <p className="text-slate-500 text-lg mt-3 mb-4">
                                        {event.description || 'Sin descripción'}
                                    </p>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => navigate(`/organizador/events/${event.id}`)}
                                            className="flex-1 flex items-center justify-center bg-blue-400 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:scale-95 transition-all duration-200 ease-out"
                                        >
                                            <Eye className="mr-2" size={20} /> Ver Detalles
                                        </button>
                                        <button
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="flex-1 flex items-center justify-center bg-red-400 py-2 rounded-lg font-semibold hover:bg-red-700 focus:scale-95 transition-all duration-200 ease-out"
                                        >
                                            <Trash2 className="mr-2" size={20} /> Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
