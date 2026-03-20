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
    <>
    </>

  );
}

export default CreateTodo