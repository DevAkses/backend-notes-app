# Notes API

A simple RESTful API for managing notes. This project uses Prisma as the ORM, and PostgreSQL as the database.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Error Handling**: Basic error handling for invalid requests and server errors.

## Requirements

- **Node.js**: Ensure you have Node.js installed (preferably version 14 or higher).
- **PostgreSQL**: A PostgreSQL database instance.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DevAkses/backend-notes-app
```
```bash
cd backend-notes-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Environment
Create a .env file in the root directory of the project and add your PostgreSQL connection string:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/yourdatabase
```

### 4. Run Database Migrations
Run Prisma migrations to set up the database schema:
```bash
npx prisma migrate dev --name init
```

### 5. Start the Development Server
```bash
npm run dev
```
The development server will start on http://localhost:3000.

