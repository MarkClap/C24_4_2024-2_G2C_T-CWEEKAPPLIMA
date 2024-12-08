import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { EventsPage } from "./pages/EventsPage"
import { EventsOrganizadorPage } from "./pages/EventsOrganizadorPage"
import { EventDetailsPage } from "./pages/EventDetailsPage"
import { EventFormPage } from "./pages/EventFormPage"
import EventDetailsOrganizadorPage from "./pages/EventsDetailsOrganizador"
import EventsOrganizadorUpdatePage from "./pages/EventsOrganizadorUpdatePage"
import { AdminPage } from "./pages/AdminPage"
import { EventsJuradoPage } from "./pages/EventsJuradoPage"
import { ScoresPage } from "./pages/ScorePage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/organizador/events" element={<EventsOrganizadorPage />} />
        <Route path="/organizador/events/:eventId" element={<EventDetailsOrganizadorPage />} />
        <Route path="/organizador/events/add" element={<EventFormPage />} />
        <Route path="/events/detail/:eventId" element={<EventDetailsPage />} />
        <Route path="/organizador/events/update/:eventId" element={<EventsOrganizadorUpdatePage/>} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/jurado/events" element={<EventsJuradoPage />} />
        <Route path="/scores" element={<ScoresPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
