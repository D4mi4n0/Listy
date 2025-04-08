import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

// Componente principale per la registrazione
const Register = () => {
  // Stati per gestire i dati dell'utente
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameAvailable, setNameAvailable] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Effetto per impostare il titolo della pagina
  useEffect(() => {
    document.title = "Registrazione - Listy";
  }, []);

  // Funzione per controllare la disponibilità del nome utente
  const checkNameAvailability = async (name) => {
    try {
      const res = await api.post("/auth/check-name", { name });
      setNameAvailable(res.data.available);
    } catch (error) {
      console.error("Errore nel controllo del nome:", error);
    }
  };

  // Funzione per validare la password secondo specifici criteri
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Funzione per gestire il processo di registrazione
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setPasswordError("La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola, un numero e un simbolo speciale.");
      return;
    }
    try {
      const response = await api.post("/auth/register", { name, email, password });
      if (response && response.data) {
        alert("Registrazione completata! Ora puoi accedere.");
        navigate("/login");
      } else {
        alert("Errore di registrazione: risposta non valida dal server.");
      }
    } catch (error) {
      alert("Errore di registrazione: " + (error.response?.data?.message || error.message));
    }
  };

  // Effetto per controllare la disponibilità del nome utente ogni volta che il nome cambia
  useEffect(() => {
    if (name) {
      checkNameAvailability(name);
    }
  }, [name]);

  // Render del componente
  return (
    <div className="register-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="separator"></div>
      <div className="form-container">
        <h2>Registrati</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {!nameAvailable && <p className="error">Nome non disponibile</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <button type="submit">Registrati</button>
        </form>
        <p>
          Hai già un account? <Link to="/login">Accedi</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
