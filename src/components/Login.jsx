import { useState } from "react"
import { login } from "../services/api"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    const data = await login(email, password);
    if (data == null) {
      alert("Login failed");
      return;
    }
    onLogin(data.token)
  }

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3 ">
          <div className="mb-3">
            <label className="form-label">E-mail </label>
            <input
              className="form-control"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha </label>
            <input
              className="form-control"
              type="password"
              value={password}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <input
            className="btn btn-primary"
            type="submit"
            value="Login" />
        </div>

      </form>
    </>
  )
}

export default Login