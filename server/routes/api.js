var id;
const express = require("express");
const router = express.Router();
// declare axios for making http requests
const axios = require("axios");
const API = "https://jsonplaceholder.typicode.com";
/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
var db;
MongoClient.connect(
  "mongodb+srv://test1:test1@techegg.qvwefhn.mongodb.net/Techegg?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, database) => {
    if (err) return console.log(err);
    db = database.db("Techegg");
  }
);
//create new post
router.route("/reviews").post(function (req, res) {
  db.collection("reviews").insertOne(req.body, (err, results) => {
    if (err) return console.log(err);
    console.log("saved to database");
    res.send(results);
  });
});

// Get all posts
router.get("/reviews", (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  db.collection("reviews")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
});
router.get("/items", (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  db.collection("items")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
});

router.get("/items/:id", (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  db.collection("items")
    .find({ id: router.param.id })
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
});
//delete reviews from the database
router.route("/reviews/:_id").delete(function (req, res) {
  db.collection("reviews").findOneAndDelete(
    { _id: ObjectId(req.params._id) },
    (err, results) => {
      res.send(results);
    }
  );
});
//update reviews from the database
router.route("/reviews/:_id").put(function (req, res) {
  db.collection("reviews").updateOne(
    { _id: ObjectId(req.params._id) },
    { $set: req.body },
    (err, results) => {
      res.send(results);
    });
});
module.exports = router;
