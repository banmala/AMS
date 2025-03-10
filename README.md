# AMS
A Simple Admin panel to manage records of artists with their songs collection


# Installation for Backend (Local)
### 1. Navigate to /ams-backend folder
```
cd  ams-backend
```
### 2. Setup .env file
Copy contents of **.env.example**   file in project directory and paste them to a new file **.env** in same directory.
Then set required values to the variables in the file.

Note: mysql is used for database, so mysql must be installed before running backend and hostname, usernama, password for database and a new database must be created with name "ams".

### 3. Install necessary packages
```
npm install
```
### 4. Server start
Start server in local:
```
npm run dev
```
### 5. Generate tables in the databse.
Open browser and hit the given url to run the schema which will create the required tables in the database provided in env file.
```
http://localhost:3000/api/schema/runSchema
```

# Installation for Frontend (Local)
### 1. Navigate to /ams-frontend folder
```
cd  ams-frontend
```

### 2. Install necessary packages
```
npm install
```
### 3. Server start
Start server in local:
```
npm run dev
```

### 4. Register new user by clicking on register button
### 5. First create an Artist then you can create a music created by the artist.


