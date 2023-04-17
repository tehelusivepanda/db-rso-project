const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const postRouter = require("./routes/Universities");
app.use("/universities", postRouter);

const postRouter2 = require("./routes/Events");
app.use("/events", postRouter2);

const reviewRouter = require("./routes/Reviews");
app.use("/reviews", reviewRouter);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});