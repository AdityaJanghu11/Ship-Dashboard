import { useState } from "react";
import { useComponents } from "../../contexts/ComponentsContext";

const ComponentForm = ({ shipId }) => {
  const { addComponent } = useComponents();
  const [form, setForm] = useState({
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addComponent({ ...form, shipId });
    setForm({
      name: "",
      serialNumber: "",
      installDate: "",
      lastMaintenanceDate: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label">Component Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Serial Number</label>
        <input
          name="serialNumber"
          value={form.serialNumber}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Install Date</label>
        <input
          name="installDate"
          type="date"
          value={form.installDate}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Last Maintenance Date</label>
        <input
          name="lastMaintenanceDate"
          type="date"
          value={form.lastMaintenanceDate}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Add Component</button>
    </form>
  );
};

export default ComponentForm;
