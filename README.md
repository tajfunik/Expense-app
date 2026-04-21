EPIC: Expense Tracker App (MERN + Testing)

Stack:

React (frontend)
Node.js + Express.js (backend)
MongoDB (DB)
Testing: Jest + Supertest + Playwright
🗂️ 📊 BACKLOG (ako Jira board)
🟣 EPIC 1: PROJECT SETUP (SCALE FOUNDATION)
🟢 TASK 1.1 – Initialize repository
 vytvoriť Git repo
 pridať .gitignore
 inicializovať README
🟢 TASK 1.2 – Backend setup
 npm init v /server
 nainštalovať Express
 vytvoriť základný server (server.js)
 nastaviť port + test route /health
🟢 TASK 1.3 – Frontend setup
 vytvoriť React app (/client)
 vyčistiť default štruktúru
 nastaviť základné routing (React Router)
🟢 TASK 1.4 – Project structure
 vytvoriť /server folders:
controllers
routes
models
middleware
 vytvoriť /client folders:
components
pages
services
🟢 TASK 1.5 – Environment setup
 .env backend (PORT, DB_URL, JWT_SECRET)
 prepojenie configu
 pripojenie MongoDB
🟢 TASK 1.6 – Basic connection test
 Express server running
 React app running
 API call z React → Express (/health)
🔵 EPIC 2: BACKEND DEVELOPMENT
🟡 TASK 2.1 – Database models
 User model (MongoDB)
 Transaction model (amount, category, date, userId)
🟡 TASK 2.2 – Authentication
 register endpoint
 login endpoint
 password hashing
 JWT generation
 auth middleware
🟡 TASK 2.3 – Transactions API
 create transaction
 get all transactions
 update transaction
 delete transaction
🧪 EPIC 3: BACKEND TESTING
🟣 TASK 3.1 – Testing setup
 nainštalovať Jest
 nainštalovať Supertest
 test config setup
🟣 TASK 3.2 – Auth tests
 register test
 login test
 invalid login test
🟣 TASK 3.3 – API tests
 create transaction test
 get transactions test
 delete transaction test
🟣 TASK 3.4 – Middleware tests
 JWT protection test
 unauthorized access test
🎨 EPIC 4: FRONTEND DEVELOPMENT
🔵 TASK 4.1 – UI structure
 layout (navbar + pages)
 routing setup
🔵 TASK 4.2 – Auth UI
 login page
 register page
 token storage (localStorage)
🔵 TASK 4.3 – Dashboard
 expense form
 expense list
 delete button
🔵 TASK 4.4 – API integration
 Axios setup
 connect frontend → backend
 error handling UI
🧪 EPIC 5: FRONTEND TESTING
🟢 TASK 5.1 – Setup testing
 React Testing Library setup
🟢 TASK 5.2 – Component tests
 render login page
 render dashboard
 form validation test
🟢 TASK 5.3 – Interaction tests
 submit form test
 delete button test
🌍 EPIC 6: E2E TESTING
🔴 TASK 6.1 – Setup Playwright
 install Playwright
 setup config
 run first test
🔴 TASK 6.2 – User flows
 login flow test
 add expense flow
 delete expense flow
🚀 EPIC 7: ADVANCED FEATURES
⚫ TASK 7.1 – Categories
 add categories
 filter by category
⚫ TASK 7.2 – Analytics
 monthly stats
 charts
⚫ TASK 7.3 – Export
 export CSV
 export JSON
🚀 EPIC 8: DEPLOYMENT
🟣 TASK 8.1 – Backend deploy
 deploy Express API
🟣 TASK 8.2 – Frontend deploy
 deploy React app
🟣 TASK 8.3 – Production setup
 env variables
 API URL config
