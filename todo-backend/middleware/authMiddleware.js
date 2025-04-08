//Importa il modulo jsonwebtoken per gestire i JWT
const jwt = require('jsonwebtoken');

//Funzione middleware di autenticazione, controlla se l'utente può accedere
//a parti del sito
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    //Se il token non c'è si blocca l'accesso
    if (!token) return res.status(401).json({ message: 'Accesso negato' });

    try {
        //Leva bearer e verifica se il token è valido usando la chiave segreta
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

        //Se il token è valido si salvano le informazioni dentro req.user
        req.user = decoded;
        next();
    } catch (error) {
        //Ultimo caso possibile
        res.status(401).json({ message: 'Token non valido' });
    }
};

module.exports = authMiddleware;