const perceptionsRouter = require('express').Router()
const db = require("../queries");

perceptionsRouter.get("/", (request, response) => {
  db.getAllPerceptions(request, response);
});

perceptionsRouter.post("/", (request, response) => {
  db.createPerception(request, response);
});

module.exports = perceptionsRouter