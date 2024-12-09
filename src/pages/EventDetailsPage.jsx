import React, { useState, useEffect } from 'react';
import { HeaderNav } from '../components/HeaderNav';
import { Calendar, MapPin, Users, ArrowLeft, Search, X } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../services/eventservice';
import { inscriptionService } from '../services/inscriptionservice';

export function EventDetailsPage() {
    const [eventDetails, setEventDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const navigate = useNavigate();

    const { eventId } = useParams();

    const today = new Date();
    const closingDate = new Date(today);
    closingDate.setDate(today.getDate() + 7);

    const formatDate = (date) => date.toISOString().split('T')[0];

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const event = await getEventById(eventId);
                setEventDetails(event);

                const allInscriptions = await inscriptionService.getAllInscriptions();
                const filteredParticipants = allInscriptions.filter(
                    (inscription) => inscription.eventName === event.name
                );

                setParticipants(filteredParticipants.slice(0, 10)); // Limitar a 10 participantes
            } catch (err) {
                setError(err.message || 'Failed to load event details.');
                console.error('Error fetching event details:', err);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const filteredParticipants = participants.filter((participant) =>
        participant.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return (
            <>
                <HeaderNav />
                <div className="container mx-auto px-4 pt-20 text-center text-red-500">
                    <p>Error: {error}</p>
                    <Link to="/events" className="text-blue-500 hover:underline">
                        Back to Events
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto px-4 pt-32">
                <div className="flex justify-between items-center mb-6">
                    {/* Botón de volver */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Volver</span>
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-lg">
                    {/* Imagen del evento */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={eventDetails?.imgEvent || "https://via.placeholder.com/600x400"}
                            alt={eventDetails?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Detalles del evento */}
                    <div>
                        <h1 className="text-5xl font-extrabold mb-6 text-gray-800">{eventDetails?.name}</h1>

                        <div className="space-y-4 mb-6 text-gray-600">
                            <div className="flex items-center">
                                <Calendar className="mr-3 text-blue-500" />
                                <span className="text-lg font-semibold">
                                    Fecha de Inicio: {formatDate(today)}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-3 text-red-500" />
                                <span className="text-lg font-semibold">
                                    Fecha de Cierre: {formatDate(closingDate)}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-3 text-green-500" />
                                <span className="text-lg font-semibold">{eventDetails?.place}</span>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-3 text-gray-800">Descripción del Evento</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">{eventDetails?.description}</p>

                        <div className="bg-gray-100 p-6 rounded-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                    <Users className="mr-3 text-green-500" />
                                    Participantes (Máx: 10)
                                    <span className="ml-2 bg-green-500 text-white rounded-full px-3 py-1 text-sm">
                                        {filteredParticipants.length}
                                    </span>
                                </h2>

                                {/* Barra de búsqueda */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar participantes..."
                                        className="pl-10 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="max-h-64 overflow-y-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="py-3 px-4 font-medium text-gray-600">Usuario</th>
                                            <th className="py-3 px-4 font-medium text-gray-600">Fecha de Registro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredParticipants.map((participant) => (
                                            <tr key={participant.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4 text-gray-700">{participant.username}</td>
                                                <td className="py-3 px-4 text-gray-700">{participant.fecha_Inscripcion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {filteredParticipants.length === 0 && (
                                    <div className="text-center py-4 text-gray-500">
                                        No se encontraron participantes
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventDetailsPage;
