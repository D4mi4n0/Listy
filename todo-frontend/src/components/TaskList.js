import React from "react";
import api from "../services/api";

// Componente funzionale TaskList che accetta tasks, onDelete e onToggle come props
const TaskList = ({ tasks, onDelete, onToggle }) => {

  // Funzione che gestisce il toggle dello stato di completamento di un task
  const handleToggle = async (task) => {
    // Crea una copia del task aggiornato con il campo 'completed' invertito
    const updatedTask = { ...task, completed: !task.completed };
    // Manda una richiesta PUT all'API per aggiornare il task nel backend
    await api.put(`/tasks/${task.id}`, { completed: updatedTask.completed });
    // Chiama la funzione onToggle passata come prop con il task aggiornato
    onToggle(updatedTask);
  };

  return (
    <ul>
      {tasks.length === 0 ? (
        // Mostra un messaggio se non ci sono task nella lista
        <p>🚀 Nessuna attività in elenco. Scrivi la prima! :)</p>
      ) : (
        // Mappa attraverso i tasks e crea un elemento <li> per ciascuno
        tasks.map((task) => (
          <li key={task.id}>
            <div className="task-text">{task.name}</div>
            <div className="task-actions">
              {/* Checkbox per togglare lo stato di completamento del task */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
              />
              {/* Bottone per cancellare il task */}
              <button onClick={() => onDelete(task.id)}>
                <strong>X</strong>
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
