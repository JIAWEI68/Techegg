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
const bycrpt = require("bcryptjs");
const BYCRYPT_SALT_ROUNDS = 12;
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
router.route("/payment").post(function (req, res) {
 db.collection("payment").insertOne(req.body,
    (err, result) => {
      if (err) return console.log(err);
      console.log("added to list");
      res.send(result);
    }
  );
});
router.route("/payment").get(function (req, res) {
  db.collection("payment").find().toArray(
    (err, result) => {
      if (err) return console.log(err);
      console.log("got list");
      res.send(result);
    }
  );
}
);
router.route("/payment/:_id").delete(function (req, res) {
  db.collection("payment").findOneAndDelete(
    { _id: ObjectId(req.params._id) },
    (err, results) => {
      res.send(results);
    }
  );
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
    }
  );
});

router.route("/authuser").post(function (req, res2) {
  var username = req.body.username;
  var password = req.body.password;
  db.collection("users").findOne(
    { username: username },
    {
      password: 1,
      role: 1,
      _id: 0,
    },
    function (err, result) {
      if (result == null) res2.send([{ auth: false }]);
      else {
        bycrpt.compare(password, result.password, function (err, res) {
          if (err || res == false) {
            res2.send([{ auth: false }]);
          } else {
            res2.send([{ auth: true, role: result.role }]);
          }
        });
      }
    }
  );
});

router.route("/reguser").post(function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var role = req.body.role;
  bycrpt.hash(password, BYCRYPT_SALT_ROUNDS, function (err, hash) {
    db.collection("users").insertOne(
      { username: username, password: hash, role: role },
      (err, result) => {
        if (err) return console.log(err);
        console.log("user registered");
        res.send(result);
      }
    );
  });
});
module.exports = router;
