import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(form.email, form.password);
    if (success) {
      setError("");
      navigate("/"); // redirect to dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      <div className="form-group">
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
