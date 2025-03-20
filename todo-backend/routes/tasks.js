const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ottenere tutte le attività dell'utente
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const [tasks] = await db.query('SELECT * FROM Tasks WHERE user_id = ?', [userId]);
    res.json(tasks);
});

// Creare una nuova attività
router.post('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;
    await db.query('INSERT INTO Tasks (user_id, name) VALUES (?, ?)', [userId, name]);
    res.status(201).json({ message: '✅ Attività aggiunta' });
});

// Segnare un'attività come completata o non completata
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    await db.query('UPDATE Tasks SET completed = ? WHERE id = ?', [completed, id]);
    res.json({ message: '✅ Stato dell\'attività aggiornato' });
});

// Eliminare un'attività
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM Tasks WHERE id = ?', [id]);
    res.json({ message: '✅ Attività eliminata' });
});

module.exports = router;