const citiesRouter = require('express').Router()
const db = require("../queries");

citiesRouter.get("/", (request, response) => {
  db.getAllCities(request, response);
});

citiesRouter.get("/:id", (request, response) => {
  db.getSingleCity(request, response);
});

citiesRouter.get("/:id/perceptions", (request, response) => {
  db.getPerceptionsOfOneCity(request, response);
});

module.exports = citiesRouter