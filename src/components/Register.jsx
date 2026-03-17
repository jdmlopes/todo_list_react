import { useState } from "react";
import { register } from "../services/api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()
    
        const data = await register(name,email,password);
    
        if (data == null) {
          alert("User was not created")
          return;
        }
    
        alert("User Created successfully!!!");
      }

    return (
        <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
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

      <button type="submit">Register</button>
    </form>

    );

}

export default Register;