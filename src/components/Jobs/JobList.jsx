import { useJobs } from "../../contexts/JobsContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../contexts/NotificationsContext";

const JobList = ({ shipId, jobs: overrideJobs }) => {
  const { jobs, updateJob } = useJobs();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const filtered = overrideJobs ?? (shipId ? jobs.filter(j => j.shipId === shipId) : jobs);

  const handleStatusChange = (id, status) => {
    updateJob(id, { status });
    addNotification(`Job marked as "${status}"`, "info");
  };

  return (
    <div className="p-4 bg-white border rounded">
      <ul className="space-y-4">
        {filtered.map((job) => (
          <li key={job.id} className="border p-3 rounded">
            <div><strong>Type:</strong> {job.type}</div>
            <div><strong>Priority:</strong> {job.priority}</div>
            <div><strong>Status:</strong> {job.status}</div>
            <div><strong>Engineer ID:</strong> {job.assignedEngineerId}</div>
            <div><strong>Date:</strong> {job.scheduledDate}</div>

            {user?.role === "Engineer" && (
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value)}
                className="mt-2 border rounded px-2 py-1"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
