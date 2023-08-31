var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.cookies){
    console.log('Someone loged in')
    res.render('option', { title: 'Express' ,logIn: "Options", logLink: "/option"});
  }else{
    res.render('option', { title: 'Express', logIn: "Log In", logLink: "/logIn"});
  }
});

module.exports = router;