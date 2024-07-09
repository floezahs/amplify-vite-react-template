import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import "./App.css";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    let content = window.prompt("Todo content");

    if (content === "") {
      alert("No se puede ingresar un campo vacío");
      return;
    }

    if (content !== null) {

      let Ocontent = { content: content }
      // El usuario hizo clic en "Aceptar"
      console.log("Contenido ingresado:", content);
      client.models.Todo.create(Ocontent);
    } else {
      // El usuario hizo clic en "Cancelar"
      console.log("El usuario canceló el prompt");
    }
  }



  function handleDeleteClick(id: string) {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este todo?");
    if (confirmDelete) {
      client.models.Todo.delete({ id })
    }
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul className="max-heigth">
        {todos.map((todo) => (
          <li
            key={todo.id}>{todo.content}
            <br />
            <button onClick={() => handleDeleteClick(todo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
