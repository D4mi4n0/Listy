import { Navigate } from "react-router-dom";

// Questo componente è un route protetto che controlla se l'utente è autenticato
const ProtectedRoute = ({ children }) => {
  // Recupera il token di autenticazione dal localStorage
  const token = localStorage.getItem("token");
  
  // Se il token esiste, restituisce il contenuto dei children (componenti figli)
  // Altrimenti, reindirizza l'utente alla pagina di login
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
