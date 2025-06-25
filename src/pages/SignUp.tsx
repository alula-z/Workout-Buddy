import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secondaryPassword, setSecondaryPassword] = useState('')
    const navigate = useNavigate()
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
          await createUserWithEmailAndPassword(auth, email, password)
          navigate('/')
        } catch (error) {
          alert('Login failed: ' + error)
        }
    }
    return (
        <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={secondaryPassword}
          onChange={(e) => setSecondaryPassword(e.target.value)}
          placeholder="Retype Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
    )
}