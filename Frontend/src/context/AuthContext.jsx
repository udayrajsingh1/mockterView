import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginUser, registerUser } from "../api/auth.js";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user")
        return stored? JSON.parse(stored) : null
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const login = async (email, password) => {
        setLoading(true)
        setError(null)
        try{
            const res = await loginUser({ email, password})
            const {token, user} = res.data

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUser(user)
            navigate("/dashboard")
        }catch(err){
            setError(err.response?.data?.message || "login failed")
        } finally {
            setLoading(false)
        }
    }

    const register = async (name, email, password) => {
        setLoading(true)
        setError(null)
        try {
            const res = await registerUser({name, email, password})
            const {token, user} = res.data

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUser(user)
            navigate("/dashboard")

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
        }finally{
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider value ={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)