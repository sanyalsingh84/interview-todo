import { useState, useRef, useEffect } from "react";
import Tasks from "./compnents/Tasks";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  let inputRef = useRef();

  const [todos, setTodos] = useState([
    "waktup at 9",
    "study at 12",
    "sleep at 9",
  ]);

  useEffect(() => {
    let tempTodos = localStorage.getItem("Todos");
    if (tempTodos === null) {
      let placeholderTodos = ["waktup at 9", "study at 12", "sleep at 9"];
      localStorage.setItem("Todos", placeholderTodos);
    } else {
      let a = JSON.parse(localStorage.getItem("Todos"));
      setTodos(a);
    }
  }, []);

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      if (!edit) {
        addTodo();
      } else {
        addEditedTodo();
      }
    }
  };

  const addEditedTodo = () => {
    let tempTodo = [...todos];
    tempTodo[editIndex] = todoText.trim();
    setTodos(tempTodo);
    localStorage.setItem("Todos", JSON.stringify(tempTodo));
    setTodoText("");
  };

  const addTodo = () => {
    if (todoText !== "") {
      setTodos([...todos, todoText.trim()]);
      localStorage.setItem(
        "Todos",
        JSON.stringify([...todos, todoText.trim()])
      );
      setTodoText("");
    }
  };

  const handleRemove = (i) => {
    setTodos(
      todos.filter((todo, index) => {
        return index !== i;
      })
    );
    localStorage.setItem(
      "Todos",
      JSON.stringify(
        todos.filter((todo, index) => {
          return index !== i;
        })
      )
    );
  };

  const handleEdit = (i) => {
    setEditIndex(i);
    setEdit(true);
    let tempTodo = todos[i];
    setTodoText(tempTodo);
    inputRef.current.focus();
  };

  const handleAddTodo = () => {
    if (!edit) {
      addTodo();
    } else {
      addEditedTodo();
    }
  };

  // console.log(todos);

  return (
    <>
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        <section className="field">
          <input
            ref={inputRef}
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Add items"
          />
          <button
            disabled={todoText === "" ? true : false}
            onClick={handleAddTodo}
            className="add">
            +
          </button>
        </section>
        <section className="tasks">
          {todos &&
            todos.map((todoItem, index) => (
              <Tasks
                key={index}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
                todoItem={todoItem}
                index={index}
              />
            ))}
        </section>
      </div>
    </>
  );
};

export default App;
