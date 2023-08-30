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
router.get('/', async function(req, res, next) { // get graph data

    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db("dataExpress");
      const collection = database.collection("users");
      collection.find({}, function(err, docs){
        if (err) {
            console.log(err);
            return;
        }
        docs.forEach(function(doc, index) { 
            let person = collection.findOne(doc) 
            console.log(person) 
        });
    });


      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    } finally {
      await client.close();
    }

});

router.post('/', function(req, res) { // sign up
    
})

module.exports = router;