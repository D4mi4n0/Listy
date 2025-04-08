const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

//Creazione router per le rotte
const router = express.Router();

//Rotta per le attività dell'utente loggato
router.get('/', authMiddleware, async (req, res) => {
    //Ottiene id dell'user dal token
    const userId = req.user.id;

    //Cerca le attività legate all'utente
    const [tasks] = await db.query('SELECT * FROM Tasks WHERE user_id = ?', [userId]);
    res.json(tasks);
});

//Rotta per creare una attività
router.post('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;
    
    //Inserisce la attività nel db 
    await db.query('INSERT INTO Tasks (user_id, name) VALUES (?, ?)', [userId, name]);
    res.status(201).json({ message: 'Attività aggiunta' });
});

//Rotta che aggiorna lo stato di una task
router.put('/:id', authMiddleware, async (req, res) => {
    //Ottieni id e statuus
    const { id } = req.params;
    const { completed } = req.body;

    //Aggiorna lo stato dell'attività nel db
    await db.query('UPDATE Tasks SET completed = ? WHERE id = ?', [completed, id]);
    res.json({ message: 'Stato dell\'attività aggiornato' });
});

//Rotta che elimina un'attività
router.delete('/:id', authMiddleware, async (req, res) => {
    //Ottieni l'id 
    const { id } = req.params;

    //Cancella l'attività dal db
    await db.query('DELETE FROM Tasks WHERE id = ?', [id]);
    res.json({ message: 'Attività eliminata' });
});

//Esportazione rotte
module.exports = router;