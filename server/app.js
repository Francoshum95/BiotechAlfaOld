const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const stock = require("./routes/stockRouter.js");
const fmp = require("./routes/fmpRouter.js");
const fetch = require("./routes/fetch.Router.js");
const user = require("./routes/user.Router.js");

require('./services/websocketYahoo');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.DOMAIN ,
  method: ["GET", "POST", "PATCH"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/equity", stock);
app.use("/api/v2/equity", fmp);
app.use("/api/v2/news", fetch);
app.use("/auth", user);

app.use("*", (req, res) => res.status(404).json({ error: "not found"}));
module.exports = app