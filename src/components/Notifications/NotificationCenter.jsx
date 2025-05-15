import { useNotifications } from "../../contexts/NotificationsContext";

const NotificationCenter = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-4 py-3 rounded shadow-md text-white ${
            n.type === "success" ? "bg-green-600" :
            n.type === "error" ? "bg-red-600" : "bg-blue-600"
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{n.message}</span>
            <button
              onClick={() => dismissNotification(n.id)}
              className="ml-4 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
