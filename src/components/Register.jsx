import { useState } from "react";
import { register } from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault()

    const data = await register(name, email, password);

    if (data == null) {
      alert("User was not created")
      return;
    }

    alert("User Created successfully!!!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Register</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

      <button type="submit" className="btn btn-success w-100">
        Register
      </button>
    </form>

  );

}

export default Register;