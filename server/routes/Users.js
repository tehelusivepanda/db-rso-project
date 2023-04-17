const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validate } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, password, level } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      level: level,
    });
    res.json("REGISTER SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User does not exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Incorrect username or password" });

    const access = sign({
      username: user.username,
      id: user.id,
      level: user.level,
    }, "swag");

    res.json({
      token: access,
      username: username,
      id: user.id,
    });
  });
});

router.get("/auth", validate, (req, res) => {
  res.json(req.user);
})

module.exports = router;