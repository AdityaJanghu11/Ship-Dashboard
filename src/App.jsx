// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ShipsProvider } from "./contexts/ShipsContext";
import { ComponentsProvider } from "./contexts/ComponentsContext";
import { JobsProvider } from "./contexts/JobsContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";

import AppRoutes from "./AppRoutes"; // routes with AnimatePresence & PrivateRoute
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  return (
    <AuthProvider>
      <ShipsProvider>
        <ComponentsProvider>
          <JobsProvider>
            <NotificationsProvider>
              <Router>
                <AppRoutes />
                <DarkModeToggle />
              </Router>
            </NotificationsProvider>
          </JobsProvider>
        </ComponentsProvider>
      </ShipsProvider>
    </AuthProvider>
  );
}

export default App;
