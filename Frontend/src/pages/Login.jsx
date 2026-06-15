import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { Link } from "react-router-dom"

export default function Login() {
  const { login, loading, error } = useAuth()
  const [form, setForm] = useState({ email: "", password: "" })

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    login(form.email, form.password)
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email"
          value={form.email} onChange={handleChange} required />
        <input name="password" type="password" plrceholder="Password"
          value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  )
}
