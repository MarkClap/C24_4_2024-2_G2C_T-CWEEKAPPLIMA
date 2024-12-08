import React, { useState, useEffect } from 'react';
import { getAllGroupEvents } from '../services/groupeventsservice'; // Para obtener los grupos
import { getAllJurors } from '../services/scoreservice'; // Para obtener los jurados
import { addScore } from '../services/scoreservice'; // Para agregar un puntaje

export function EventsJuradoPage() {
    const [groups, setGroups] = useState([]); // Estado para los grupos
    const [juror, setJuror] = useState(null); // Estado para el jurado actual
    const [selectedGroup, setSelectedGroup] = useState(''); // Estado para el grupo seleccionado
    const [score, setScore] = useState(''); // Estado para el puntaje
    const [message, setMessage] = useState(''); // Mensaje de éxito o error
    const [loading, setLoading] = useState(true); // Estado de carga

    // Cargar datos de jurado y grupos al montar el componente
    useEffect(() => {
        const fetchJurorData = async () => {
            try {
                const jurorData = await getAllJurors(); // Obtener los datos de los jurados
                const currentJuror = jurorData.find(j => j.userId === JSON.parse(localStorage.getItem('user')).id); // Buscar al jurado actual
                setJuror(currentJuror); // Establecer el jurado en el estado
            } catch (error) {
                setMessage('Error al cargar los jurados.');
                setLoading(false);
            }
        };

        const fetchGroups = async () => {
            try {
                const result = await getAllGroupEvents(); // Obtener grupos desde el backend
                setGroups(result); // Establecer los grupos en el estado
                setLoading(false); // Cambiar el estado de carga a falso
            } catch (error) {
                setMessage('Error al cargar los grupos.');
                setLoading(false); // Cambiar el estado de carga a falso
            }
        };

        fetchJurorData();
        fetchGroups();
    }, []);

    // Filtrar los grupos según el ID del evento del jurado
    const filteredGroups = groups.filter(group => group.nameEvent === juror?.eventName);

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedGroup || !score) {
            setMessage('Por favor, selecciona un grupo y asigna un puntaje.');
            return;
        }

        try {
            const response = await addScore({ groupId: selectedGroup, score: parseInt(score, 10) }); // Llamar al servicio para agregar el puntaje
            setMessage(response.message || 'Puntaje asignado correctamente.');
        } catch (error) {
            setMessage('Error al asignar el puntaje.');
        }
    };

    return (
        <div>
            <h2>Agregar Puntaje</h2>

            {loading && <p>Cargando grupos...</p>}
            {message && <p>{message}</p>}

            {!loading && (
                <form onSubmit={handleSubmit}>
                    {/* Selección del grupo */}
                    <div>
                        <label htmlFor="group">Seleccionar Grupo:</label>
                        <select
                            id="group"
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                        >
                            <option value="">Seleccionar un grupo</option>
                            {filteredGroups.map((group) => (
                                <option key={group.groupId} value={group.groupId}>
                                    {group.nameGroupEvent} - {group.nameEvent} ({group.nameDepartment})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ingreso del puntaje */}
                    <div>
                        <label htmlFor="score">Puntaje:</label>
                        <input
                            type="number"
                            id="score"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            min="1"
                            max="10"
                        />
                    </div>

                    {/* Botón para enviar */}
                    <button type="submit">Asignar Puntaje</button>
                </form>
            )}
        </div>
    );
}
