# Koa Web Server

## Prerequisites
Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) (recommended version 14+)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation
1. Clone the repository:

   ```bash
   git clone [<repository_url>](https://github.com/AriiSM/Hermes-Hackthon-2024)
   cd Server
   ```

2. Install necessary dependencies: 
    ```bash
    npm install
    ```

## Configuration
- The server uses JSON files (db/emails.json, db/profiles.json, db/users.json) for data storage.
- You can modify the JWT secret key in utils.js by changing the value of jwtConfig.secret.

## Starting the Server
To start the server, run:

```bash
npm start
```

By default, the server will run on port 3000.

## API Endpoints
The server exposes the following REST API endpoints:

**Public Routes:**
- POST /api/users/signup - Create a new user
- POST /api/users/login - Authenticate and obtain a JWT token
- GET /api/profiles/ - Retrieve profiles
- GET /api/emails/ - Retrieve emails

**Protected Routes (Require JWT Token):**
- GET /api/emails/ - Retrieve emails
- GET /api/profiles/ - Retrieve profiles

## WebSockets
The server supports WebSockets for real-time communication. Clients must send JWT authorization messages before interaction.
Example authorization message:
```JSON 
{
  "type": "authorization",
  "payload": {
    "token": "<JWT_TOKEN>"
  }
}
```