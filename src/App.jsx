import { useState } from "react"
import Auth from "./components/Auth";
import TodoList from "./components/TodoList"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");

  function handleLogin(newToken, name) {
    setToken(newToken);
    setUsername(name);
    localStorage.setItem("token", newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token")
  }


  return (
    <div
      className="container-fluid d-flex justify-content-center align-content-center min-vh-100">
    {token == null ?
      <Auth onLogin={handleLogin}
            token={token}/> :
      <TodoList onLogout={handleLogout}
                token={token}
                username={username} />}
    </div>
  );
}

export default App