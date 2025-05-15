import { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info") => {
    const id = crypto.randomUUID();
    const newNotification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, dismissNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
