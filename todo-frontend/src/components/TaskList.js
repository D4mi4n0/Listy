import React, { useState } from "react";
import api from "../services/api";

// Componente funzionale TaskList che accetta tasks, onDelete e onToggle come props
const TaskList = ({ tasks, onDelete, onToggle }) => {
  const [searchTerm] = useState(""); // Stato per il termine di ricerca

  // Funzione che gestisce il toggle dello stato di completamento di un task
  const handleToggle = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await api.put(`/tasks/${task.id}`, { completed: updatedTask.completed });
    onToggle(updatedTask);
  };

  // Filtra le attività in base al termine di ricerca
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ul>
        {filteredTasks.length === 0 ? (
          <p>🚀 Nessuna attività in elenco. Scrivi la prima! :)</p>
        ) : (
          filteredTasks.map((task) => (
            <li key={task.id}>
              <div className="task-text">{task.name}</div>
              <div className="task-actions">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />
                <button onClick={() => onDelete(task.id)}>
                  <strong>X</strong>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;