import React, { useState } from 'react'
import { HeaderNav } from '../components/HeaderNav'
import { Calendar, MapPin, Users, ArrowLeft, Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export function EventDetailsPage() {
    // Mock data - replace with actual data from your backend
    const eventDetails = {
        title: "KARADUO",
        description: "Join us for an exciting day of technology, innovation, and networking. Top industry experts will share insights on emerging technologies, startup strategies, and future trends.",
        image: "", // Replace with actual event image
        date: "August 15, 2024",
        location: "Tech Innovation Center, San Francisco",
        participants: [
            { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "Jane Smith", email: "jane@example.com" },
            { id: 3, name: "Mike Johnson", email: "mike@example.com" },
            { id: 4, name: "Sarah Williams", email: "sarah@example.com" },
            { id: 5, name: "John Smith", email: "john.smith@example.com" },
            { id: 6, name: "Emily Davis", email: "emily@example.com" },
        ]
    }

    const [searchTerm, setSearchTerm] = useState('')

    // Filter participants based on search term
    const filteredParticipants = eventDetails.participants.filter(participant => 
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
        <HeaderNav />
        <div className="container mx-auto px-4 pt-20">
            <Link to="/events" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeft className="mr-2" /> Back to Events
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Event Image */}
                <div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img 
                            src={eventDetails.image || "https://via.placeholder.com/600x400"} 
                            alt={eventDetails.title} 
                            className="w-full h-96 object-cover"
                        />
                    </div>
                </div>

                {/* Event Details */}
                <div>
                    <h1 className="text-4xl font-bold mb-4">{eventDetails.title}</h1>
                    
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                            <Calendar className="mr-3 text-blue-500" />
                            <span className="text-lg">{eventDetails.date}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="mr-3 text-red-500" />
                            <span className="text-lg">{eventDetails.location}</span>
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

                            {/* Search Input */}
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
                                        <th className="text-left py-2">Name</th>
                                        <th className="text-left py-2">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredParticipants.map(participant => (
                                        <tr key={participant.id} className="border-b last:border-b-0">
                                            <td className="py-2">{participant.name}</td>
                                            <td className="py-2">{participant.email}</td>
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
    )
}