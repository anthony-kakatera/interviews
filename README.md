# Interviews API

A simple Node.js/Express + MySQL backend for managing leave requests.

## Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node)
- A running MySQL/MariaDB instance

## Setup

1. **Clone the repository** (if you haven’t already):

   ```bash
   git clone https://github.com/anthony-kakatera/interviews.git
   cd interviews
   ```

2. **Install dependencies**:

   ```bash
   npm init -y            # only if package.json does not exist yet
   npm install express cors mysql2
   ```

3. **Configure the database connection**:

   Open `server.js` and ensure the `mysql.createConnection` settings match your DB:

   ```js
   const db = mysql.createConnection({
     host: '172.16.0.4',   // change to your DB host
     user: 'root',         // DB user
     password: 'root',     // DB password
     database: 'interviews'// DB name
   });
   ```

   Make sure the `interviews` database and required tables (e.g. `leave_request` or `leave_requests`) exist in MySQL.

## Running the app

1. **Start the server**:

   ```bash
   node server.js
   ```

2. The API will start on:

   ```
   http://localhost:3000
   ```

## API Endpoints (summary)

- `GET    /api/api/leave/my-requests/:id` – Get leave requests for a given user/employee.
- `POST   /api/leave/requests` – Submit a leave request.
- `GET    /api/leave/requests` – List all leave requests.
- `GET    /api/leave/requests/:id` – Get a single leave request by ID.
- `PUT    /api/leave/approve/:id` – Approve a leave request for a user.
- `PUT    /api/leave/reject/:id` – Reject a leave request for a user.

CORS is enabled via `app.use(cors());`, so a frontend on another origin (e.g. `http://localhost:5173`) can call these endpoints directly as long as it targets the correct URLs.
