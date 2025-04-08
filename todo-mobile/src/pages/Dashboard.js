import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

// Componente principale Dashboard
const Dashboard = ({ navigation }) => {
  // Stati per le attività, le attività filtrate, il termine di ricerca e il nome utente
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');

  // Effetto per caricare le attività e il nome utente al montaggio del componente
  useEffect(() => {
    fetchTasks();
    fetchUserName();
  }, []);

  // Funzione per recuperare le attività dall'API
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (error) {
      alert('❌ Errore nel recupero delle attività');
    }
  };

  // Funzione per recuperare il nome utente dall'API
  const fetchUserName = async () => {
    try {
      const res = await api.get('/auth/user');
      setUserName(res.data.name);
    } catch (error) {
      console.error('❌ Errore nel recupero del nome utente:', error);
    }
  };

  // Funzione per aggiungere una nuova attività
  const addTask = async (name) => {
    await api.post('/tasks', { name });
    fetchTasks();
  };

  // Funzione per eliminare un'attività
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // Funzione per aggiornare lo stato di completamento di un'attività
  const toggleTask = async (updatedTask) => {
    await api.put(`/tasks/${updatedTask.id}`, { completed: updatedTask.completed });
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setFilteredTasks(filteredTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  // Funzione per gestire il termine di ricerca
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.name.toLowerCase().includes(text.toLowerCase())));
    }
  };

  // Funzione per effettuare il logout
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Ciao, {userName}!</Text>
          <Text style={styles.listyText}>La tua Listy!</Text>
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="Cerca attività..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TaskForm onAdd={addTask} />
      </View>
      <ScrollView style={styles.taskListContainer}>
        <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConfirmDeleteAccount')}>
          <Text style={styles.buttonText}>Elimina Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Stili per il componente Dashboard
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#28837a',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Aggiungiamo margine tra gli elementi
  },
  greeting: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Montserrat_500Medium',
    color: '#333',
  },
  listyText: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Montserrat_500Medium',
    color: '#333',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    fontFamily: 'Montserrat_400Regular',
  },
  taskListContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    maxHeight: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
    backgroundColor: '#000',
    color: 'white',
    padding: 10,
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
});

// Esportazione del componente Dashboard
export default Dashboard;
