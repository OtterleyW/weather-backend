var promise = require("bluebird");

var options = {
  promiseLib: promise
};

// Connect to database
var connectionString = "";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = process.env.DATABASE_URL + "?ssl=true";
}

var pgp = require("pg-promise")(options);
var db = pgp(connectionString);

function getAllCities(req, res) {
  db
    .any("SELECT * FROM cities")
    .then(function(data) {
      res.status(200).json({
        data
      });
    })
    .catch(error => {
      console.log(error);
      response.status(404).end();
    });
}

function getSingleCity(req, res) {
  var cityID = parseInt(req.params.id);
  db
    .one("SELECT * FROM cities WHERE id = $1", cityID)
    .then(function(data) {
      res.status(200).json({
        data
      });
    })
    .catch(error => {
      console.log(error);
      response.status(404).end();
    });
}

function getAllPerceptions(req, res) {
  db
    .any("SELECT * FROM perceptions ORDER BY created_at DESC")
    .then(function(data) {
      res.status(200).json({
        data
      });
    })
    .catch(error => {
      console.log(error);
      response.status(404).end();
    });
}

function getPerceptionsOfOneCity(req, res) {
  var cityID = parseInt(req.params.id);
  db
    .any(
      "SELECT * FROM cities INNER JOIN perceptions ON cities.id = perceptions.city_id WHERE cities.id = $1 ORDER BY perceptions.created_at DESC",
      cityID
    )
    .then(function(data) {
      res.status(200).json({
        data
      });
    })
    .catch(error => {
      console.log(error);
      response.status(404).end();
    });
}

function createPerception(req, res) {
  console.log(req.body)
  req.body.city_id = parseInt(req.body.city_id);
  db
    .none(
      "INSERT INTO perceptions(city_id, temperature, created_at)" +
        "values(${city_id}, ${temperature}, now())",
      req.body
    )
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Inserted perception"
      });
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).end();
    });
}

module.exports = {
  getAllCities: getAllCities,
  getSingleCity: getSingleCity,
  getPerceptionsOfOneCity: getPerceptionsOfOneCity,
  createPerception: createPerception,
  getAllPerceptions: getAllPerceptions
};
