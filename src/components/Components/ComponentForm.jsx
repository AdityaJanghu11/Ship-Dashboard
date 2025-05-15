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
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        name="name"
        placeholder="Component Name"
        onChange={handleChange}
        value={form.name}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="serialNumber"
        placeholder="Serial Number"
        onChange={handleChange}
        value={form.serialNumber}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="installDate"
        type="date"
        onChange={handleChange}
        value={form.installDate}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="lastMaintenanceDate"
        type="date"
        onChange={handleChange}
        value={form.lastMaintenanceDate}
        className="w-full border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Component
      </button>
    </form>
  );
};

export default ComponentForm;
