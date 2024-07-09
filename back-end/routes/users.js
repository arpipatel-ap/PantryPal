const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get("/login", (req, res) => {
  res.render('login', { user: req.session.userId });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  userQueries
    .getUserByEmail(email)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with that email" });
      }
      console.log(user.password);
      if (password !== user.password) {
        return res.send({ error: "error" });
      }

      req.session.userId = user.id;
      res.redirect("/main");
    });
});

router.get('/register', (req, res) => {
  res.render('register', { user: req.session.userId });
});

router.post("/register", (req, res) => {
  const { name, email, password, phone } = req.body;
  userQueries
    .addUser(name, email, password, phone)
    .then((user) => {
      req.session.userId = user.id;
      res.redirect("/main");
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
