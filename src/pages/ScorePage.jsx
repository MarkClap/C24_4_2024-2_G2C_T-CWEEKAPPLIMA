import React, { useState, useEffect } from 'react';
import { getTopScores } from '../services/groupeventsservice'; // Servicio para obtener los puntajes del top

export function ScoresPage() {
    const [topScores, setTopScores] = useState([]); // Estado para los puntajes más altos
    const [loading, setLoading] = useState(true); // Estado de carga
    const [message, setMessage] = useState(''); // Mensaje de error o éxito

    useEffect(() => {
        const fetchTopScores = async () => {
            try {
                const topScoresData = await getTopScores(); // Obtener los puntajes del top desde el backend

                // Ordenar los puntajes de mayor a menor
                const sortedScores = topScoresData.sort((a, b) => b.score - a.score);

                setTopScores(sortedScores); // Guardar los puntajes ordenados
                setLoading(false); // Finalizar carga
            } catch (error) {
                setMessage('Error al cargar los puntajes del top.');
                setLoading(false);
            }
        };

        fetchTopScores();
    }, []);

    return (
        <div>
            <h2>Top Puntajes por Grupo</h2>

            {loading && <p>Cargando top de puntajes...</p>}
            {message && <p>{message}</p>}

            {!loading && (
                <>
                    {/* Tabla de top puntajes */}
                    <table>
                        <thead>
                            <tr>
                                <th>Grupo</th>
                                <th>Puntaje Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topScores.length > 0 ? (
                                topScores.map((group, index) => (
                                    <tr key={index}>
                                        <td>{group.groupName}</td>
                                        <td>{group.score}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No hay puntajes para mostrar.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
