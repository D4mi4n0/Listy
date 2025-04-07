CREATE DATABASE IF NOT EXISTS todo_list;
--crea il database todo_list se non esiste già

USE todo_list;

CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    --id univoco per ogni utente, viene automaticamente incrementato

    name VARCHAR(50) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    --id univoco per ogni singola task, viene automaticamente incrementato

    user_id INT NOT NULL,

    name VARCHAR(255) NOT NULL,

    completed BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --la data e l'ora del task vengono impostate in automatico con CURRENT_TIMESTAMP

    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
    --foreign key che mette in relazione il task con l'utente, con gli attributi "id" di User e "userd_id" di Task
    --se l'utente viene eliminato si cancelleranno anche i suoi task grazie a ON DELETE CASCADE  
);
