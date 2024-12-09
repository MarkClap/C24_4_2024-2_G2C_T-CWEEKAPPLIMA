        import React, { useState, useEffect } from "react";
        import { getTopScores } from "../services/groupeventsservice"; // Servicio para obtener los puntajes del top
        import { HeaderNav } from "../components/HeaderNav";

        export function ScoresPage() {
            const [topScores, setTopScores] = useState([]); // Estado para los puntajes más altos
            const [filteredScores, setFilteredScores] = useState([]); // Estado para los puntajes filtrados
            const [loading, setLoading] = useState(true); // Estado de carga
            const [message, setMessage] = useState(""); // Mensaje de error o éxito
            const [searchQuery, setSearchQuery] = useState(""); // Estado para búsqueda

            useEffect(() => {
                const fetchTopScores = async () => {
                    try {
                        const topScoresData = await getTopScores(); // Obtener los puntajes del top desde el backend

                        // Ordenar los puntajes de mayor a menor
                        const sortedScores = topScoresData.sort((a, b) => b.score - a.score);

                        setTopScores(sortedScores); // Guardar los puntajes ordenados
                        setFilteredScores(sortedScores); // Inicializar el estado filtrado
                        setLoading(false); // Finalizar carga
                    } catch (error) {
                        setMessage("Error al cargar los puntajes del top.");
                        setLoading(false);
                    }
                };

                fetchTopScores();
            }, []);

            // Función para manejar el filtro de búsqueda
            const handleSearch = (e) => {
                const query = e.target.value.toLowerCase();
                setSearchQuery(query);

                const filtered = topScores.filter((group) =>
                    group.groupName.toLowerCase().includes(query)
                );
                setFilteredScores(filtered);
            };

            // Función para exportar datos a CSV
            const handleExport = () => {
                const csvContent =
                    "data:text/csv;charset=utf-8," +
                    ["Grupo,Puntaje Total"]
                        .concat(
                            filteredScores.map((group) => `${group.groupName},${group.score}`)
                        )
                        .join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "top_scores.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            return (
                <div className="min-h-screen bg-gray-50">
                    <HeaderNav />
                    <div className="container mx-auto px-4 pt-20">
                        <h2 className="text-3xl font-bold text-sky-500 mb-8 text-center">
                            Top Puntajes por Grupo
                        </h2>

                        {/* Controles de búsqueda y exportación */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <input
                                type="text"
                                placeholder="Buscar por grupo..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 w-full md:w-1/3"
                            />
                            <button
                                onClick={handleExport}
                                className="bg-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors"
                            >
                                Exportar CSV
                            </button>
                        </div>

                        {loading && (
                            <p className="text-center text-lg text-gray-500">
                                Cargando top de puntajes...
                            </p>
                        )}
                        {message && (
                            <p className="text-center text-red-500 text-lg">{message}</p>
                        )}

                        {!loading && (
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                    <thead className="bg-sky-500 text-white">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-lg font-semibold">
                                                Grupo
                                            </th>
                                            <th className="py-3 px-6 text-left text-lg font-semibold">
                                                Puntaje Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredScores.length > 0 ? (
                                            filteredScores.map((group, index) => (
                                                <tr
                                                    key={index}
                                                    className={`${
                                                        index % 2 === 0
                                                            ? "bg-gray-100"
                                                            : "bg-white"
                                                    } hover:bg-gray-200 transition-all`}
                                                >
                                                    <td className="py-3 px-6 text-gray-700 font-medium">
                                                        {group.groupName}
                                                    </td>
                                                    <td className="py-3 px-6 text-gray-700 font-medium">
                                                        {group.score}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="2"
                                                    className="text-center py-6 text-gray-500"
                                                >
                                                    No hay puntajes para mostrar.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
            