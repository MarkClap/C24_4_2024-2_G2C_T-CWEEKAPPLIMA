import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderNav } from '../components/HeaderNav';
import { getAllEvents } from '../services/eventservice';
import { createInscription } from '../services/inscriptionservice'; // Importa la función para inscribirse

export function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);  // Añadir estado de carga
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Para la navegación

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents(); // Llama al servicio
                setEvents(data);
            } catch (err) {
                setError('Error al cargar los eventos. Intenta nuevamente.');
            } finally {
                setLoading(false); // Cambiar el estado de carga una vez completada la operación
            }
        };

        fetchEvents();
    }, []);

    const handleInscription = async (eventId) => {
        try {
            const result = await createInscription(eventId);
            alert(result || 'Inscripción exitosa');
            navigate(`/events/detail/${eventId}`); // Redirige a la página de detalles del evento
        } catch (err) {
            alert(err || 'Error al inscribirse');
        }
    };

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto text-justify">
                <h1 className="text-center p-7">Events List</h1>
                {error && <p className="text-center text-red-500">{error}</p>}

                {loading ? ( // Mostrar un mensaje de carga mientras se obtienen los eventos
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

                                    {/* Botón para inscribirse */}
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
