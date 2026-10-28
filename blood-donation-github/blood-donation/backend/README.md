# Blood Donation — Backend (Express + MySQL)

## 1. Install dependencies
```
cd backend
npm install
```

## 2. Create the database
Make sure MySQL is running, then:
```
mysql -u root -p < database/schema.sql
```
This creates the `blood_donation` database and all tables (users, appointments,
blood_inventory, blood_requests, donations, notifications).

## 3. Configure environment variables
```
cp .env.example .env
```
Edit `.env` and set `DB_PASSWORD` (and `DB_USER` if not root), plus a random `JWT_SECRET`.

## 4. Create your first Admin account
```
node seedAdmin.js "Admin Name" admin@example.com YourPassword123
```

## 5. Run the server
```
npm run dev      # with nodemon, auto-restarts on changes
# or
npm start
```
Server runs at `http://localhost:5000`.

## 6. Connect the frontend
`Login.js` and `Register.js` already call `http://localhost:5000/login` and
`http://localhost:5000/register`, so registration/login work immediately.

For every other page (Donors, Appointments, Blood Inventory, Blood Requests),
call the matching endpoint below and attach the JWT from login as:
`Authorization: Bearer <token>`

| Feature            | Method & Path                        |
|--------------------|---------------------------------------|
| Register donor      | POST /register                       |
| Login               | POST /login                          |
| List donors (admin) | GET /api/donors                      |
| Get one donor       | GET /api/donors/:id                  |
| Add donor (admin)   | POST /api/donors                     |
| Update donor        | PUT /api/donors/:id                  |
| Delete donor        | DELETE /api/donors/:id               |
| List appointments   | GET /api/appointments?donorId=       |
| Book appointment    | POST /api/appointments               |
| Update appointment  | PUT /api/appointments/:id            |
| Cancel appointment  | DELETE /api/appointments/:id         |
| Get inventory       | GET /api/inventory                   |
| Set inventory       | PUT /api/inventory/:bloodGroup       |
| Adjust inventory    | PATCH /api/inventory/:bloodGroup/adjust |
| List blood requests | GET /api/requests (admin)            |
| Submit blood request| POST /api/requests (public)          |
| Update request      | PUT /api/requests/:id (admin)        |
| Delete request      | DELETE /api/requests/:id (admin)     |

## Project structure
```
backend/
├── config/db.js               MySQL connection pool
├── database/schema.sql        Full DB schema
├── middleware/auth.js         JWT verify + role guard
├── controllers/               Business logic per resource
├── routes/                    Express routers per resource
├── server.js                  App entry point
├── seedAdmin.js                Create the first Admin user
└── .env.example
```
