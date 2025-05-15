import { useJobs } from "../../contexts/JobsContext";
import { useAuth } from "../../contexts/AuthContext";

const JobList = ({ shipId }) => {
  const { jobs, updateJob } = useJobs();
  const { user } = useAuth();

  const filtered = shipId ? jobs.filter((j) => j.shipId === shipId) : jobs;

  if (filtered.length === 0) {
    return <p className="text-gray-600">No jobs to show.</p>;
  }

  const handleStatusChange = (id, status) => {
    updateJob(id, { status });
  };

  return (
    <ul className="space-y-3">
      {filtered.map((job) => (
        <li
          key={job.id}
          className="border p-3 rounded bg-white shadow-sm flex justify-between items-start"
        >
          <div>
            <div className="font-semibold text-blue-800">{job.type}</div>
            <div className="text-sm text-gray-600">Component ID: {job.componentId}</div>
            <div className="text-sm text-gray-600">Priority: {job.priority}</div>
            <div className="text-sm text-gray-600">Engineer: {job.assignedEngineerId}</div>
            <div className="text-sm text-gray-600">Scheduled: {job.scheduledDate}</div>
            <div className="text-sm text-gray-600 mb-1">Status: {job.status}</div>
            {user?.role === "Engineer" && job.status !== "Completed" && (
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value)}
                className="select mt-1"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default JobList;
