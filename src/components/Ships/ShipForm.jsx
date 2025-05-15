import { useState } from "react";
import { useShips } from "../../contexts/ShipsContext";


const ShipForm = () => {
  const { addShip } = useShips();
  const [form, setForm] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addShip(form);
    setForm({ name: "", imo: "", flag: "", status: "Active" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        type="text"
        name="name"
        placeholder="Ship Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="imo"
        placeholder="IMO Number"
        value={form.imo}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="flag"
        placeholder="Flag"
        value={form.flag}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="Active">Active</option>
        <option value="Under Maintenance">Under Maintenance</option>
      </select>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Ship
      </button>
    </form>
  );
};

export default ShipForm;
