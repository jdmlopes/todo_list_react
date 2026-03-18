import { useState } from "react"
import Login from "./components/Login"
import TodoList from "./components/TodoList"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  function handleLogin(newToken) {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  function handleLogout() {
    if (!confirm("Logout?")) return;

    localStorage.removeItem("token")
    setToken(null)
  }

  if (!token) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">📝 Lista de Tarefas</h1>

          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Sair
          </button>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <TodoList token={token} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App