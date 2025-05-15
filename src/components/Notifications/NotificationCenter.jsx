import { useNotifications } from "../../contexts/NotificationsContext";
import { AnimatePresence, motion } from "framer-motion";

const NotificationCenter = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 w-80">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded shadow-lg text-white flex justify-between items-start ${
              n.type === "success"
                ? "bg-green-600"
                : n.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
          >
            <div className="flex-1 pr-4">
              <p className="text-sm">{n.message}</p>
            </div>
            <button
              onClick={() => dismissNotification(n.id)}
              className="text-xs underline text-white hover:opacity-75"
            >
              Dismiss
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
