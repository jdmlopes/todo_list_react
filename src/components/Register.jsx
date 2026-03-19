import { useState } from "react";
import { register } from "../services/api";

function Register({page}) {
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
    page("login");
  }

  return (
    <>
      <h3>Cadastre-se</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3 ">
          <div className="mb-3">
            <label className="form-label">Nome </label>
            <input
              className="form-control"
              type="text"
              value={name}
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail </label>
            <input
              className="form-control"
              type="email"
              value={email}
              placeholder="email@gmail.com"
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
            value="Cadastre-se" />
        </div>

      </form>
    </>
  );

}

export default Register;