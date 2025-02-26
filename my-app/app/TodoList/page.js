"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Container, TextField, Button, List, ListItem, 
  ListItemText, Checkbox, IconButton 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoList() {
  const router = useRouter();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]); // ✅ Correct state variable name
  const [editIndex, setEditIndex] = useState(null);

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;`;
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    return cookies[name] || null;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = getCookie("tasks");
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
      setTodos(parsedTasks); // ✅ Changed from setTasks to setTodos
    }
  }, []);
   
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (todos.length === 0) {
        deleteCookie("tasks"); 
      } else {
        setCookie("tasks", JSON.stringify(todos), 7);
      }
    }
  }, [todos]); // ✅ Changed from tasks to todos

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleAddOrUpdateTodo = () => {
    if (todo.trim() === "") return;
    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = todo;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: todo, completed: false }]);
    }
    setTodo("");
  };

  const handleEditTodo = (index) => {
    setTodo(todos[index].text);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const confirmDelete = window.confirm("are you sure?")
    if (confirmDelete){
    setTodos(todos.filter((_, i) => i !== index));
    setEditIndex(null);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, bgcolor: "#fff", p: 3, border: 10, borderRadius: 2, boxShadow: 3 }}>
      <h1 style={{ color: "black", marginBottom: "20px" }}>To-Do List</h1>

      <TextField
        label="Add or Edit a Task"
        variant="outlined"
        fullWidth
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleAddOrUpdateTodo}>
        {editIndex !== null ? "Update Task" : "Add Task"}
      </Button>

      <List sx={{ mt: 3, gap: 2, display: "flex", flexDirection: "column" }}>
        {todos.map((todo, index) => (
          <ListItem key={index} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEditTodo(index)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteTodo(index)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <Checkbox edge="start" checked={todo.completed} onChange={() => handleToggleComplete(index)} />
            <ListItemText primary={todo.text} sx={{ color: "black" }} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
