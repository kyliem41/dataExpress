var express = require('express');
var router = express.Router();
var session = require('express-session');
const passwordUtil = require('../security/password');
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:2717";

router.get('/', function (req, res, next) {
  // let user = req.session.user;
  // res.cookie('john', 'johnson');
  if(req.session.user){
    console.log('Someone loged in')
    res.render('login', { title: 'Express' ,logIn: "Options", logLink: "/option"});
  }else{
    res.render('login', { title: 'Express', logIn: "Log In", logLink: "/logIn"});
  }
});

router.post('/', async function (req, res, next) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const database = client.db("dataExpress");
    const collection = database.collection("users");

    const {
      username,
      password
    } = req.query;
    req.session.user = username
    res.cookie(username)
    const userLogIn = await collection.findOne({ username: username });

    console.log("Recieved username: ", username);
    console.log("Received password: ", password);

    console.log("Retrieved user from DB: ", userLogIn);
    console.log("Comparing hashed passwords: ", password, "\n", userLogIn.password)

    if (userLogIn && await passwordUtil.comparePass(password, userLogIn.password)) {
      req.session.user = userLogIn;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

module.exports = router;