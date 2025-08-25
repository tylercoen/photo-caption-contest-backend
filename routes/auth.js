const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/**
 * POST /register
 * Body: { username, password }
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser)
      return res.status(400).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

/**
 * POST /login
 * Boy: { username, password }
 */

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: "Invalid credentials " });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

/**
 * POST /logout
 * For JWT-based logout, client just deletes the token
 */
router.post("/logout", (req, res) => {
  res.jsont({ message: "Logged Out" });
});

module.exports = router;
