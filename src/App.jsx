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
    <>
    {token == null ?
      <Auth onLogin={handleLogin}
            token={token}/> :
      <TodoList onLogout={handleLogout}
                token={token} />}
    </>
  );
}

export default App