const mysql = require('mysql2');

//Importa le variabili d'ambiente di .env
const dotenv = require('dotenv');

dotenv.config();
//Crea pool di connessioni con il db (insieme di connessioni che vengono riutilizzate) con i
//paramentri di .env
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//Esporta il pool
module.exports = db.promise();
