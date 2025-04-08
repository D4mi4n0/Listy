import React, { useState } from "react";

// Definizione del componente TaskForm
const TaskForm = ({ onAdd }) => {
  // Stato locale per memorizzare il nome dell'attività
  const [taskName, setTaskName] = useState("");
  // Lunghezza massima del nome dell'attività
  const maxLength = 80;

  // Funzione chiamata al submit del form
  const handleSubmit = (e) => {
    e.preventDefault();  // Previene il comportamento predefinito del form
    if (!taskName.trim()) return;  // Se il nome dell'attività è vuoto, non fare nulla
    onAdd(taskName);  // Chiama la funzione onAdd passata come prop con il nome dell'attività
    setTaskName("");  // Resetta il campo dell'input
  };

  // Render del componente
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={`Aggiungi attività (max ${maxLength} caratteri)`}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}  // Aggiorna lo stato al cambiare dell'input
        maxLength={maxLength}  // Imposta la lunghezza massima dell'input
        className="task-input"  // Classe CSS per lo stile dell'input
      />
      <button type="submit" className="task-button">Aggiungi</button>
      <p>{taskName.length}/{maxLength} caratteri</p>
    </form>
  );
};

export default TaskForm;
