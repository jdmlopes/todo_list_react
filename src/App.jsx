import { useState } from "react"
import Auth from "./components/Auth";
import TodoList from "./components/TodoList"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  function handleLogin(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token")
  }


  return (
    <div
      className="container d-flex justify-content-center align-content-center min-vh-100">
    {token == null ?
      <Auth onLogin={handleLogin}
            token={token}/> :
      <TodoList onLogout={handleLogout}
                token={token} />}
    </div>
  );
}

export default App