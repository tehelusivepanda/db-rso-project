const express = require("express");
const router = express.Router();
const { Universities } = require("../models");

router.get("/", async (req, res) => {
  const list = await Universities.findAll();
  res.json(list);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Universities.create(post);
  res.json(post);
});

module.exports = router;