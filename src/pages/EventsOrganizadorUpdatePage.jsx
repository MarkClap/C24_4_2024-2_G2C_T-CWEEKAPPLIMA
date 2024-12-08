import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateEvent, getEventById } from '../services/eventservice';  // Asegúrate de importar las funciones correctas
import { HeaderNav } from '../components/HeaderNav'; // Si tienes un componente de navegación

export function EventsOrganizadorUpdatePage() {
    const { eventId } = useParams();  // Obtiene el ID del evento desde los parámetros de la URL
    const navigate = useNavigate();
    
    // Estado para manejar los datos del evento
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        place: '',
        startDate: '',
        endDate: '',
        maxParticipantsGroup: 0,
        imgEvent: ''
    });

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que la fecha de inicio no sea posterior a la fecha de fin
        if (new Date(eventData.startDate) > new Date(eventData.endDate)) {
            alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
            return;
        }

        try {
            // Llamada al backend para actualizar el evento
            const updatedEvent = await updateEvent(eventId, {
                name: eventData.name,
                description: eventData.description,
                place: eventData.place,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                maxParticipantsGroup: eventData.maxParticipantsGroup,
                imgEvent: eventData.imgEvent
            });

            alert('Evento actualizado con éxito');
            navigate(`/organizador/events/${eventId}`);  // Redirigir a la página de detalles del evento después de actualizar
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
            alert('No se pudo actualizar el evento. Intenta nuevamente.');
        }
    };

    // Cargar los datos del evento al cargar la página
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
                    imgEvent: event.imgEvent
                });
            } catch (error) {
                console.error('Error al obtener el evento:', error);
                alert('Error al cargar los detalles del evento.');
            }
        };

        fetchEvent();
    }, [eventId]);

    return (
        <div>
            <HeaderNav />
            <div className="container mx-auto px-4 pt-20">
                <h1 className="text-3xl font-bold mb-6">Actualizar Evento</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={eventData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg">Descripción</label>
                        <textarea
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg">Lugar</label>
                        <input
                            type="text"
                            name="place"
                            value={eventData.place}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg">Fecha de Inicio</label>
                        <input
                            type="date"
                            name="startDate"
                            value={eventData.startDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg">Fecha de Fin</label>
                        <input
                            type="date"
                            name="endDate"
                            value={eventData.endDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg">Imagen del Evento</label>
                        <input
                            type="text"
                            name="imgEvent"
                            value={eventData.imgEvent}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg">Máximo de Participantes</label>
                        <input
                            type="number"
                            name="maxParticipantsGroup"
                            value={eventData.maxParticipantsGroup}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-lg">
                        Actualizar Evento
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EventsOrganizadorUpdatePage;
