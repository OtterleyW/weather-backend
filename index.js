const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./queries');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

app.get("/api/cities", (request, response) => {
  db.getAllCities(request, response);
});

app.get("/api/cities/:id", (request, response) => {
  db.getSingleCity(request, response);
});

app.get("/api/cities/:id/perceptions", (request, response) => {
  db.getPerceptionsOfOneCity(request, response);
});

app.post("/api/perceptions/", (request, response) => {
  db.createPerception(request, response);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});