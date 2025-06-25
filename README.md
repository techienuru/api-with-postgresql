# Express.js PostgreSQL CRUD API

## Overview

This project is a simple Express.js API that connects to a PostgreSQL database and performs CRUD operations (Create, Read, Update, Delete) on a `users` table.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Testing](#testing)

---

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure the database connection:**

   - Edit `server.js` with your PostgreSQL credentials.

4. **Start the server:**
   ```sh
   npm start
   ```
   The server will run on [http://localhost:3500](http://localhost:3500) by default.

---

## Database Setup

1. **Create the database and table:**

   Connect to your PostgreSQL instance and run:

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100),
     age INTEGER
   );
   ```

---

## API Endpoints

### 1. Get All Users

- **Endpoint:** `GET /users`
- **Description:** Retrieve all users.
- **Response Example:**
  ```json
  {
    "message": "success",
    "result": [
      { "id": 1, "name": "Alice", "email": "alice@mail.com", "age": 25 },
      ...
    ]
  }
  ```

### 2. Get User by ID

- **Endpoint:** `GET /users/:id`
- **Description:** Retrieve a single user by ID.
- **Response Example:**
  ```json
  {
    "message": "success",
    "result": [
      { "id": 1, "name": "Alice", "email": "alice@mail.com", "age": 25 }
    ]
  }
  ```
- **404 Example:**
  ```json
  { "error": "No user found." }
  ```

### 3. Create User

- **Endpoint:** `POST /users`
- **Description:** Add a new user.
- **Request Body:**
  ```json
  { "name": "Bob", "email": "bob@mail.com", "age": 30 }
  ```
- **Response Example:**
  ```json
  {
    "message": "User created.",
    "result": { "id": 2, "name": "Bob", "email": "bob@mail.com", "age": 30 }
  }
  ```
- **400 Example:**
  ```json
  { "error": "Name, email, & age are required." }
  ```

### 4. Update User

- **Endpoint:** `PUT /users/:id`
- **Description:** Update a user's data (at least one of name, email, or age).
- **Request Body Example:**
  ```json
  { "email": "newbob@mail.com" }
  ```
- **Response Example:**
  ```json
  {
    "message": "Record updated.",
    "result": { "id": 2, "name": "Bob", "email": "newbob@mail.com", "age": 30 }
  }
  ```
- **404 Example:**
  ```json
  { "error": "No user found." }
  ```

### 5. Delete User

- **Endpoint:** `DELETE /users/:id`
- **Description:** Delete a user by ID.
- **Response Example:**
  ```json
  { "message": "User deleted." }
  ```
- **404 Example:**
  ```json
  { "error": "No user found" }
  ```

---

## Error Handling

- **400 Bad Request:** Missing required fields or invalid input.
- **404 Not Found:** User not found for given ID.
- **500 Internal Server Error:** Database or server error.

---

## Testing

You can test the API using [Postman](https://www.postman.com/) or [curl](https://curl.se/).

Example:

```sh
curl -X POST http://localhost:3500/users -H "Content-Type: application/json" -d '{"name":"Test","email":"test@mail.com","age":22}'
```

---

## Notes

- Ensure PostgreSQL is running and accessible with the credentials in `server.js`.
- The server will not start if the database connection fails.
