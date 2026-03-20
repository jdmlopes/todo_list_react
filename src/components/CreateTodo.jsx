import { useState } from "react"
import { createTodo } from "../services/api"

function CreateTodo({ token, onCreate }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const newTodo = await createTodo(title, description, token);

    if (newTodo == null) {
      alert("Failed to create todo");
      return;
    }
    closeForm();
    onCreate();
  }

  function closeForm() {
    setShowForm(false);
    setTitle("");
    setDescription("");
    setCompleted(false);
  }

  return (
    <>
      <div className="mb-3">
        <button onClick={() => setShowForm(true)} className="btn btn-primary">Criar Tarefa</button>
      </div>
      {showForm &&
        <div className="border rounded p-3 mb-3">
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between gap-5">
              <input
                type="text"
                value={title}
                placeholder="Título"
                className="h3 border-0 w-100"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="checkbox"
                checked={completed}
                className="form-check-input fs-2 border-3"
                onChange={(e) => {
                  setCompleted(e.target.checked);
                }}
              />
            </div>
            <textarea
              value={description}
              placeholder="Descrição da Tarefa"
              className="border-0 w-100"
              rows={4}
              style={{ resize: "none" }}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="d-flex gap-2 pt-2">
              <input type="submit" className="btn btn-success" value="Salvar" />
              <button className="btn btn-danger" onClick={closeForm}>Cancelar</button>
            </div>
          </form>
        </div>
      }
    </>
  );
}

export default CreateTodo