const express = require("express");
const User = require("../models").user;

const { Router } = express;

const router = new Router();
const bcrypt = require("bcrypt");

router.get("/", async (request, response, next) => {
  try {
    const allUsers = await User.findAll();
    response.json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (request, response, next) => {
  try {
    const { email, password, fullName } = request.body;
    if (!email || !password || !fullName) {
      response.status(400).send("missing parameters");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });
      response.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
