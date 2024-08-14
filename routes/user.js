const express = require("express");
const { logingUser, signupUser } = require("../controller/userControllers");

const router = express.Router();

router.post("/login", logingUser);

router.post("/signup", signupUser);

module.exports = router;
