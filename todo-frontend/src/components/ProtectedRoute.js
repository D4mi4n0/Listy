import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // Assicurati di installare questa libreria con `npm install jwt-decode`

// Componente per proteggere le rotte
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Funzione per verificare se il token è valido
  const isTokenValid = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now(); // Controlla se il token è scaduto
    } catch {
      return false;
    }
  };

  // Se il token è valido, mostra il contenuto della rotta; altrimenti, reindirizza al login
  return isTokenValid() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;