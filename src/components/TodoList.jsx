import { useEffect, useState } from "react"
import CreateTodo from "./CreateTodo"

function TodoList({ token }) {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        async function loadTodos() {
            const response = await fetch("http://localhost:5059/todos", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json()
            setTodos(result.data)
        }

        loadTodos()
    }, [token]);

    function handleTodoCreated(newTodo) {
        setTodos([...todos, newTodo])
    }

    async function deleteTodo(id) {
        const response = await fetch(`http://localhost:5059/todos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            alert("Failed to delete todo")
            return
        }

        setTodos(todos.filter(todo => todo.id !== id))
    }

    async function toggleTodo(todo) {
        const response = await fetch(`http://localhost:5059/todos/${todo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                ...todo,
                completed: !todo.completed
            })
        })

        if (!response.ok) {
            alert("Failed to update todo")
            return
        }

        const updatedTodo = await response.json()

        setTodos(
            todos.map(t =>
                t.id === updatedTodo.id ? updatedTodo : t
            )
        )
    }

    return (
        <div>
            <CreateTodo token={token} onTodoCreated={handleTodoCreated} />

            <h2>Todos</h2>

            <ul>
                {todos.map(todo => (

                    <li key={todo.id}>
                        {todo.title} {todo.completed ? "✅" : "❌"}

                        <button onClick={() => toggleTodo(todo)}>
                            Toggle
                        </button>

                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
                    </li>

                ))}
            </ul>
        </div>
    )
}

export default TodoList