import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import sadGif from "../assets/addio-amici.gif";

// Componente per la conferma dell'eliminazione dell'account
const ConfirmDeleteAccount = () => {
  // Stato per il testo di conferma inserito dall'utente
  const [confirmationText, setConfirmationText] = useState("");
  const navigate = useNavigate();

  // Effetto per cambiare il titolo del documento quando il componente viene montato
  useEffect(() => {
    document.title = "Elimina Account - Listy";
  }, []);

  // Funzione per gestire l'eliminazione dell'account
  const handleDeleteAccount = async () => {
    // Controlla se il testo di conferma è corretto
    if (confirmationText === "Non ho nulla da fare") {
      try {
        // Richiesta API per eliminare l'account
        await api.delete("/auth/delete-account");
        // Rimuove il token dal localStorage
        localStorage.removeItem("token");
        // Reindirizza l'utente alla pagina di registrazione
        navigate("/register");
      } catch (error) {
        // Mostra un messaggio di errore se la richiesta fallisce
        alert("Errore nell'eliminazione dell'account: " + error.response.data.message);
      }
    } else {
      // Mostra un messaggio di errore se il testo di conferma non è corretto
      alert("La frase di conferma non è corretta.");
    }
  };

  // Funzione per tornare alla dashboard
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
        <p>
          Sob, sob... A quanto pare non eravamo fatti per stare insieme. Però se proprio devi... 
          Per confermare la cancellazione del tuo account, scrivi la frase "Non ho nulla da fare" e clicca...
        </p>
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

export default ConfirmDeleteAccount;
