import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const ConfirmDeleteAccount = () => {
  const [confirmationText, setConfirmationText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Elimina Account - Listy";
  }, []);

  const handleDeleteAccount = async () => {
    if (confirmationText === "Non ho nulla da fare") {
      await api.delete("/auth/delete-account");
      localStorage.removeItem("token");
      navigate("/register");
    } else {
      alert("La frase di conferma non è corretta.");
    }
  };

  const goBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="confirm-delete-container">
      <div className="gif-container">
        <img src={sadGif} alt="Sad GIF" className="gif" />
      </div>
      <div className="separator"></div>
      <div className="form-container">
        <h2>Noooo... Mi lasci così? :'( </h2>
        <p>Sob, sob... A quanto pare non eravamo fatti per stare insieme. Però se proprio devi... Per confermare la cancellazione del tuo account, scrivi la frase "Non ho nulla da fare" e clicca sul pulsante "Elimina Account".</p>
        <input
          type="text"
          placeholder="Scrivi qui la frase di conferma"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          required
        />
        <button onClick={handleDeleteAccount}>Elimina Account</button>
        <button className="back-button" onClick={goBackToDashboard}>Oppure torna alla Listy :D</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteAccount;