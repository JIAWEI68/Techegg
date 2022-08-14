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
const { ObjectID } = require("bson");
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
  db.collection("payment").insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("added to list");
    res.send(result);
  });
});
router.route("/payment/delete").delete(function (req, res) {
  db.collection("payment").remove({});
});
router.route("/payment").get(function (req, res) {
  db.collection("payment")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      console.log("got list");
      res.send(result);
    });
});
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
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;
  bycrpt.hash(password, BYCRYPT_SALT_ROUNDS, function (err, hash) {
    db.collection("users").insertOne(
      {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
        role: role,
      },
      (err, result) => {
        if (err) return console.log(err);
        console.log("user registered");
        res.send(result);
      }
    );
  });
});
router.get("/users", (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  db.collection("users")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
});
//update users in mongoDB based on ObjectId
router.route("/users/:_id").put(function (req, res) {
  db.collection("users").updateOne(
    { _id: ObjectId(req.params._id) },
    { $set: req.body },
    (err, results) => {
      res.send(results);
    }
  );
});

router.route("/users/:_id").delete(function (req, res) {
  db.collection("users").findOneAndDelete(
    { _id: ObjectId(req.params._id) },
    (err, results) => {
      res.send(results);
    }
  );
});
//get items by id
router.get("/items/:_id", (req, res) => {
  const { _id } = req.params._id;
  // Get posts from db collection
  db.collection("items").findOne(
    { _id: ObjectId(req.params._id) },
    (err, result) => {
      if (err) return console.log(err);
      res.send(result);
    }
  );
});
router.route("/items/post").post((req, res) => {
  db.collection("items").insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("saved to database");
    res.send(result);
  });
});
router.route("/items/delete/:_id").delete((req, res) => {
  db.collection("items").findOneAndDelete(
    { _id: ObjectId(req.params._id) },
    (err, result) => {
      if (err) return console.log(err);
      console.log("deleted from database");
      res.send(result);
    }
  );
});
//edit item from mongoDB based on ObjectId
router.route("/items/:_id").put((req, res) => {
  db.collection("items").updateOne(
    { _id: ObjectId(req.params._id) },
    { $set: req.body },
    (err, result) => {
      if (err) return console.log(err);
      console.log("updated in database");
      res.send(result);
    }
  );
})
module.exports = router;
