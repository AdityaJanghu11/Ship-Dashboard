import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";
import { useNotifications } from "../../contexts/NotificationsContext";

const JobForm = () => {
  const { addJob } = useJobs();
  const { components } = useComponents();
  const { ships } = useShips();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState({
    componentId: "",
    shipId: "",
    type: "",
    priority: "Medium",
    status: "Open",
    assignedEngineerId: "",
    scheduledDate: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(form);
    addNotification("Job created successfully", "success");
    setForm({
      componentId: "",
      shipId: "",
      type: "",
      priority: "Medium",
      status: "Open",
      assignedEngineerId: "",
      scheduledDate: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-lg mb-8">
      <select
        name="shipId"
        value={form.shipId}
        onChange={handleChange}
        className="w-full border rounded px-2 py-2"
        required
      >
        <option value="">Select Ship</option>
        {ships.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <select
        name="componentId"
        value={form.componentId}
        onChange={handleChange}
        className="w-full border rounded px-2 py-2"
        required
      >
        <option value="">Select Component</option>
        {components.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.serialNumber})
          </option>
        ))}
      </select>

      <input
        type="text"
        name="type"
        placeholder="Job Type (e.g. Inspection)"
        value={form.type}
        onChange={handleChange}
        className="w-full border px-2 py-2 rounded"
        required
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full border px-2 py-2 rounded"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <input
        type="text"
        name="assignedEngineerId"
        placeholder="Assigned Engineer ID"
        value={form.assignedEngineerId}
        onChange={handleChange}
        className="w-full border px-2 py-2 rounded"
        required
      />

      <input
        type="date"
        name="scheduledDate"
        value={form.scheduledDate}
        onChange={handleChange}
        className="w-full border px-2 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Job
      </button>
    </form>
  );
};

export default JobForm;
