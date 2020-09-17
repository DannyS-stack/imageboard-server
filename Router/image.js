const express = require("express");
const Image = require("../models").image;

const { Router } = express;

const router = new Router();

// router.get("/", async (request, response, next) => {
//   try {
//     const allImages = await Image.findAll();
//     response.json(allImages);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/create", async (request, response, next) => {
  try {
    const newImage = await Image.create(request.body);
    response.json(newImage);
  } catch (error) {
    next(error);
  }
});

router.get("/findimage/:id", async (request, response, next) => {
  try {
    const foundImage = await Image.findByPk(request.params.id);
    if (foundImage) {
      response.json(foundImage);
    } else {
      response.status(400).send("Not an existing user");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 500);
  const offset = req.query.offset || 0;

  Image.findAndCountAll({ limit, offset })
    .then((result) => res.send({ images: result.rows, total: result.count }))
    .catch((error) => next(error));
});

module.exports = router;
