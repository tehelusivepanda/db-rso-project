const express = require("express");
const router = express.Router();
const { Reviews } = require("../models");
const { validate } = require("../middlewares/AuthMiddleware")

router.get("/:event_id", async (req, res) => {
    const event_id = req.params.event_id;
    const reviews = await Reviews.findAll({ where: { EventId: EventId } });
    res.json(reviews);
});

router.post("/", validate, async (req, res) => {
    const review = req.body;
    const username = req.user.username;
    review.username = username;
    await Reviews.create(review);
    res.json(review);
});

router.delete("/:review_id", validate, async (req, res) => {
    const review_id = req.params.review_id;

    await Reviews.destroy({
        where: {
            id: review_id,
        },
    });

    res.json("DETELTED");
});

module.exports = router;