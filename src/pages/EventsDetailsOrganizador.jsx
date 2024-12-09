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

    const today = new Date();
    const closingDate = new Date(today);
    closingDate.setDate(today.getDate() + 7);

    const formatDate = (date) => date.toISOString().split('T')[0];

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setLoading(true);

                const event = await getEventById(eventId);
                setEventDetails(event);

                const allInscriptions = await inscriptionService.getAllInscriptions();
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

    const filteredParticipants = participants.filter(participant =>
        participant.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <>
                <HeaderNav />
                <div className="container mx-auto px-4 pt-28 text-center">
                    <p className="text-2xl">Loading event details...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <HeaderNav />
                <div className="container mx-auto px-4 pt-28 text-center text-red-500">
                    <p className="text-2xl">Error: {error}</p>
                    <Link to="/events" className="text-blue-500 hover:underline text-lg">
                        Back to Events
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto px-4 pt-28">
                <div className="flex justify-between items-center mb-6">
                    <Link
                        to="/organizador/events"
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Events
                    </Link>
                    <button
                        onClick={() => navigate(`/organizador/events/update/${eventId}`)}
                        className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 transition duration-200"
                    >
                        <Edit3 className="w-5 h-5" />
                        Update
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-lg">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={eventDetails?.imgEvent || "https://via.placeholder.com/600x400"}
                            alt={eventDetails?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-5xl font-extrabold mb-6 text-gray-800">{eventDetails?.name}</h1>
                        <div className="space-y-4 mb-6 text-gray-600">
                            <div className="flex items-center">
                                <Calendar className="mr-3 text-blue-500 w-6 h-6" />
                                <span className="text-xl font-medium">Start Date: {formatDate(today)}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-3 text-red-500 w-6 h-6" />
                                <span className="text-xl font-medium">Closing Date: {formatDate(closingDate)}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-3 text-green-500 w-6 h-6" />
                                <span className="text-xl font-medium">{eventDetails?.place}</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold mb-3 text-gray-800">Event Description</h2>
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">{eventDetails?.description}</p>
                        <div className="bg-gray-100 p-6 rounded-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                    <Users className="mr-3 text-green-500 w-6 h-6" />
                                    Registered Participants
                                    <span className="ml-2 bg-green-500 text-white rounded-full px-3 py-1 text-lg">
                                        {filteredParticipants.length}
                                    </span>
                                </h2>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search participants..."
                                        className="pl-10 pr-10 py-2 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-6 h-6"
                                        >
                                            <X />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="max-h-64 overflow-y-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="py-3 px-4 font-medium text-gray-600 text-lg">Username</th>
                                            <th className="py-3 px-4 font-medium text-gray-600 text-lg">Registration Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredParticipants.map(participant => (
                                            <tr key={participant.id} className="border-b hover:bg-gray-50 text-lg">
                                                <td className="py-3 px-4 text-gray-700">{participant.username}</td>
                                                <td className="py-3 px-4 text-gray-700">{participant.fecha_Inscripcion}</td>
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
