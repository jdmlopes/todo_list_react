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
            console.log(result);
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
        setTodos(prev => prev.map(t => t.id === updatedTodo.id ? updatedTodo : t))
    }

    function openEdit(todo) {
        setSelectedTodo(todo)
        setEditTitle(todo.title)
        setEditDescription(todo.description || "")
    }

    async function saveEdit() {
        const updated = await putTodo(
            { ...selectedTodo, title: editTitle, description: editDescription },
            token
        )
        if (!updated) {
            alert("Failed to update todo")
            return
        }
        setTodos(todos.map(t => t.id === updated.id ? updated : t))
        setSelectedTodo(null)
    }

    return (
        <div>
            <h2 className="mb-4">Tarefas {`(${total})`}</h2>

            {/* Toolbar */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                {/* Filters & Sort */}
                <div className="d-flex flex-wrap align-items-center gap-3">

                    {/* Status Filter (checkboxes) */}
                    <div>
                        <span className="form-label small text-muted d-block mb-1">Status</span>
                        <div className="d-flex gap-2">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="completed"
                                    checked={filter === true}
                                    onChange={() => setFilter(filter === true ? null : true)}
                                />
                                <label className="form-check-label small" htmlFor="completed">
                                    Finalizado
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="pending"
                                    checked={filter === false}
                                    onChange={() => setFilter(filter === false ? null : false)}
                                />
                                <label className="form-check-label small" htmlFor="pending">
                                    Pendente
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Sort Buttons */}
                    <div>
                        <span className="form-label small text-muted d-block mb-1">Ordenar por:</span>
                        <div className="btn-group btn-group-sm">
                            {["id", "title", "completed"].map(field => {
                                const isActive = orderBy === field;

                                return (
                                    <button
                                        key={field}
                                        className={`btn ${isActive ? "btn-primary" : "btn-outline-primary"
                                            }`}
                                        onClick={() => {
                                            if (orderBy !== field) {
                                                setOrderBy(field);
                                                setOrderDir("asc");
                                            } else if (orderDir === "asc") {
                                                setOrderDir("desc");
                                            } else {
                                                setOrderBy(null); // reset
                                                setOrderDir("asc");
                                            }
                                        }}
                                    >
                                        {field}{" "}
                                        {isActive && (orderDir === "asc" ? "↑" : "↓")}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Create Button */}
                <CreateTodo token={token} onTodoCreated={handleTodoCreated} />
            </div>

            <div className="row g-3">
                {todos.map(todo => (
                    <div key={todo.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">

                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className={`card-title mb-0 ${todo.completed ? "text-decoration-line-through text-muted" : ""}`}>
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

                                <p className={`mb-3 small ${todo.completed ? "text-muted" : "text-secondary"}`}>
                                    {todo.description || "No description"}
                                </p>

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
                <li className="page-item">
                    <button className="page-link" onClick={() => page > 1 ? setPage(page - 1) : setPage(1)}>Anterior</button>
                </li>
                {Array.from({ length: pages }, (_, i) => (
                    <li className={page == i + 1 ? 'page-item active' : 'page-item'} key={i + 1}>
                        <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                    </li>
                ))}
                <li className="page-item">
                    <button className="page-link" onClick={() => page < pages ? setPage(page + 1) : setPage(pages)}>Próxima</button>
                </li>
            </ul>

            {/* Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
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
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={saveEdit} data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList