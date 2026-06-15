import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { Link } from "react-router-dom"

export default function Register() {
  const { register, loading, error } = useAuth()
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" })
  const [localError, setLocalError] = useState(null)

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalError(null)

    // client-side validation before hitting network
    if (form.password !== form.confirm) {
      setLocalError("Passwords do not match")
      return
    }
    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters")
      return
    }
    
    register(form.name, form.email, form.password)
  }

  return (
    <div>
      <h1>Create account</h1>
      {(error || localError) && (
        <p style={{ color: "red" }}>{localError || error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Full name"
          value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email"
          value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password"
          value={form.password} onChange={handleChange} required />
        <input name="confirm" type="password" placeholder="Confirm password"
          value={form.confirm} onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}
