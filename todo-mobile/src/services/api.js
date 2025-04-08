import axios from 'axios'; // Importa axios per effettuare richieste HTTP
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage per gestire lo storage asincrono

// Definisce l'URL base dell'API
const API_URL = 'http://192.168.1.9:3000';

// Crea un'istanza di axios con la configurazione di base
const api = axios.create({
  baseURL: API_URL, // Imposta l'URL base per le richieste
  headers: { 'Content-Type': 'application/json' }, // Imposta l'header Content-Type
});

// Aggiunge un interceptor per le richieste
api.interceptors.request.use(async (config) => {
  // Recupera il token dall'AsyncStorage
  const token = await AsyncStorage.getItem('token');
  // Se il token esiste, aggiunge l'header Authorization alla richiesta
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Ritorna la configurazione della richiesta aggiornata
  return config;
});

// Esporta l'istanza di axios configurata
export default api;
