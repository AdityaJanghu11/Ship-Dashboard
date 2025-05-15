// src/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./contexts/AuthContext";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ShipsPage from "./pages/ShipsPage";
import ShipDetailPage from "./pages/ShipDetailPage";
import JobsPage from "./pages/JobsPage";
import CalendarPage from "./pages/CalendarPage";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  const location = useLocation();

const { user, logout } = useAuth();

  return (
    <>
      <nav className="bg-blue-600 dark:bg-gray-800 p-4 space-x-4">
        <Link to="/" className="text-gray-100 dark:text-blue-400 hover:underline">
          Dashboard
        </Link>
        <Link to="/ships" className="text-gray-100 dark:text-blue-400 hover:underline">
          Ships
        </Link>
        <Link to="/jobs" className="text-gray-100 dark:text-blue-400 hover:underline">
          Jobs
        </Link>
        <Link to="/calendar" className="text-gray-100 dark:text-blue-400 hover:underline">
          Calendar
        </Link>
        {user && (
    <button
      onClick={logout}
      className="text-sm text-gray-100 dark:text-blue-400 hover:underline"
    >
      Logout
    </button>
  )}
      </nav>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ships"
            element={
              <PrivateRoute>
                <ShipsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ships/:id"
            element={
              <PrivateRoute>
                <ShipDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <JobsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <CalendarPage />
              </PrivateRoute>
            }
          />
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
