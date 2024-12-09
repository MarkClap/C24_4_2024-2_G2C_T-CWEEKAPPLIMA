import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateEvent, getEventById } from '../services/eventservice';
import { HeaderNav } from '../components/HeaderNav';
import { ArrowLeft } from 'lucide-react';

export function EventsOrganizadorUpdatePage() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        place: '',
        startDate: '',
        endDate: '',
        maxParticipantsGroup: 0,
        imgEvent: '',
    });

    const [alert, setAlert] = useState({ message: '', type: '', visible: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
        setTimeout(() => {
            setAlert((prevAlert) => ({ ...prevAlert, visible: false }));
        }, 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new Date(eventData.startDate) > new Date(eventData.endDate)) {
            showAlert('La fecha de inicio no puede ser posterior a la fecha de fin.', 'error');
            return;
        }
        try {
            await updateEvent(eventId, eventData);
            showAlert('Evento actualizado con éxito', 'success');
            setTimeout(() => {
                navigate(`/organizador/events/${eventId}`);
            }, 2000);
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
            showAlert('No se pudo actualizar el evento. Intenta nuevamente.', 'error');
        }
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await getEventById(eventId);
                setEventData({
                    name: event.name,
                    description: event.description,
                    place: event.place,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    maxParticipantsGroup: event.maxParticipantsGroup,
                    imgEvent: event.imgEvent,
                });
            } catch (error) {
                console.error('Error al obtener el evento:', error);
                showAlert('Error al cargar los detalles del evento.', 'error');
            }
        };
        fetchEvent();
    }, [eventId]);

    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderNav />
            <div className="container mx-auto px-6 pt-28">
                {/* Botón y título */}
                <div className="flex justify-between items-center mb-10">
                    <button
                        onClick={() => navigate('/organizador/events')}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 transform hover:scale-105"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Regresar
                    </button>
                    <h1 className="text-5xl font-extrabold text-gray-800 text-center flex-grow -translate-x-6">
                        Actualizar Evento
                    </h1>
                </div>

                {/* Alerta */}
                {alert.visible && (
                    <div
                        className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-md text-white transition-all duration-500 transform ${
                            alert.visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                        } ${
                            alert.type === 'success'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                        }`}
                    >
                        {alert.message}
                    </div>
                )}

                {/* Formulario */}
                <div className="w-full max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Nombre del Evento
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={eventData.name}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-turquoise focus:shadow-md focus:border-turquoise"
                                placeholder="Ingresa el nombre del evento"
                                style={{
                                    borderColor: '#1E90FF',
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Lugar
                            </label>
                            <input
                                type="text"
                                name="place"
                                value={eventData.place}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-turquoise focus:shadow-md focus:border-turquoise"
                                placeholder="Ingresa el lugar del evento"
                                style={{
                                    borderColor: '#1E90FF',
                                }}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Descripción
                            </label>
                            <textarea
                                name="description"
                                value={eventData.description}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-turquoise focus:shadow-md focus:border-turquoise"
                                placeholder="Agrega una descripción del evento"
                                rows={4}
                                style={{
                                    borderColor: '#1E90FF',
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Fecha de Inicio
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={eventData.startDate}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-turquoise focus:shadow-md focus:border-turquoise"
                                style={{
                                    borderColor: '#1E90FF',
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Fecha de Fin
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={eventData.endDate}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-turquoise focus:shadow-md focus:border-turquoise"
                                style={{
                                    borderColor: '#1E90FF',
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Imagen del Evento
                            </label>
                            <input
                                type="text"
                                name="imgEvent"
                                value={eventData.imgEvent}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-turquoise focus:shadow-md focus:border-turquoise"
                                placeholder="Ingresa la URL de la imagen"
                                style={{
                                    borderColor: '#1E90FF',
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Máximo de Participantes
                            </label>
                            <input
                                type="number"
                                name="maxParticipantsGroup"
                                value={eventData.maxParticipantsGroup}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-turquoise focus:shadow-md focus:border-turquoise"
                                placeholder="Máximo de participantes"
                                style={{
                                    borderColor: '#1E90FF',
                                }}
                            />
                        </div>
                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white text-lg font-bold py-3 rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105"
                            >
                                Actualizar Evento
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EventsOrganizadorUpdatePage;
