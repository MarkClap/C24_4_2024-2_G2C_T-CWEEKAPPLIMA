import { useEffect, useState } from 'react';
import { getAllUsers, assignRole, removeRole, assignJuryRole, removeJuryRole } from '../services/adminservice';
import { getAllEvents } from '../services/eventservice';
import { HeaderNav } from '../components/HeaderNav';
import { FooterComponent } from '../components/FooterComponent';


export function AdminPage() {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState({});
    const [alerts, setAlerts] = useState([]);
    const [confirmation, setConfirmation] = useState(null); // Para la alerta de confirmación

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);

                const eventsData = await getAllEvents();
                setEvents(eventsData);
            } catch (err) {
                setError('Error al cargar datos.');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const showAlert = (message, type) => {
        const id = Math.random().toString(36).substr(2, 9);
        setAlerts((prev) => [...prev, { id, message, type, visible: true }]);
        setTimeout(() => {
            setAlerts((prev) =>
                prev.map((alert) =>
                    alert.id === id ? { ...alert, visible: false } : alert
                )
            );
            setTimeout(() => {
                setAlerts((prev) => prev.filter((alert) => alert.id !== id));
            }, 1000);
        }, 2000);
    };

    const handleEventChange = (userId, eventId) => {
        setSelectedEvents((prev) => ({ ...prev, [userId]: eventId }));
    };

    const confirmAction = (message, action) => {
        return new Promise((resolve) => {
            setConfirmation({ message, action, resolve });
        });
    };

    const handleRoleAction = async (userId, roleName, action) => {
        try {
            const actionMessage =
                action === 'assign'
                    ? `¿Estás seguro de asignar el rol ${roleName}?`
                    : `¿Estás seguro de remover el rol ${roleName}?`;

            const confirmed = await confirmAction(actionMessage, async () => {
                if (action === 'assign') {
                    if (roleName === 'jurado') {
                        const eventId = selectedEvents[userId];
                        if (!eventId) {
                            showAlert('Selecciona un evento para asignar el rol de jurado.', 'error');
                            return;
                        }
                        await assignJuryRole({ userId, eventId });
                    } else {
                        await assignRole({ userId, roleName });
                    }
                    showAlert(`Rol ${roleName} asignado con éxito.`, 'success');
                } else if (action === 'remove') {
                    if (roleName === 'jurado') {
                        const eventId = selectedEvents[userId];
                        if (!eventId) {
                            showAlert('Selecciona un evento para remover el rol de jurado.', 'error');
                            return;
                        }
                        await removeJuryRole({ userId, eventId });
                    } else {
                        await removeRole({ userId, roleName });
                    }
                    showAlert(`Rol ${roleName} removido con éxito.`, 'success');
                }
                refreshUsers();
            });

            if (!confirmed) return;
        } catch (err) {
            showAlert(`Error gestionando el rol: ${err.response?.data || err.message}`, 'error');
        }
    };

    const refreshUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto px-6 pt-28">
                <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Panel de Administración</h1>
                <div className="overflow-x-auto bg-white p-6 shadow-lg rounded-lg">
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left font-bold text-gray-700">Nombre</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-bold text-gray-700">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-bold text-gray-700">Roles</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-bold text-gray-700">Asignar Rol</th>
                                <th className="border border-gray-300 px-4 py-2 text-left font-bold text-gray-700">Asignar Jurado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition duration-200">
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{user.username}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{user.roles.join(', ')}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {!user.roles.includes('ROLE_ORGANIZADOR') && (
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                                                onClick={() => handleRoleAction(user.id, 'organizador', 'assign')}
                                            >
                                                Asignar Organizador
                                            </button>
                                        )}
                                        {user.roles.includes('ROLE_ORGANIZADOR') && (
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                                                onClick={() => handleRoleAction(user.id, 'organizador', 'remove')}
                                            >
                                                Remover Organizador
                                            </button>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex flex-col">
                                            <select
                                                className="mb-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                value={selectedEvents[user.id] || ''}
                                                onChange={(e) => handleEventChange(user.id, e.target.value)}
                                            >
                                                <option value="">Seleccionar Evento</option>
                                                {events.map((event) => (
                                                    <option key={event.id} value={event.id}>
                                                        {event.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {!user.roles.includes('ROLE_JURADO') && (
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                                                    onClick={() => handleRoleAction(user.id, 'jurado', 'assign')}
                                                >
                                                    Asignar Jurado
                                                </button>
                                            )}
                                            {user.roles.includes('ROLE_JURADO') && (
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                                                    onClick={() => handleRoleAction(user.id, 'jurado', 'remove')}
                                                >
                                                    Remover Jurado
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Alertas */}
            <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`px-6 py-3 rounded-lg shadow-md text-white transition-all duration-500 ${
                            alert.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                        } ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        {alert.message}
                    </div>
                ))}
            </div>

            {/* Confirmación */}
            {confirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
                        <p className="text-lg font-bold">{confirmation.message}</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600"
                                onClick={() => {
                                    confirmation.resolve(true);
                                    setConfirmation(null);
                                }}
                            >
                                Sí
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400"
                                onClick={() => {
                                    confirmation.resolve(false);
                                    setConfirmation(null);
                                }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <FooterComponent />
            
        </>
    );
}
