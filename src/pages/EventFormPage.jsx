import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../services/eventservice";
import { HeaderNav } from "../components/HeaderNav";
import { ArrowLeft } from "lucide-react";

export function EventFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    place: "",
    startDate: "",
    endDate: "",
    maxParticipantsGroup: "",
    imgEvent: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      showAlert("La fecha de inicio no puede ser posterior a la fecha de fin.", "error");
      return;
    }
    try {
      await addEvent(formData);
      showAlert("Evento creado exitosamente", "success");
      setTimeout(() => navigate("/organizador/events"), 3000);
    } catch (err) {
      console.error(err);
      showAlert(
        err.response?.data?.message || "Error inesperado. Inténtalo más tarde.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderNav />
      <div className="container mx-auto px-6 pt-28">
        {/* Botón de volver y título */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate("/organizador/events")}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Regresar
          </button>
          <h1 className="text-5xl font-extrabold text-gray-800 text-center flex-grow -translate-x-6">
            Crear Nuevo Evento
          </h1>
        </div>

        {/* Alerta */}
        {alert.visible && (
          <div
            className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-md text-white transition-all duration-500 transform ${
              alert.visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            } ${
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
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
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:border-blue-500"
                placeholder="Ingresa el nombre del evento"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Lugar
              </label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:border-blue-500"
                placeholder="Ingresa el lugar del evento"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:border-blue-500"
                placeholder="Agrega una descripción del evento"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Fecha de Inicio
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Fecha de Fin
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Máximo de Participantes
              </label>
              <input
                type="number"
                name="maxParticipantsGroup"
                value={formData.maxParticipantsGroup}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:border-blue-500"
                placeholder="Máximo de participantes"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                URL de la Imagen
              </label>
              <input
                type="text"
                name="imgEvent"
                value={formData.imgEvent}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:border-blue-500"
                placeholder="Ingresa la URL de la imagen"
              />
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-green-500 text-white text-lg font-bold py-3 rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105"
              >
                Crear Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventFormPage;
