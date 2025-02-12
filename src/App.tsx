import "./App.css";

import { Button, Alert, Form } from "react-bootstrap";
import { TodoItem } from "./types";
import TodoList from "./components/TodoList";
import { defaultTodos } from "./data";
import { useState } from "react";

function App() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");

  const [todos, setTodos] = useState<TodoItem[]>(defaultTodos);

  const addTodo = () => {
    if (!newTodo) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    const todo: TodoItem = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      {showAlert && (
        <Alert
          variant="danger"
          style={{ marginTop: "15px" }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {/* <Alert.Heading>You got an error!</Alert.Heading> */}
          <p>
            Please enter a task before adding it to the list! The task cannot be
            empty.
          </p>
        </Alert>
      )}
      <h1>MUST DO</h1>
      <Form.Control
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a task"
      />
      <Button className="mt-2 mb-2" onClick={addTodo}>
        ADD
      </Button>
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;