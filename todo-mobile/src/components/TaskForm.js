import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Definiamo il componente TaskForm che riceve una funzione onAdd come prop
const TaskForm = ({ onAdd }) => {
  // Utilizziamo lo stato per gestire il nome del task
  const [taskName, setTaskName] = useState('');
  const maxLength = 80; // Lunghezza massima del nome del task

  // Funzione per gestire l'invio del form
  const handleSubmit = () => {
    if (!taskName.trim()) return; // Se il nome del task è vuoto, non facciamo nulla
    onAdd(taskName); // Chiamiamo la funzione onAdd con il nome del task
    setTaskName(''); // Resettiamo il nome del task
  };

  return (
    <View style={styles.formContainer}>
      {/* Campo di input per il nome del task */}
      <TextInput
        style={styles.input}
        placeholder={`Aggiungi attività (max ${maxLength} caratteri)`}
        value={taskName}
        onChangeText={setTaskName}
        maxLength={maxLength}
      />
      {/* Pulsante per aggiungere il task */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Aggiungi</Text>
      </TouchableOpacity>
      {/* Contatore dei caratteri */}
      <Text style={styles.charCount}>{taskName.length}/{maxLength} caratteri</Text>
    </View>
  );
};

// Definizione degli stili utilizzati nel componente
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

// Esportiamo il componente TaskForm
export default TaskForm;
