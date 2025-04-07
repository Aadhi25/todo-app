import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Paginate from "./components/Paginate";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    return savedTodos || [];
  });
  const [item, setItem] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const todosPerPage = 5;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleEditChange = (e) => {
    setCurrentTodo({ ...currentTodo, todoItem: e.target.value });
  };

  const handleSubmit = (e) => {
    if (item !== "") {
      e.preventDefault();
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          todoItem: item,
        },
      ]);
      setItem("");
    } else {
      e.preventDefault();
      alert("Input field cannot be empty");
    }
  };

  const lastIndex = currPage * todosPerPage;
  const firstIndex = lastIndex - todosPerPage;
  const currPageTodos = todos.slice(firstIndex, lastIndex);

  const updateTodo = (id, updatedtodo) => {
    const updatedTodoItem = todos.map((todo) => {
      return todo.id === id ? { ...todo, todoItem: updatedtodo } : todo;
    });
    console.log(updatedTodoItem);
    setTodos(updatedTodoItem);

    setIsEditing(false);
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleEditSubmit = (e) => {
    if (currentTodo.todoItem !== "") {
      e.preventDefault();
      updateTodo(currentTodo.id, currentTodo.todoItem);
    } else {
      e.preventDefault();
      alert("Input field cannot be empty");
    }
  };

  return (
    <Container fixed>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <h1>Todo App</h1>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={isEditing ? handleEditSubmit : handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label={isEditing ? "Edit Todo" : "Add Todo"}
            variant="outlined"
            onChange={isEditing ? handleEditChange : handleChange}
            value={isEditing ? currentTodo.todoItem : item}
            required="true"
          />
        </Box>
        <Box>
          <h2>Your Todos</h2>
        </Box>
        <Box>
          {/* only show 5 todos per page */}
          <List>
            {currPageTodos.map((todo, idx) => (
              <ListItem disablePadding key={todo.id}>
                <ListItemText primary={idx + 1 + ") " + todo.todoItem} />
                <IconButton
                  onClick={() => handleEditClick(todo)}
                  edge="end"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteTodo(todo.id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          {/* Pagination Component */}
          <Paginate
            todosPerPage={todosPerPage}
            todos={todos}
            setCurrPage={setCurrPage}
          />
        </Box>
      </Box>
    </Container>
  );
}
