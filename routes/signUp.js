var express = require('express');
var router = express.Router();
const passwordUtil = require('../security/password');
var session = require('express-session');
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:2717";

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    console.log('Someone loged in')
    res.render('signUp', { title: 'Express' ,logIn: "Options", logLink: "/option"});
  }else{
    res.render('signUp', { title: 'Express', logIn: "Log In", logLink: "/logIn"});
  }
});

router.post('/', async function(req, res, next) {
  const client = new MongoClient(uri);
  req.session.user = req.body;
  try {
    const database = client.db("dataExpress");
    const collection = database.collection("users");

    const { username, password, age, email, answer1, answer2, answer3 } = req.body;
    
    let hashedPass = await passwordUtil.hashPass(password);

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