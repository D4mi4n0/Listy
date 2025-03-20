// filepath: todo-mobile/src/components/TaskList.js
import React from 'react';
import { View, Text, CheckBox, StyleSheet, TouchableOpacity } from 'react-native';

const TaskList = ({ tasks, onDelete, onToggle }) => {
  const handleToggle = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    onToggle(updatedTask);
  };

  return (
    <View>
      {tasks.length === 0 ? (
        <Text>🚀 Nessuna attività in elenco. Scrivi la prima! :)</Text>
      ) : (
        tasks.map((task) => (
          <View key={task.id} style={styles.task}>
            <Text style={styles.taskText}>{task.name}</Text>
            <View style={styles.taskActions}>
              <CheckBox
                value={task.completed}
                onValueChange={() => handleToggle(task)}
              />
              <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

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