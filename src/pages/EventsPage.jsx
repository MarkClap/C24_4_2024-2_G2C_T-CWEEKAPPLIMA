import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderNav } from '../components/HeaderNav';
import { getAllEvents } from '../services/eventservice';
import inscriptionService from '../services/inscriptionservice';

export function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
            } catch (err) {
                setError('Error al cargar los eventos. Intenta nuevamente.');
                alert('No se pudieron cargar los eventos');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleInscription = async (eventId) => {
        try {
            // Attempt to create an inscription
            await inscriptionService.createInscription(eventId);
            
            // Show success message and navigate to event details
            alert('Inscripción realizada exitosamente');
            navigate(`/events/detail/${eventId}`);
        } catch (err) {
            // Handle different error scenarios
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(err.response.data || 'Error al inscribirse');
            } else if (err.request) {
                // The request was made but no response was received
                alert('No se pudo conectar con el servidor');
            } else {
                // Something happened in setting up the request that triggered an Error
                alert('Error inesperado al inscribirse');
            }
        }
    };

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto text-justify">
                <h1 className="text-center p-7">Events List</h1>
                {error && <p className="text-center text-red-500">{error}</p>}

                {loading ? (
                    <p className="text-center">Cargando eventos...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="rounded-xl shadow-lg m-10 flex flex-col">
                                <div className="rounded-xl overflow-hidden">
                                    <img
                                        src={event.imgEvent || '/placeholder.jpg'}
                                        alt={event.name}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className="p-5 flex flex-col">
                                    <h5 className="text-2xl md:text-3xl font-medium mt-3">
                                        {event.name}
                                    </h5>
                                    <p className="text-slate-500 text-lg mt-3">
                                        {event.description}
                                    </p>
                                    <p className="text-slate-600 text-sm mt-2">
                                        <strong>Organizador:</strong> {event.organizador}
                                    </p>
                                    <p className="text-slate-600 text-sm mt-2">
                                        <strong>Ubicación:</strong> {event.place}
                                    </p>

                                    <button
                                        onClick={() => handleInscription(event.id)}
                                        className="text-center bg-green-400 py-2 rounded-lg font-semibold mt-4 hover:bg-green-700 focus:scale-95 transition-all duration-200 ease-out"
                                    >
                                        Inscribirse
                                    </button>

                                    <Link
                                        to={`/events/detail/${event.id}`}
                                        className="text-center bg-blue-400 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-700 focus:scale-95 transition-all duration-200 ease-out"
                                    >
                                        Ver más
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}