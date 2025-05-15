import { useState } from "react";
import { useShips } from "../../contexts/ShipsContext";

const ShipForm = () => {
  const { addShip } = useShips();
  const [form, setForm] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addShip(form);
    setForm({ name: "", imo: "", flag: "", status: "Active" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label">Ship Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">IMO Number</label>
        <input
          name="imo"
          value={form.imo}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Flag</label>
        <input
          name="flag"
          value={form.flag}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="select"
        >
          <option value="Active">Active</option>
          <option value="In Dock">In Dock</option>
          <option value="Retired">Retired</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Add Ship</button>
    </form>
  );
};

export default ShipForm;
