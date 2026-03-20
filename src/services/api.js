const APIURL = "http://localhost:5059";

export async function getTodos(token,limit='5',page='1',orderby="id",direction="desc",completed=null) {
  let flags = `?limit=${limit}&page=${page}`;
  if(orderby != null && direction != null)
    flags += `&orderby=${orderby}&direction=${direction}`;
  if(completed != null)
    flags += `&orderby=${orderby}&direction=${direction}`;
  const response = await fetch(`${APIURL}/todos${flags}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if(response.status === 401)
    return null;
  

  return response.json();
}

export async function createTodo(title, description, token) {
  const response = await fetch(`${APIURL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      completed: false,
    }),
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function putTodo(todo, token) {
  const response = await fetch(`${APIURL}/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...todo,
      completed: !todo.completed,
    }),
  });

  if (!response.ok) return null;

  return response.json();
}

export async function deleteTodo(id, token) {
  const response = await fetch(`${APIURL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.ok;
}

export async function login(email, password) {
  const response = await fetch(`${APIURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) return null;

  return response.json();
}

export async function register(name, email, password) {
  const response = await fetch(`${APIURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) return null;

  return response.json();
}
