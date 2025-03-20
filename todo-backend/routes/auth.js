const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Registrazione
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Controllo se l'email esiste già
    const [existing] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'Email già in uso' });

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creazione utente
    await db.query('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    res.status(201).json({ message: '✅ Registrazione completata' });
});

// Login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const [users] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  
      if (users.length === 0) {
        return res.status(400).json({ message: '❌ Credenziali errate: utente non trovato' });
      }
  
      const user = users[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: '❌ Credenziali errate: password non valida' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error("Errore durante il login:", error);
      res.status(500).json({ message: '❌ Errore interno del server' });
    }
  });

// Verifica disponibilità nome
router.post('/check-name', async (req, res) => {
    const { name } = req.body;
    const [existing] = await db.query('SELECT * FROM Users WHERE name = ?', [name]);
    res.json({ available: existing.length === 0 });
});

// Ottenere il nome utente
router.get('/user', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const [users] = await db.query('SELECT name FROM Users WHERE id = ?', [userId]);
    if (users.length === 0) return res.status(404).json({ message: 'Utente non trovato' });
    res.json({ name: users[0].name });
});

// Eliminazione account
router.delete('/delete-account', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    await db.query('DELETE FROM Users WHERE id = ?', [userId]);
    res.json({ message: '✅ Account eliminato' });
});

module.exports = router;