const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require("./utils/forecast");


console.log(__dirname);
console.log(__filename);
const app = express();

// path to directory
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
// set up static file
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Manoj Patidar manoj",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "manoj Patidar patidar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    para: "This is help page",
    name: "Manoj patidar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "please add the address" });
  }
  geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error,forecastdata) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        location: location,
        forecast: forecastdata,
        address:req.query.address
      });
    })
  })
  // res.send({
  //   address: req.query.address,
  //   latitude: "343.34243",
  //   longitude: "342.3234"
  // });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search query",
    });
  }
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "manoj PATIDAR",
    msg: "help page 404 not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "MANOJ PATIDAR",
    msg: "page not found",
  });
});

app.listen("3000", () => {
  console.log("server started at port 3000");
});
