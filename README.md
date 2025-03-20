# Listy

## Descrizione
Listy è un'applicazione per la gestione delle attività, composta da un backend, un frontend web e un'app mobile. L'app consente agli utenti di registrarsi, effettuare il login, aggiungere, modificare e cancellare attività, oltre a eliminare l'account.

## Struttura del Progetto
- `todo-backend`: Contiene il server backend sviluppato con Node.js e Express.
- `todo-frontend`: Contiene l'applicazione frontend web sviluppata con React.
- `todo-mobile`: Contiene l'applicazione mobile sviluppata con React Native.
- `todo_list.sql`: Contiene il file SQL per la creazione del database.

## Requisiti
- Node.js
- npm
- Docker

## Installazione (in ordine, dal database in giù)

### Database
1. Assicurati di avere Docker installato.
2. Avvia il database con Docker:
    ```sh
    docker-compose up -d
    ```
3. Il file `todo_list.sql` verrà automaticamente importato durante l'inizializzazione del container.

### Backend
1. Naviga nella cartella `todo-backend`:
    ```sh
    cd todo-backend
    ```
2. Installa le dipendenze:
    ```sh
    npm install
    ```
3. Crea un file `.env` nella cartella `todo-backend` con il seguente contenuto:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=todo_user
    DB_PASS=todo_password
    DB_NAME=todo_list
    JWT_SECRET=supersegreto
    ```
    > **Nota:** Questo file è essenziale per la configurazione del backend. Se non viene creato, il server backend non sarà in grado di connettersi al database.

4. Avvia il server:
    ```sh
    npm start
    ```

### Frontend
1. Naviga nella cartella `todo-frontend`:
    ```sh
    cd todo-frontend
    ```
2. Installa le dipendenze:
    ```sh
    npm install
    ```
3. Avvia l'applicazione:
    ```sh
    npm start
    ```

### Mobile
1. Naviga nella cartella `todo-mobile`:
    ```sh
    cd todo-mobile
    ```
2. Installa le dipendenze:
    ```sh
    npm install
    ```
3. Avvia l'applicazione:
    ```sh
    npx expo start
    ```
    E premi "w" per vedere il mobile sul web (quindi premere F12).

### Per chiudere tutto
Per chiudere backend, frontend e mobile, fare Ctrl+C. Per chiudere il docker (vedere come aprirlo nella sezione "Database"), scrivere il comando:
    ```sh
    docker-compose down
    ```

## Uso
1. Registra un nuovo account tramite l'applicazione frontend o mobile.
2. Effettua il login.
3. Aggiungi, modifica e cancella le tue attività.
4. Puoi anche eliminare l'account o fare il logout.

## Tecnologie Utilizzate
- Node.js
- Express
- MySQL
- React
- React Native
- Expo
- Docker

## Licenza
Questo progetto è rilasciato sotto la licenza MIT.

## Un'ultima cosa...
Abbiate pietà di noi, please :)