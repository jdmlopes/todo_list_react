import { useState } from "react";
import { deleteTodo, putTodo } from "../services/api";


function TodoItem({ todo, token, reload }) {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [completed, setCompleted] = useState(todo.completed)

    async function updateTodo() {
        const updated = {
            ...todo,
            title,
            description,
            completed
        };

        const result = await putTodo(updated, token);

        if (!result) {
            alert("Failed to update todo");
        }
    }

    async function removeTodo() {
        const deleted = deleteTodo(todo.id,token);
        if(!deleted){
            alert("Tarefa não foi excluída");
            return;
        }
        reload();
        alert("Tarefa excluida com sucesso");

    }

    return (
        <div className="border rounded p-3 mb-3">
            <form>
                <div className="d-flex justify-content-between gap-5">
                    <input
                        type="text"
                        value={title}
                        className="h3 border-0 w-100"
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={updateTodo}
                    />
                    <input
                        type="checkbox"
                        checked={completed}
                        className="form-check-input fs-2 border-3"
                        onChange={(e) => {
                            setCompleted(e.target.checked);
                            updateTodo();
                        }}
                    />
                </div>
                <div className="d-flex justify-content-between gap-5">
                    <textarea
                        value={description}
                        className="border-0 w-100"
                        rows={4}
                        style={{ resize: "none" }}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={updateTodo}
                    />
                    <div className="align-self-end">
                        <button className="btn fs-3 text-danger p-0" onClick={removeTodo}><i className="bi bi-trash"></i></button>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default TodoItem;