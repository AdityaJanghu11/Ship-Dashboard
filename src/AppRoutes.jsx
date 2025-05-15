// AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./contexts/AuthContext";

// Import real pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ShipsPage from "./pages/ShipsPage";
import ShipDetailPage from "./pages/ShipDetailPage";
import JobsPage from "./pages/JobsPage";
import CalendarPage from "./pages/CalendarPage";

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <nav className="bg-gray-100 p-4 space-x-4">
        <Link to="/" className="text-blue-600">Dashboard</Link>
        <Link to="/ships" className="text-blue-600">Ships</Link>
        <Link to="/jobs" className="text-blue-600">Jobs</Link>
        <Link to="/calendar" className="text-blue-600">Calendar</Link>
      </nav>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/ships" element={<PrivateRoute><ShipsPage /></PrivateRoute>} />
          <Route path="/ships/:id" element={<PrivateRoute><ShipDetailPage /></PrivateRoute>} />
          <Route path="/jobs" element={<PrivateRoute><JobsPage /></PrivateRoute>} />
          <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default AppRoutes;
