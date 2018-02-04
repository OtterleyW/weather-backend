const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./queries');

app.use(cors());
app.use(express.static('build'))

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/cities", (request, response) => {
  db.getAllCities(request, response);
});

app.get("/api/cities/:id", (request, response) => {
  db.getSingleCity(request, response);
});

app.get("/api/cities/:id/perceptions", (request, response) => {
  db.getPerceptionsOfOneCity(request, response);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
