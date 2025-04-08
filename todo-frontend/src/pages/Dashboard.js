import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import "../dashboard.css"; // Importa il nuovo file CSS

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // Stato per memorizzare le attività
  const [filteredTasks, setFilteredTasks] = useState([]); // Stato per memorizzare le attività filtrate
  const [searchTerm, setSearchTerm] = useState(""); // Stato per memorizzare il termine di ricerca
  const [userName, setUserName] = useState(""); // Stato per memorizzare il nome dell'utente
  const navigate = useNavigate(); // Hook per la navigazione

  useEffect(() => {
    fetchTasks(); // Recupera le attività all'avvio
    fetchUserName(); // Recupera il nome dell'utente all'avvio
    document.title = "La tua Listy! - Listy"; // Imposta il titolo della pagina
  }, []);

  // Funzione per recuperare le attività dal server
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (error) {
      alert("❌ Errore nel recupero delle attività: " + (error.response?.data?.message || error.message));
    }
  };

  // Funzione per recuperare il nome dell'utente dal server
  const fetchUserName = async () => {
    try {
      const res = await api.get("/auth/user");
      setUserName(res.data.name);
    } catch (error) {
      console.error("❌ Errore nel recupero del nome utente:", error);
    }
  };

  // Funzione per aggiungere una nuova attività
  const addTask = async (name) => {
    await api.post("/tasks", { name });
    fetchTasks(); // Aggiorna l'elenco delle attività
  };

  // Funzione per eliminare un'attività
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks(); // Aggiorna l'elenco delle attività
  };

  // Funzione per attivare/disattivare lo stato di completamento di un'attività
  const toggleTask = async (updatedTask) => {
    await api.put(`/tasks/${updatedTask.id}`, { completed: updatedTask.completed });
    // Aggiorna lo stato locale delle attività
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setFilteredTasks(filteredTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  // Funzione per effettuare il logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Funzione per confermare l'eliminazione dell'account
  const confirmDeleteAccount = () => {
    navigate("/confirm-delete-account");
  };

  // Funzione per gestire la ricerca delle attività
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Converti il termine di ricerca in minuscolo
    setSearchTerm(searchTerm); // Aggiorna lo stato del termine di ricerca
  
    // Filtra le attività in base al termine di ricerca
    if (searchTerm === "") {
      setFilteredTasks(tasks); // Mostra tutte le attività se il termine di ricerca è vuoto
    } else {
      setFilteredTasks(
        tasks.filter((task) => task.name.toLowerCase().includes(searchTerm))
      );
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
