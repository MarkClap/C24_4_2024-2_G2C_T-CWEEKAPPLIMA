import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderNav } from '../components/HeaderNav';
import { FooterComponent } from '../components/FooterComponent';
import { getAllEvents } from '../services/eventservice';
import inscriptionService from '../services/inscriptionservice';

export function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]); // Estado para las notificaciones
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
            } catch (err) {
                addNotification('Error al cargar los eventos.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const addNotification = (message, type, callback = null) => {
        const id = Math.random().toString(36).substring(2, 9); // Generar un ID único para la notificación
        setNotifications((prev) => [...prev, { id, message, type, isVisible: true }]);

        // Desaparecer notificación después de 3 segundos
        setTimeout(() => {
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === id ? { ...notification, isVisible: false } : notification
                )
            );

            // Eliminar completamente después de la animación (1s)
            setTimeout(() => {
                setNotifications((prev) => prev.filter((notification) => notification.id !== id));
                if (callback) {
                    callback(); // Ejecutar el callback después de que la notificación desaparezca
                }
            }, 1000);
        }, 3000);
    };

    const handleInscription = async (eventId) => {
        try {
            await inscriptionService.createInscription(eventId);

            // Mostrar notificación de éxito
            addNotification('Inscripción realizada exitosamente', 'success', () => {
                navigate(`/events/detail/${eventId}`);
            });
        } catch (err) {
            if (err.response) {
                addNotification(err.response.data || 'Error al inscribirse', 'error');
            } else if (err.request) {
                addNotification('No se pudo conectar con el servidor', 'error');
            } else {
                addNotification('Error inesperado al inscribirse', 'error');
            }
        }
    };

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto text-justify px-4 py-8">
                <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">Eventos</h1>

                {loading ? (
                    <p className="text-center text-lg text-gray-600">Cargando eventos...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white overflow-hidden flex flex-col"
                            >
                                {/* Imagen del evento */}
                                <div className="relative group">
                                    <img
                                        src={event.imgEvent || '/placeholder.jpg'}
                                        alt={event.name}
                                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Etiqueta flotante opcional */}
                                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs uppercase font-semibold px-3 py-1 rounded-full shadow-md">
                                        Evento
                                    </div>
                                </div>

                                {/* Contenido de la tarjeta */}
                                <div className="p-6 flex flex-col">
                                    <h5 className="text-2xl font-semibold text-gray-800 mb-2">
                                        {event.name}
                                    </h5>
                                    <p className="text-gray-600 text-base line-clamp-3 mb-4">
                                        {event.description}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        <strong>Organizador:</strong> {event.organizador}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        <strong>Ubicación:</strong> {event.place}
                                    </p>

                                    {/* Botones de acción */}
                                    <div className="mt-4 flex flex-col gap-2">
                                        <button
                                            onClick={() => handleInscription(event.id)}
                                            className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
                                        >
                                            Inscribirse
                                        </button>

                                        <Link
                                            to={`/events/detail/${event.id}`}
                                            className="w-full text-center bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                                        >
                                            Ver más
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Notificaciones */}
                <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-center justify-between px-6 py-4 rounded-lg shadow-lg transition-opacity duration-1000 ${
                                notification.isVisible
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            } ${
                                notification.type === 'success'
                                    ? 'bg-green-600'
                                    : 'bg-red-600'
                            }`}
                            style={{
                                minWidth: '400px',
                                maxWidth: '600px',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            {/* Mensaje con texto más grande */}
                            <span className="flex-grow text-white text-lg font-bold">
                                {notification.message}
                            </span>

                            {/* Botón cerrar */}
                            <button
                                className="text-lg font-bold"
                                onClick={() =>
                                    setNotifications((prev) =>
                                        prev.filter((n) => n.id !== notification.id)
                                    )
                                }
                            >
                                <p className='text-white'>✘</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
            <FooterComponent />
        </>
    );
}
