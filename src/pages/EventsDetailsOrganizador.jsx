import React, { useState, useEffect } from 'react';
import { HeaderNav } from '../components/HeaderNav';
import { Calendar, MapPin, Users, ArrowLeft, Search, X, Edit3 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../services/eventservice';
import { inscriptionService } from '../services/inscriptionservice';

export function EventDetailsOrganizadorPage() {
    const [eventDetails, setEventDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const navigate = useNavigate();

    const { eventId } = useParams();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setLoading(true);

                // Obtener detalles del evento
                const event = await getEventById(eventId);
                setEventDetails(event);

                // Obtener todas las inscripciones
                const allInscriptions = await inscriptionService.getAllInscriptions();

                // Filtrar participantes por nombre del evento
                const filteredParticipants = allInscriptions.filter(
                    inscription => inscription.eventName === event.name
                );

                setParticipants(filteredParticipants);
            } catch (err) {
                setError(err.message || 'Failed to load event details.');
                console.error('Error fetching event details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    // Filtrar participantes según el término de búsqueda
    const filteredParticipants = participants.filter(participant =>
        participant.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <>
                <HeaderNav />
                <div className="container mx-auto px-4 pt-20 text-center">
                    <p>Loading event details...</p>
                </div>
            </>
        );
    }

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
            <div className="container mx-auto px-4 pt-20">
                <Link to="/organizador/events" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="mr-2" /> Back to Events
                </Link>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Imagen del Evento */}
                    <div>
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={eventDetails.imgEvent || "https://via.placeholder.com/600x400"}
                                alt={eventDetails.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    </div>

                    {/* Detalles del Evento */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-4xl font-bold">{eventDetails.name}</h1>
                            <button
                                onClick={() => navigate(`/organizador/events/update/${eventId}`)}
                                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                            >
                                <Edit3 className="mr-2" size={20} /> Update
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center">
                                <Calendar className="mr-3 text-blue-500" />
                                <span className="text-lg">{eventDetails.startDate} - {eventDetails.endDate}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-3 text-red-500" />
                                <span className="text-lg">{eventDetails.place}</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold mb-3">Event Description</h2>
                        <p className="text-gray-600 mb-6">{eventDetails.description}</p>

                        <div className="bg-gray-100 p-6 rounded-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold flex items-center">
                                    <Users className="mr-3 text-green-500" />
                                    Registered Participants
                                    <span className="ml-2 bg-green-500 text-white rounded-full px-2 py-1 text-sm">
                                        {filteredParticipants.length}
                                    </span>
                                </h2>

                                {/* Barra de búsqueda */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search participants..."
                                        className="pl-10 pr-10 py-2 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Username</th>
                                            <th className="text-left py-2">Registration Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredParticipants.map(participant => (
                                            <tr key={participant.id} className="border-b last:border-b-0">
                                                <td className="py-2">{participant.username}</td>
                                                <td className="py-2">{participant.fecha_Inscripcion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {filteredParticipants.length === 0 && (
                                    <div className="text-center py-4 text-gray-500">
                                        No participants found
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

export default EventDetailsOrganizadorPage;
