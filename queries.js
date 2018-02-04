var promise = require("bluebird");

var options = {
  // Initialization Options
  promiseLib: promise
};

var connectionString = "";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = process.env.DATABASE_URL + "?ssl=true";
}

var pgp = require("pg-promise")(options);
console.log("Database", process.env.DATABASE_URL);
var db = pgp(connectionString);

function getAllCities(req, res) {
  db
    .any("select * from cities")
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
    .one("select * from cities where id = $1", cityID)
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONEcity"
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
      "select * from cities INNER JOIN perceptions ON cities.id = perceptions.city_id WHERE cities.id = $1",
      cityID
    )
    .then(function(data) {
      res.status(200).json({
        data: data
      });
    })
    .catch(error => {
      console.log(error);
      response.status(404).end();
    });
}

function createPerception(req, res) {
  req.body.city_id = parseInt(req.body.city_id);
  db.none('insert into perceptions(city_id, temperature, comment)' +
      'values(${city_id}, ${temperature}, ${comment})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted perception'
        });
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).end();
    });
}

module.exports = {
  getAllCities: getAllCities,
  getSingleCity: getSingleCity,
  getPerceptionsOfOneCity: getPerceptionsOfOneCity,
  createPerception: createPerception
};
