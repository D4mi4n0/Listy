import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    onAdd(taskName);
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={`Aggiungi attività`}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="task-button">Aggiungi</button>
    </form>
  );
};

export default TaskForm;