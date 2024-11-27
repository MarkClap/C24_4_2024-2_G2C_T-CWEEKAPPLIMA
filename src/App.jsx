import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { EventsPage } from "./pages/EventsPage"
import { EventsAdminPage } from "./pages/EventsAdminPage"
import { EventDetailsPage } from "./pages/EventDetailsPage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin/events" element={<EventsAdminPage />} />
        <Route path="/events/detail" element={<EventDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
