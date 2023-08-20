const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("/index");
const jwt = require("express-jwt");

const authHandler = require("./handlers/authHandler");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get();

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log("Service started successfully");
});
