import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../services/eventservice";
import { HeaderNav } from "../components/HeaderNav";

export function EventFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    place: "",
    startDate: "", // Cambié start_date por startDate
    endDate: "", // Cambié end_date por endDate
    maxParticipantsGroup: "",
    imgEvent: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      // Cambié start_date por startDate
      setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
      return;
    }
    try {
      const successMessage = await addEvent(formData);
      alert("Evento creado exitosamente");

      navigate("/organizador/events"); // Redirige a la lista de eventos
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error inesperado. Inténtalo más tarde."
      );
    }
  };

  return (
    <>
      <HeaderNav />
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Crear Nuevo Evento
          </h1>
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium">
                Nombre del Evento
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-lg font-medium"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                rows="4"
              ></textarea>
            </div>
            <div>
              <label htmlFor="place" className="block text-lg font-medium">
                Lugar
              </label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            <div>
              <label htmlFor="startDate" className="block text-lg font-medium">
                Fecha de Inicio
              </label>
              <input
                type="date"
                id="startDate" // Cambié start_date por startDate
                name="startDate" // Cambié start_date por startDate
                value={formData.startDate} // Cambié start_date por startDate
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-lg font-medium">
                Fecha de Fin
              </label>
              <input
                type="date"
                id="endDate" // Cambié end_date por endDate
                name="endDate" // Cambié end_date por endDate
                value={formData.endDate} // Cambié end_date por endDate
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="max_participants_group"
                className="block text-lg font-medium"
              >
                Máximo de Participantes por Grupo
              </label>
              <input
                type="number"
                id="max_participants_group"
                name="max_participants_group"
                value={formData.max_participants_group}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>
            <div>
              <label htmlFor="img_event" className="block text-lg font-medium">
                URL de la Imagen
              </label>
              <input
                type="text"
                id="imgEvent"
                name="imgEvent"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Crear Evento
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
