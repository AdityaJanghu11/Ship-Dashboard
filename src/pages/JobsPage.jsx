import { useState } from "react";
import { useJobs } from "../contexts/JobsContext";
import JobForm from "../components/Jobs/JobForm";
import JobList from "../components/Jobs/JobList";
const JobsPage = () => {
  const { jobs } = useJobs();

  const [filters, setFilters] = useState({
    shipId: "",
    status: "",
    priority: ""
  });

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.shipId === "" || job.shipId === filters.shipId) &&
      (filters.status === "" || job.status === filters.status) &&
      (filters.priority === "" || job.priority === filters.priority)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Maintenance Jobs</h1>

      <JobForm />

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          name="shipId"
          placeholder="Filter by Ship ID"
          value={filters.shipId}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <JobList jobs={filteredJobs} />
    </div>
  );
};

export default JobsPage;
