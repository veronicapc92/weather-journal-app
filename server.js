// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = 8000;
// Spin up the server
const server = app.listen(port, listener);
// Callback to debug
function listener() {
  console.log(`Running on localhost: ${port}`);
}

// Get route
app.get("/all", (req, res) => res.send(projectData));

// Post Route
app.post("/all", (req, res) => {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.feelings = req.body.feelings;
  res.send(projectData);
});
