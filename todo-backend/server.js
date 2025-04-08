//Importazione moduli
const express = require('express');  //Per creare il serrer
const cors = require('cors');  //Cors per consentire richieste da vari domini
const dotenv = require('dotenv'); //variabili di ambiente di .env

//Carica le variabili d'ambiente del .env
dotenv.config();

//Importa le rotte per l'autenticazione
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

//Crea l'app express 
const app = express();

//Usa il middleware cors per accettare gli altri domini
app.use(cors());

//Usa il middleware per leggere i dati in json nelle richieste
app.use(express.json()); 

//Definisce le rotte
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

//Rotta del server
//La dovrebbe prendere dall'env ma per sicurezza si rimette la porta 3000
const PORT = process.env.PORT || 3000;

//Server in ascolto
app.listen(PORT, () => console.log(`Server connesso a http://localhost:${PORT}`));