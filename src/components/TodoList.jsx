import { useEffect, useState } from "react"
import CreateTodo from "./CreateTodo"
import { getTodos } from "../services/api";
import TodoItem from "./TodoItem";

function TodoList({ onLogout, token }) {
    const [todos, setTodos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        if (!token) return;

        async function fetchTodos() {
            const result = await getTodos(token, limit, page);
            if (!result) {
                onLogout();
                return;
            }
            setTodos(result.data);
            setTotal(result.total);
            setPage(result.page);
            setLimit(result.limit);
        }

        fetchTodos();
    }, [token, onLogout, limit, page]);

    async function loadTodos() {
        const result = await getTodos(token, limit, page);
        if (!result) {
            onLogout();
            return;
        }
        setTodos(result.data);
        setTotal(result.total);
        setPage(result.page);
        setLimit(result.limit);
    }


    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-between p-2">
                <h1>📝 Lista de Tarefas</h1>
                <button onClick={onLogout} className="btn btn-outline-danger">Logout</button>
            </div>

            <div className="border rounded shadow px-5 pt-5 pb-2">
                <h2 className="mb-3">Tarefas ({total})</h2>
                <CreateTodo token={token} onCreate={loadTodos} />
                {todos.map((todo) => (
                    <TodoItem todo={todo} token={token} key={todo.id} />
                ))}

                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link"
                            onClick={() => page > 1 && setPage(page - 1)}>
                            Anterior
                        </button>
                    </li>
                    {Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1).map((n) => (
                        <li className={`page-item ${n == page && 'active'}`} key={n}>
                            <button className="page-link" onClick={() => setPage(n)}>{n}</button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button className="page-link"
                            onClick={() => page < Math.ceil(total / limit) && setPage(page + 1)}>
                            Próxima
                        </button>
                    </li>
                </ul>

            </div>


        </div>
    );
}

export default TodoList