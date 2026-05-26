EPIC: Expense Tracker App (MERN + Testing)

Stack:
React (frontend)
Node.js + Express.js (backend)
MongoDB (DB)
Testing: Jest + Supertest + Playwright


Spustenie serverov
Server: /server/nodemon index.js
Client: /client/ npm start

Kontrola v MongoDB
mongosh
show dbs
use expense-tracker
show collections
db.expenses.find()




FULL-STACK EXPENSE APP – REÁLNY PLÁN

Používaš:
React (frontend)
Express.js (backend)
MongoDB (databáza)

🟢 PHASE 1 – SETUP (HOTOVÉ)
✔ vytvorený projekt
✔ frontend (React)
✔ backend (Express + Node.js)
✔ MongoDB pripojené
✔ štruktúra projektu

🟢 PHASE 2 – BACKEND (MINIMUM VIABLE API) ✔ HOTOVÉ
✔ server beží
✔ DB pripojenie funguje
✔ model Expense
✔ POST /api/expenses (create)
✔ GET /api/expenses (read all)
✔ test cez Postman
✔ dáta sa ukladajú do MongoDB
👉 výsledok: API funguje

🟢 PHASE 3 – FRONTEND READ (HOTOVÉ)
✔ React fetch GET /api/expenses
✔ zobrazenie dát v UI
✔ list expense v prehliadači

🟡 PHASE 4 – FRONTEND CREATE
Form
Post requst z Reactu
Auto update UI

🔴 PHASE 5 – DELETE (ĎALŠÍ KROK)
odstraňovanie expense
button pri každom expense
DELETE request
update UI
🔴 PHASE 6 – UPDATE (EDIT)
edit expense
PUT request
🔴 PHASE 7 – AUTH (NESKÔR)
login/register
JWT
user-specific data
🔴 PHASE 8 – DEPLOYMENT
frontend online
backend online
MongoDB Atlas