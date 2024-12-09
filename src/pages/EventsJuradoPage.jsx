import React, { useState, useEffect } from 'react';
import { getAllGroupEvents } from '../services/groupeventsservice';
import { getAllJurors, addScore } from '../services/scoreservice';
import { HeaderNav } from '../components/HeaderNav';

export function EventsJuradoPage() {
    const [groups, setGroups] = useState([]);
    const [juror, setJuror] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [score, setScore] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJurorData = async () => {
            try {
                const jurorData = await getAllJurors();
                const currentJuror = jurorData.find(
                    (j) => j.userId === JSON.parse(localStorage.getItem('user')).id
                );
                setJuror(currentJuror);
            } catch (error) {
                showAlert('Error al cargar los jurados.', 'error');
                setLoading(false);
            }
        };

        const fetchGroups = async () => {
            try {
                const result = await getAllGroupEvents();
                setGroups(result);
                setLoading(false);
            } catch (error) {
                showAlert('Error al cargar los grupos.', 'error');
                setLoading(false);
            }
        };

        fetchJurorData();
        fetchGroups();
    }, []);

    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
        setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedGroup || !score) {
            showAlert('Por favor, selecciona un grupo y asigna un puntaje.', 'error');
            return;
        }

        try {
            await addScore({ groupId: selectedGroup, score: parseInt(score, 10) });
            showAlert('Puntaje asignado correctamente.', 'success');
        } catch (error) {
            showAlert('Error al asignar el puntaje.', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderNav />
            <div className="container mx-auto px-6 pt-28">
                {/* Nombre del evento */}
                {juror && (
                    <h3 className="text-center text-4xl font-extrabold text-gray-800 mb-6">
                        Evento: <span className="text-blue-600">{juror.eventName}</span>
                    </h3>
                )}

                {/* Título */}
                <h2 className="text-center text-3xl font-semibold text-gray-700 mb-10">
                    Asignar Puntaje
                </h2>

                {/* Mensaje de éxito o error */}
                {alert.visible && (
                    <div
                        className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transition-transform duration-500 ${
                            alert.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                        } ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        {alert.message}
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-lg text-gray-600">Cargando grupos...</p>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Selección del grupo */}
                            <div>
                                <label htmlFor="group" className="block text-lg font-medium text-gray-700 mb-2">
                                    Seleccionar Grupo
                                </label>
                                <select
                                    id="group"
                                    value={selectedGroup}
                                    onChange={(e) => setSelectedGroup(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="">Seleccionar un grupo</option>
                                    {groups
                                        .filter((group) => group.nameEvent === juror?.eventName)
                                        .map((group) => (
                                            <option key={group.groupId} value={group.groupId}>
                                                {group.nameGroupEvent} - {group.nameEvent} ({group.nameDepartment})
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* Ingreso del puntaje */}
                            <div>
                                <label htmlFor="score" className="block text-lg font-medium text-gray-700 mb-2">
                                    Puntaje
                                </label>
                                <input
                                    type="number"
                                    id="score"
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                    min="1"
                                    max="10"
                                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Ingresa un puntaje (1-10)"
                                />
                            </div>
                        </div>

                        {/* Botón para asignar puntaje */}
                        <button
                            type="submit"
                            className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg shadow-md font-bold hover:bg-blue-600 transition-transform transform hover:scale-105"
                        >
                            Asignar Puntaje
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default EventsJuradoPage;
