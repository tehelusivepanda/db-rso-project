const express = require("express");
const router = express.Router();
const { Events } = require("../models");

router.get("/", async (req, res) => {
  const list2 = await Events.findAll().catch(e => { console.log(e) });
  res.json(list2);
});

router.get("/byId/:EventId", async (req, res) => {
  const EventId = req.params.EventId;
  const event = await Events.findByPk(EventId);
  res.json(event);
});

router.post("/", async (req, res) => {
  const post2 = req.body;
  await Events.create(post2).catch(e => { console.log(e) });
  res.json(post2);
});

module.exports = router;