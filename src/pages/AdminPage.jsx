import { useEffect, useState } from 'react';
import { getAllUsers, assignRole, removeRole, assignJuryRole, removeJuryRole } from '../services/adminservice';
import { useNavigate } from 'react-router-dom';
import { HeaderNav } from '../components/HeaderNav';

export function AdminPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                setError('Failed to fetch users.');
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleAction = async (userId, roleName, action) => {
        try {
            if (action === 'assign') {
                if (roleName === 'jurado') {
                    const eventId = prompt('Enter the Event ID for the Jury:');
                    if (!eventId) return;
                    await assignJuryRole({ userId, eventId });
                } else {
                    await assignRole({ userId, roleName });
                }
                alert(`Role ${roleName} assigned successfully.`);
            } else if (action === 'remove') {
                if (roleName === 'jurado') {
                    const eventId = prompt('Enter the Event ID to remove the Jury from:');
                    if (!eventId) return;
                    await removeJuryRole({ userId, eventId });
                } else {
                    await removeRole({ userId, roleName });
                }
                alert(`Role ${roleName} removed successfully.`);
            }
            refreshUsers();
        } catch (err) {
            alert(`Error managing role: ${err.response?.data || err.message}`);
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

    if (error) {
        return (
            <div className="container mx-auto px-4 pt-20 text-center text-red-500">
                <p>Error: {error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="text-blue-500 hover:underline"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <>
            <HeaderNav />
            <div className="container mx-auto px-4 pt-20">
                <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Roles</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.roles.join(', ')}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {/* Asignar roles */}
                                    {!user.roles.includes('ROLE_ORGANIZADOR') && (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
                                            onClick={() => handleRoleAction(user.id, 'organizador', 'assign')}
                                        >
                                            Asignar Organizador
                                        </button>
                                    )}
                                    {!user.roles.includes('ROLE_JURADO') && (
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                                            onClick={() => handleRoleAction(user.id, 'jurado', 'assign')}
                                        >
                                            Asignar Jurado
                                        </button>
                                    )}
                                    {/* Remover roles */}
                                    {user.roles.includes('ROLE_ORGANIZADOR') && (
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 mr-2"
                                            onClick={() => handleRoleAction(user.id, 'organizador', 'remove')}
                                        >
                                            Remover Organizador
                                        </button>
                                    )}
                                    {user.roles.includes('ROLE_JURADO') && (
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                            onClick={() => handleRoleAction(user.id, 'jurado', 'remove')}
                                        >
                                            Remover Jurado
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
