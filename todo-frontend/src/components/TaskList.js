import React from "react";
import api from "../services/api";

const TaskList = ({ tasks, onDelete, onToggle }) => {
  const handleToggle = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await api.put(`/tasks/${task.id}`, { completed: updatedTask.completed });;
  };

  return (
    <ul>
      {tasks.length === 0 ? (
        <p>🚀 Nessuna attività in elenco. Scrivi la prima! :)</p>
      ) : (
        tasks.map((task) => (
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
  );
};

export default TaskList;