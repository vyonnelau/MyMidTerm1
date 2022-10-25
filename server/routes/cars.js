// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the car model
let car = require("../models/cars");

/* GET cars List page. READ */
router.get("/", (req, res, next) => {
  // find all cars in the cars collection
  car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
router.get("/add", (req, res, next) => {
  res.render("cars/add", {
    title: "Add a Car",
  });
});

// POST process the Car  Details page and create a new Car  - CREATE
router.post("/add", (req, res, next) => {
  let newCar = car({
    Carname: req.body.Carname,
    Category: req.body.Category,
    Carmodel: req.body.Carmodel,
    Price: req.body.Price,
  });
  car.create(newCar, (err, car) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the car list
      res.redirect("/cars");
    }
  });
});

// GET the Car Details page in order to edit an existing Car
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  car.findById(id, (err, cartoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("cars/details", { 
        title: "Update Car Detail", 
        cars: cartoedit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecar = car({
    _id: id,
    Carname: req.body.Carname,
    Category: req.body.Category,
    Carmodel: req.body.Carmodel,
    Price: req.body.Price,
  });
  car.updateOne({ _id: id }, updatecar, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the car list
      res.redirect("/cars");
    }
  });
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  car.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh car list
      res.redirect("/cars");
    }
  });
});

module.exports = router;
