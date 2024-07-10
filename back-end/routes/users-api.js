const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get("/login", (req, res) => {
  res.render('login', { user: req.session.userId });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  userQueries
    .getUserByUsername(username)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (password !== user.password) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      req.session.userId = user.id; 
      res.send({ 
        id: user.id,
        username: user.username,
        profile_pic: user.profile_pic
      });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Server error" });
    });
});

router.get('/register', (req, res) => {
  res.render('register', { user: req.session.userId });
});

router.post("/register", (req, res) => {
  const { username, email, password} = req.body;
  userQueries
    .addUser({username, email, password})
    .then((user) => {
      req.session.userId = user.id;
      res.send({ 
        id: user.id,
        username: user.username,
        email: user.email
      });
    })
    .catch((err) => res.send(err));
});

router.get("/", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ message: "not logged in" });
  }

  userQueries
    .getUserById(userId)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no" });
      }

      res.send({
        user: {
          name: user.name,
          email: user.email,
          id: userId,
        },
      });
    })
    .catch((e) => res.send(e));
});

router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect("/users/login");
});

module.exports = router;
