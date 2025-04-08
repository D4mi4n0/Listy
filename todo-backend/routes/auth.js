const express = require('express');
const bcrypt = require('bcryptjs');//Per criptare le password
const jwt = require('jsonwebtoken');//Crea/verifica i token 
const db = require('../db');//Chiama il db
const authMiddleware = require('../middleware/authMiddleware');//Preotezione delle rotte
const router = express.Router();//Router express

//Rotta per la registrazione di un nuovo utente
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;//Prende dati dal client

    //Controllo se l'email esiste già
    const [existing] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'Email già in uso' });

    //Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creazione utente e salvataggio nel db
    await db.query('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    res.status(201).json({ message: 'Registrazione completata' });
});

//Rotta per il login dell'utente
router.post('/login', async (req, res) => {
    try {
      //Prende dati dal client
      const { email, password } = req.body;

      //Cerca l'utente tramite mail nel db
      const [users] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
      
      //Utente inesistente
      if (users.length === 0) {
        return res.status(400).json({ message: 'Credenziali errate: utente non trovato' });
      }

      const user = users[0];

      //Confronta la password salvata con quella criptata
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Credenziali errate: password non valida' });
      }

      //Genera un token JWT che dura un'ora e lo invia al client
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });

      //Messaggi di errore
    } catch (error) {
      console.error("Errore durante il login:", error);
      res.status(500).json({ message: 'Errore interno del server' });
    }
  });

//Rotta che verifica il nome utente
router.post('/check-name', async (req, res) => {
    const { name } = req.body; //Recupera il nome

    //Verifica nel db che l'user esisista già
    const [existing] = await db.query('SELECT * FROM Users WHERE name = ?', [name]);
    res.json({ available: existing.length === 0 });
});

//Rotta per ottenere il nome utente loggato
router.get('/user', authMiddleware, async (req, res) => {
    //Recupera l'id utente dal token   
    const userId = req.user.id; 
    //Cerca l'utente nel db
    const [users] = await db.query('SELECT name FROM Users WHERE id = ?', [userId]);
    if (users.length === 0) return res.status(404).json({ message: 'Utente non trovato' });
    res.json({ name: users[0].name });
});

//Rotta per eliminare un account di un utente loggato
router.delete('/delete-account', authMiddleware, async (req, res) => {
    //Recupera l'id utente dal token  
    const userId = req.user.id;
    await db.query('DELETE FROM Users WHERE id = ?', [userId]);
    res.json({ message: 'Account eliminato' });
});

//Esportazione delle rotte
module.exports = router;