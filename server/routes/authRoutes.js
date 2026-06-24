const express = require("express");
const router = express.Router();

const { registerUser, getUsers, loginUser } = require("../controllers/authController");

// REGISTER
router.post("/register", registerUser);

// GET ALL USERS
router.get("/users", getUsers);

// LOGIN
router.post("/login", loginUser);

module.exports = router;