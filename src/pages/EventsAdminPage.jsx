import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderNav } from '../components/HeaderNav';
import { Trash2, Eye } from 'lucide-react';
import { getAllEvents } from '../services/eventservice'; // Importa la función de la API

export function EventsAdminPage() {
    const [events, setEvents] = useState([]); // Estado para la lista de eventos
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    // Efecto para obtener los eventos al cargar el componente
    useEffect(() => {
        const fetchEvents = async () => {
            try {
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

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto px-4 pt-20">
                <div className="flex justify-between items-center my-6">
                    <h1 className="text-3xl font-bold">Events List</h1>
                    <Link to="/organizador/events/add" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                        Create Event
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
                                            src={event.imgEvent}
                                            alt={event.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <h5 className="text-2xl md:text-3xl font-medium mt-3">
                                        {event.name}
                                    </h5>
                                    <p className="text-slate-500 text-lg mt-3 mb-4">
                                        {event.description || 'Sin descripción'}
                                    </p>
                                    <div className="flex space-x-4">
                                        <button className="flex-1 flex items-center justify-center bg-blue-400 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:scale-95 transition-all duration-200 ease-out">
                                            <Eye className="mr-2" size={20} /> Details
                                        </button>
                                        <button className="flex-1 flex items-center justify-center bg-red-400 py-2 rounded-lg font-semibold hover:bg-red-700 focus:scale-95 transition-all duration-200 ease-out">
                                            <Trash2 className="mr-2" size={20} /> Delete
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
