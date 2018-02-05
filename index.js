const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./queries");
const citiesRouter = require("./controllers/cities");
const perceptionsRouter = require("./controllers/perceptions");


app.use(bodyParser.json());
app.use(cors());
app.use("/api/cities", citiesRouter);
app.use("/api/perceptions", perceptionsRouter);
app.use(express.static("build"));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
