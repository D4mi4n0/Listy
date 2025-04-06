import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameAvailable, setNameAvailable] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Registrazione - Listy";
  }, []);

  const handleRegister = async (e) => {
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