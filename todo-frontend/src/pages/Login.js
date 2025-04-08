import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

// Componente di Login
const Login = () => {
  // Stati per email e password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Stato per il messaggio di errore
  const navigate = useNavigate();

  // Effetto per impostare il titolo della pagina
  useEffect(() => {
    document.title = "Login - Listy";
  }, []);

  // Funzione per gestire il login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Resetta il messaggio di errore
    try {
      // Richiesta API per il login
      const res = await api.post("/auth/login", { email, password });
      // Salva il token nel localStorage
      localStorage.setItem("token", res.data.token);
      // Naviga alla dashboard
      navigate("/dashboard");
    } catch (error) {
      // Imposta il messaggio di errore
      setErrorMessage(error.response?.data?.message || "Errore di login");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="separator"></div>
      <div className="form-container">
        <h2>Accedi</h2>
        {/* Form di login */}
        <form onSubmit={handleLogin}>
          {/* Campo email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Campo password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Accedi</button>
        </form>
        {/* Mostra l'errore */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <p>
          Non hai un account? <Link to="/register">Registrati</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
