import { useState } from "react";
import { register } from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await register(name, email, password);

    if (data == null) {
      alert("User was not created");
      return;
    }

    alert("User Created successfully!!!");
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" />
      </form>
    </>
  );

}

export default Register;