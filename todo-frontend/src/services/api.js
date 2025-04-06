import axios from "axios";

const API_URL = "http://localhost:3000"; // Cambia se il backend gira su un'altra porta

// Configura l'istanza di Axios
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Imposta il token se presente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
});

// Intercetta le risposte per gestire gli errori
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Errore API:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;