import { useAuth } from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div>
      <div>
        <h1>Welcome, {user.name}</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <h2>Practice</h2>
      {/* hardcoded for now — will be dynamic once Question model is built */}
      <div onClick={() => navigate("/interview/test-question-id")}
        style={{ cursor: "pointer", padding: "1rem", border: "1px solid #ccc" }}>
        <h3>LRU Cache</h3>
        <p>Medium · Flipkart · Heaps</p>
      </div>
    </div>
  )
}
