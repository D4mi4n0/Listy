// filepath: todo-mobile/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchUserName();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (error) {
      alert('❌ Errore nel recupero delle attività');
    }
  };

  const fetchUserName = async () => {
    try {
      const res = await api.get('/auth/user');
      setUserName(res.data.name);
    } catch (error) {
      console.error('❌ Errore nel recupero del nome utente:', error);
    }
  };

  const addTask = async (name) => {
    await api.post('/tasks', { name });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (updatedTask) => {
    await api.put(`/tasks/${updatedTask.id}`, { completed: updatedTask.completed });
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setFilteredTasks(filteredTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.name.toLowerCase().includes(text.toLowerCase())));
    }
  };

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

export default Dashboard;