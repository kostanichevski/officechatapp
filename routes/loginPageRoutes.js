const express = require("express");
const authHandler = require("./handlers/authHandler");
const router = express.Router();

router.get("/oca/login", authHandler.login);
router.get("/oca/signup", authHandler.signup);

module.exports = router;
