import { useState } from "react";
import { putTodo } from "../services/api";


function TodoItem({ todo, token }) {
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
                <textarea
                    value={description}
                    className="border-0 w-100"
                    rows={4}
                    style={{ resize: "none" }}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={updateTodo}
                />

            </form>
        </div>
    );
}

export default TodoItem;