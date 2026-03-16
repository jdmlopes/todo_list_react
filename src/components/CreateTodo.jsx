import { useState } from "react"

function CreateTodo({ token, onTodoCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await fetch("http://localhost:5059/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description,
        completed: false
      })
    });

    if (!response.ok) {
      alert("Failed to create todo");
      return;
    }

    const newTodo = await response.json();

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