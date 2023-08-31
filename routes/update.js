var express = require('express');
var router = express.Router();
const passwordUtil = require('../security/password');
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:2717";

router.get('/', function(req, res, next) {
  res.render('update', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
    const client = new MongoClient(uri);
  
    try {
      const database = client.db("dataExpress");
      const collection = database.collection("users");
  
      const { age, email, answer1, answer2, answer3 } = req.body;
        
      let updatedUser = {
        age: age,
        email: email,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3
      }

      const username = req.session.user.username;
  
      await collection.updateOne({ username: username }, { $set: updatedUser });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    } finally {
      await client.close();
    }
  });

module.exports = router;