import { useState } from "react"
import { createTodo } from "../services/api"

function CreateTodo({ token, onTodoCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const newTodo = await createTodo(title,description,token);

    if (newTodo == null) {
      alert("Failed to create todo");
      return;
    }
    onTodoCreated(newTodo);

    setTitle("");
    setDescription("");

  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Todo</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button type="submit">Add Todo</button>
    </form>
  )
}

export default CreateTodo