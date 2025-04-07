import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState("");
  const maxLength = 80;

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
        placeholder={`Aggiungi attività (max ${maxLength} caratteri)`}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        maxLength={maxLength}
        className="task-input"
      />
      <button type="submit" className="task-button">Aggiungi</button>
      <p>{taskName.length}/{maxLength} caratteri</p>
    </form>
  );
};

export default TaskForm;