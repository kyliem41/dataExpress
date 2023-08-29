var express = require('express');
var router = express.Router();
var session = require('express-session');
const bcrypt = require('bcryptjs');
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:2717";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signUp', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
  const client = new MongoClient(uri);

  try {
    const database = client.db("dataExpress");
    const collection = database.collection("users");

    const { username, password, age, email, answer1, answer2, answer3 } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    let user = {
      username: username,
      password: hashedPass,
      age: age,
      email: email,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3
    }

    await collection.insertOne(user);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  } finally {
    await client.close();
  }
});

module.exports = router;