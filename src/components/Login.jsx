import { useState } from "react"
import { login } from "../services/api"
import Register from "./Register"
import 'bootstrap/dist/css/bootstrap.min.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const data = await login(email,password)

    if (data == null) {
      alert("Login failed")
      return;
    }

    onLogin(data.token)
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>

    <Register />
    </div>
  )
}

export default Login