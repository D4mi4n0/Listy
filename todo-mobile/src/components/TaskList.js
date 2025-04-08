import React from 'react';
import { View, Text, CheckBox, StyleSheet, TouchableOpacity } from 'react-native';

// Componente TaskList che riceve tasks, onDelete e onToggle come props
const TaskList = ({ tasks, onDelete, onToggle }) => {
  // Funzione per gestire il toggle dello stato di completamento del task
  const handleToggle = async (task) => {
    const updatedTask = { ...task, completed: !task.completed }; // Invertiamo lo stato di completamento del task
    onToggle(updatedTask); // Chiamiamo la funzione onToggle con il task aggiornato
  };

  return (
    <View>
      {tasks.length === 0 ? (
        // Messaggio se non ci sono attività nella lista
        <Text>🚀 Nessuna attività in elenco. Scrivi la prima! :)</Text>
      ) : (
        // Mappiamo i task ricevuti come props e creiamo una vista per ciascuno di essi
        tasks.map((task) => (
          <View key={task.id} style={styles.task}>
            <Text style={styles.taskText}>{task.name}</Text>
            <View style={styles.taskActions}>
              <CheckBox
                value={task.completed} // Stato del checkbox basato sullo stato di completamento del task
                onValueChange={() => handleToggle(task)} // Funzione chiamata quando il valore del checkbox cambia
              />
              <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
                <Text style={styles.deleteButtonText}>X</Text> // Pulsante per eliminare il task
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

// Stili per il componente
const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    flex: 1,
    marginRight: 10,
    fontFamily: 'Montserrat_400Regular',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 4,
    marginLeft: 10, // Aggiungiamo margine tra il checkbox e il pulsante
  },
  deleteButtonText: {
    color: 'white',
    fontFamily: 'Montserrat_500Medium',
  },
});

export default TaskList;
