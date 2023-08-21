const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./index");
const jwt = require("express-jwt");

const authHandler = require("./handlers/authHandler");
const viewHandler = require("./handlers/viewHandler");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/oca/login", authHandler.login);
app.get("/oca/signup", authHandler.signup);
db.init();

app.use(
  jwt
    .expressjwt({
      algorithms: ["HS256"],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: ["/oca/signup", "/oca/login"],
    })
);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log("Service started successfully");
});
