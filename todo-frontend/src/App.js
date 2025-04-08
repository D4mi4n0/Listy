import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ConfirmDeleteAccount from "./pages/ConfirmDeleteAccount";
import ProtectedRoute from "./components/ProtectedRoute";

// Funzione principale dell'applicazione
function App() {
  return (
    // Configurazione del Router per la gestione delle rotte
    <Router>
      <Routes>
        {/* Rotta principale che reindirizza alla pagina di login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rotta per la pagina di login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rotta per la pagina di registrazione */}
        <Route path="/register" element={<Register />} />
        
        {/* Rotta protetta per la dashboard, accessibile solo se autenticati */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Rotta protetta per la conferma di cancellazione dell'account, accessibile solo se autenticati */}
        <Route
          path="/confirm-delete-account"
          element={
            <ProtectedRoute>
              <ConfirmDeleteAccount />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// Esportazione del componente App come default
export default App;