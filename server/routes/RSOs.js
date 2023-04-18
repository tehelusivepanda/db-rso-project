const express = require("express");
const router = express.Router();
const { RSOs } = require("../models");

router.get("/", async (req, res) => {
  const list = await RSOs.findAll();
  res.json(list);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await RSOs.create(post);
  res.json(post);
});

module.exports = router;