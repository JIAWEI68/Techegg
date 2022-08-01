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
    db = database.db("miniprojectDB");
  }
);
//create new post
router.route('/posts').post(function (req, res) {
  db.collection('posts').insertOne(req.body, (err, results) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.send(results);
  })
})

// Get all posts
router.get("/posts", (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios
    .get(`${API}/posts`)
    .then((posts) => {
      res.status(200).json(posts.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
router.get("/items", (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios
    .get(`${API}/items`)
    .then((posts) => {
      res.status(200).json(posts.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
