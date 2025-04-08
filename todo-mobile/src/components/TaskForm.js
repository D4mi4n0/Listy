// filepath: todo-mobile/src/components/TaskForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');
  const maxLength = 80;

  const handleSubmit = () => {
    if (!taskName.trim()) return;
    onAdd(taskName);
    setTaskName('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder={`Aggiungi attività (max ${maxLength} caratteri)`}
        value={taskName}
        onChangeText={setTaskName}
        maxLength={maxLength}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Aggiungi</Text>
      </TouchableOpacity>
      <Text style={styles.charCount}>{taskName.length}/{maxLength} caratteri</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15, // Aggiungiamo margine tra gli elementi
    paddingLeft: 8,
    width: '100%',
    fontFamily: 'Montserrat_400Regular',
  },
  button: {
    width: '100%', // La lunghezza del pulsante è uguale a quella dei textfields
    backgroundColor: '#000',
    color: 'white',
    padding: 10,
    marginBottom: 15, // Aggiungiamo margine tra gli elementi
    borderRadius: 4,
    fontSize: 16,
    fontFamily: 'Montserrat_500Medium',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat_500Medium', // Font Montserrat
  },
  charCount: {
    fontFamily: 'Montserrat_400Regular',
    color: '#333',
  },
});

export default TaskForm;