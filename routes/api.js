// const { MongoClient, ObjectId } = require("mongodb");
// const uri = "mongodb://localhost:2717";
// const client = new MongoClient(uri);
// const database = client.db("dataExpress");
// const collection = database.collection("users");
var express = require('express');
var session = require('express-session');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:2717';
const client = new MongoClient(uri);
const database = client.db('dataExpress');
const collection = database.collection('users');

/* GET home page. */
router.get('/', function(req, res, next) { // log in
    

});

router.post('/', function(req, res) { // sign up
    
})

module.exports = router;