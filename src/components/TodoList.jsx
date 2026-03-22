import { useEffect, useState } from "react"
import CreateTodo from "./CreateTodo"
import { getTodos } from "../services/api";
import TodoItem from "./TodoItem";

function TodoList({ onLogout, token, username }) {
    const [todos, setTodos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [orderBy, setOrderBy] = useState("id"); // id, title or completed
    const [direction, setDirection] = useState("desc") //desc or asc
    const [filter, setFilter] = useState(null); // null, true or false
    const [showForm, setShowForm] = useState(false);
    

    useEffect(() => {
        if (!token) return;

        async function fetchTodos() {
            const result = await getTodos(token, limit, page, orderBy, direction, filter);
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
    }, [token, onLogout, limit, page, orderBy, direction, filter]);

    async function loadTodos() {
        const result = await getTodos(token, limit, page, orderBy, direction, filter);
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
        <div className="container mt-5 mb-5 px-0">
            <div className="d-flex justify-content-between p-2">
                <h1>📝 Lista de Tarefas</h1>
                <button onClick={onLogout} className="btn btn-outline-danger">Logout</button>
            </div>

            <div className="border rounded shadow px-1 px-md-5 pt-5 pb-2">
                <h2 className="mb-3">Tarefas de {username} ({total})</h2>
                <div className="row">
                    <div className="mb-3 col">
                        <button onClick={() => setShowForm(true)} className="btn btn-success">Criar Tarefa</button>
                    </div>
                    <div className="col btn-group mb-3 d-flex justify-content-end">
                        <div className="btn-group">
                            <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown">
                                Ordenar
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={() => { setOrderBy("id"); setDirection("desc"); }}>Por Mais Recentes</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => { setOrderBy("id"); setDirection("asc"); }}>Por Mais Antigos</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => { setOrderBy("title"); setDirection("asc"); }}>Por Título A-Z</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => { setOrderBy("title"); setDirection("desc"); }}>Por Título Z-A</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => { setOrderBy("completed"); setDirection("desc"); }}>Finalizados Primeiro</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => { setOrderBy("completed"); setDirection("asc"); }}>Pendentes Primeiro</a></li>
                            </ul>
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown">
                                Filtrar
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={() => setFilter(null)}>Todos</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => setFilter("true")}>Finalizados</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => setFilter("false")}>Pendentes</a></li>
                            </ul>
                        </div>
                    </div>
                    <CreateTodo token={token} onCreate={loadTodos} showForm={showForm} setShowForm={setShowForm}/>

                </div>
                {todos.map((todo) => (
                    <TodoItem todo={todo} token={token} key={todo.id} reload={loadTodos}/>
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