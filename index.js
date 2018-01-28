const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./queries');

app.use(cors());

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
