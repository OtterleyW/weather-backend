var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

function getAllCities(req, res) {
  db.any('select * from cities')
    .then(function (data) {
      res.status(200)
        .json({data
        });
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
}

function getSingleCity(req, res) {
  var cityID = parseInt(req.params.id);
  db.one('select * from cities where id = $1', cityID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONEcity'
        });
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
}

function getPerceptionsOfOneCity(req, res) {
  var cityID = parseInt(req.params.id);
  db.any('select * from cities INNER JOIN perceptions ON cities.id = perceptions.city_id WHERE cities.id = $1', cityID).then(function(data) {
    res.status(200).json({
      data: data
    })
  }).catch(error => {
    console.log(error)
    response.status(404).end()
  })
}


module.exports = {
  getAllCities: getAllCities,
  getSingleCity: getSingleCity,
  getPerceptionsOfOneCity: getPerceptionsOfOneCity
};



