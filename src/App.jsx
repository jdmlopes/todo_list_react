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
    <div>
      <h1>Todo App</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <TodoList token={token} />
    </div>
  )
}

export default App