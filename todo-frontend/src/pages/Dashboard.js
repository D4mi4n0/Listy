import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    fetchUserName();
    document.title = "La tua Listy! - Listy";
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
    setFilteredTasks(res.data);
  };

  const fetchUserName = async () => {
    const res = await api.get("/auth/user");
    setUserName(res.data.name);
  };

  const addTask = async (name) => {
    await api.post("/tasks", { name });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (updatedTask) => {
    await api.put(`/tasks/${updatedTask.id}`, { completed: updatedTask.completed });
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setFilteredTasks(filteredTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const confirmDeleteAccount = () => {
    navigate("/confirm-delete-account");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }
  };

  return (
    <div className="dashboard-page">
      <div className="top-bar">
        <div className="greeting">
          <i className="fas fa-user"></i> {/* Aggiungi l'icona dello user */}
          Ciao, {userName}!
        </div>
        <div className="button-container">
          <button className="logout-button" onClick={logout}>Logout</button>
          <button className="delete-account-button" onClick={confirmDeleteAccount}>Elimina Account</button>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="left-container">
          <h2>La tua Listy!</h2>
          <input
            type="text"
            placeholder="Cerca attività..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
          <TaskForm onAdd={addTask} />
        </div>
      </div>
      <div className="task-list-container">
        <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
      </div>
    </div>
  );
};

export default Dashboard;