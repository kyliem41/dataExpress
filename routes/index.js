var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.user){
    console.log('Someone loged in')
    res.render('index', { title: 'Express' ,logIn: "Options", logLink: "/option"});
  }else{
    res.render('index', { title: 'Express', logIn: "Log In", logLink: "/logIn"});
  }
  
});

module.exports = router;