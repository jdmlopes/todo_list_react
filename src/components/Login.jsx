import { useState } from "react"
import { login } from "../services/api"
import Register from "./Register"


function Login({ onLogin }) {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const data = await login(email, password)

    if (data == null) {
      alert("Login failed")
      return;
    }

    onLogin(data.token)
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ minWidth: "350px", maxWidth: "400px" }}>
        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </li>
        </ul>

        {/* Tab content */}
        {activeTab === "login" && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        )}

        {activeTab === "register" && <Register />}
      </div>
    </div>
  )
}

export default Login