const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const registerRoutes = require("./routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// register all routes
registerRoutes(app);

module.exports = app;
