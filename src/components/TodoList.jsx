import { useEffect, useState } from "react"
import CreateTodo from "./CreateTodo"
import { getTodos, putTodo } from "../services/api";
import { deleteTodo } from "../services/api";

function TodoList({ token }) {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        async function load() {
            const result = await getTodos(token);
            setTodos(result.data)
        }

        load();
    }, [token]);

    function handleTodoCreated(newTodo) {
        setTodos([...todos, newTodo])
    }

    async function removeTodo(id) {
        const deleted = await deleteTodo(id,token);

        if (!deleted) {
            alert("Failed to delete todo")
            return
        }

        setTodos(todos.filter(todo => todo.id !== id))
    }

    async function toggleTodo(todo) {
        const updatedTodo = await putTodo(todo,token)

        if (updatedTodo == null) {
            alert("Failed to update todo")
            return
        }

        setTodos(
            todos.map(t =>
                t.id === updatedTodo.id ? updatedTodo : t
            )
        )
    }

    return (
        <>
        </>
    );
}

export default TodoList