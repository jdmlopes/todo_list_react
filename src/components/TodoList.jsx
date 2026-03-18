import { useEffect, useState } from "react"
import CreateTodo from "./CreateTodo"
import { getTodos, putTodo, deleteTodo } from "../services/api";

function TodoList({ token }) {
    const [todos, setTodos] = useState([])
    const [selectedTodo, setSelectedTodo] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [limit, setLimit] = useState(6)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [pages, setPages] = useState(1)
    const [filter, setFilter] = useState(null)
    const [orderBy, setOrderBy] = useState(null)
    const [orderDir, setOrderDir] = useState("asc")

    useEffect(() => {
        async function load() {
            const result = await getTodos(token, limit, page, orderBy, orderDir, filter);
            setTodos(result.data)
            setLimit(result.limit)
            setPage(result.page)
            setTotal(result.total)
            setPages(Math.ceil(result.total / result.limit))
        }
        load();
    }, [token, page, limit, filter, orderBy, orderDir]);

    function handleTodoCreated(newTodo) {
        setTodos([...todos, newTodo])
    }

    async function removeTodo(id) {
        const deleted = await deleteTodo(id, token);
        if (!deleted) {
            alert("Failed to delete todo")
            return
        }
        setTodos(todos.filter(todo => todo.id !== id))
    }

    async function toggleTodo(todo) {
        const updatedTodo = await putTodo(todo, token)

        if (!updatedTodo) {
            alert("Failed to update todo")
            return
        }

        setTodos(prev =>
            prev.map(t =>
                t.id === updatedTodo.id ? updatedTodo : t
            )
        )
    }

    function openEdit(todo) {
        setSelectedTodo(todo)
        setEditTitle(todo.title)
        setEditDescription(todo.description || "")
    }

    async function saveEdit() {
        const updated = await putTodo(
            {
                ...selectedTodo,
                title: editTitle,
                description: editDescription
            },
            token
        )

        if (!updated) {
            alert("Failed to update todo")
            return
        }

        setTodos(todos.map(t =>
            t.id === updated.id ? updated : t
        ))

        setSelectedTodo(null)
    }

    return (
        <div>
            <h2 className="mb-4">Tarefas {`(${total})`}</h2>

            <CreateTodo token={token} onTodoCreated={handleTodoCreated} />
            {/* Filter & Sort Controls */}
            <div className="d-flex gap-2 mb-3 flex-wrap">

                {/* Filter by Completed */}
                <select
                    className="form-select"
                    style={{ width: "200px" }}
                    value={""}
                    onChange={(e) => {
                        setPage(1); // reset to first page
                        const val = e.target.value;
                        setFilter(val === "" ? null : val === "completed");
                    }}
                >
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="not_completed">Not Completed</option>
                </select>

                {/* Sort by Title */}
                <button
                    className={`btn btn-outline-secondary ${orderBy === "title" ? "active" : ""}`}
                    onClick={() => {
                        setPage(1); // reset to first page
                        if (orderBy === "title") {
                            // toggle ascending / descending
                            setOrderDir(orderDir === "asc" ? "desc" : "asc");
                        } else {
                            setOrderBy("title");
                            setOrderDir("asc");
                        }
                    }}
                >
                    Sort by Title {orderBy === "title" ? (orderDir === "asc" ? "↑" : "↓") : ""}
                </button>


            </div>
            <div className="row g-3">
                {todos.map(todo => (
                    <div key={todo.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">

                                {/* Header */}
                                <div className="d-flex justify-content-between align-items-start mb-2">

                                    <h5 className={`card-title mb-0 ${todo.completed ? "text-decoration-line-through text-muted" : ""
                                        }`}>
                                        {todo.title}
                                    </h5>

                                    <input
                                        type="checkbox"
                                        className="bg-success"
                                        checked={todo.completed}
                                        onChange={(e) => toggleTodo(todo, e.target.checked)}
                                        style={{ width: "1.5rem", height: "1.5rem" }}
                                    />
                                </div>

                                {/* Description */}
                                <p className={`mb-3 small ${todo.completed ? "text-muted" : "text-secondary"
                                    }`}>
                                    {todo.description || "No description"}
                                </p>

                                {/* Buttons */}
                                <div className="mt-auto d-flex gap-2">
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editModal"
                                        onClick={() => openEdit(todo)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => removeTodo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ul className="pagination pt-3">
                <li className="page-item" key={0}>
                    <button className="page-link" onClick={() => page > 1 ? setPage(page - 1) : setPage(1)}>Anterior</button>
                </li>
                {Array.from({ length: pages }, (_, i) => (
                    <li className={page == i + 1 ? 'page-item active' : 'page-item'} key={i + 1}>
                        <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                    </li>
                ))}
                <li className="page-item" key={pages + 1}>
                    <button className="page-link" onClick={() => page < pages ? setPage(page + 1) : setPage(pages)}>Próxima</button>
                </li>
            </ul>





            {/* Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Edit Todo</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <input
                                className="form-control mb-3"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Title"
                            />

                            <textarea
                                className="form-control"
                                rows="3"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={saveEdit}
                                data-bs-dismiss="modal"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList