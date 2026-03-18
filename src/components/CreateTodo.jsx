import { useState } from "react"
import { createTodo } from "../services/api"

function CreateTodo({ token, onTodoCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const newTodo = await createTodo(title, description, token)

    if (!newTodo) {
      alert("Failed to create todo")
      return
    }

    onTodoCreated(newTodo)

    // Reset form
    setTitle("")
    setDescription("")
  }

  return (
    <>
      {/* Add New Button */}
      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#createTodoModal"
      >
        Nova Tarefa
      </button>

      {/* Modal */}
      <div className="modal fade" id="createTodoModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Nova Tarefa</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit} id="createTodoForm">

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>

              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="createTodoForm"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Add Todo
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTodo