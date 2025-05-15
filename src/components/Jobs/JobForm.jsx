import { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";

const JobForm = () => {
  const { addJob } = useJobs();
  const { components } = useComponents();
  const { ships } = useShips();

  const [form, setForm] = useState({
    shipId: "",
    componentId: "",
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
    setForm({
      shipId: "",
      componentId: "",
      type: "",
      priority: "Medium",
      status: "Open",
      assignedEngineerId: "",
      scheduledDate: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label">Ship</label>
        <select name="shipId" value={form.shipId} onChange={handleChange} className="select">
          <option value="">Select Ship</option>
          {ships.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label className="label">Component</label>
        <select name="componentId" value={form.componentId} onChange={handleChange} className="select">
          <option value="">Select Component</option>
          {components.map((c) => (
            <option key={c.id} value={c.id}>{c.name} ({c.serialNumber})</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="label">Type</label>
        <input type="text" name="type" value={form.type} onChange={handleChange} className="input" />
      </div>

      <div className="form-group">
        <label className="label">Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange} className="select">
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="form-group">
        <label className="label">Engineer ID</label>
        <input type="text" name="assignedEngineerId" value={form.assignedEngineerId} onChange={handleChange} className="input" />
      </div>

      <div className="form-group">
        <label className="label">Scheduled Date</label>
        <input type="date" name="scheduledDate" value={form.scheduledDate} onChange={handleChange} className="input" />
      </div>

      <button type="submit" className="btn btn-primary">Create Job</button>
    </form>
  );
};

export default JobForm;
