import { useState } from "react"
import { login } from "../services/api"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    const data = await login(email,password);
    if (data == null) {
      alert("Login failed");
      return;
    }
    onLogin(data.token)
  }

  return (
    <>
    <form action="" onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <input type="submit" />
    </form>
    </>
  )
}

export default Login