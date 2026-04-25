import { useState } from "react";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!form.username.trim() || !form.password) {
      setError("Username and password are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const resp = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username.trim(), password: form.password }),
      });
      const result = await resp.json();
      if (!resp.ok) {
        setError(result.message || "Failed to sign up");
        return;
      }
      setError("");
      setSuccess("Signup successful. Please login.");
      setForm({ username: "", password: "", confirmPassword: "" });
      setTimeout(() => navigate("/login"), 900);
    } catch (e) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-indigo-100">
        <h1 className="text-2xl font-bold text-indigo-700 mb-2">Create an account</h1>
        <p className="text-sm text-slate-500 mb-4">Sign up to publish and manage your blogs.</p>
        {error && <div className="mb-3 rounded-md bg-red-50 border border-red-200 text-red-700 p-2 text-sm">{error}</div>}
        {success && <div className="mb-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 p-2 text-sm">{success}</div>}

        <form onSubmit={submit} className="space-y-3">
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="username" className="font-medium">Username</label>
            <input
              id="username"
              value={form.username}
              onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter username"
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
            />
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm password"
            />
          </div>
          <button type="submit" className="w-full rounded-lg bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-700 transition">Sign Up</button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-indigo-600 font-semibold hover:text-indigo-700">Login</button>
        </div>
      </div>
    </div>
  );
}
