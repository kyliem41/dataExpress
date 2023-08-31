var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.cookies){
    console.log('Someone loged in')
    res.render('option', { title: 'Express' ,logIn: "Options", logLink: "/option", pageSize:"height:100%"});
  }else{
    res.render('option', { title: 'Express', logIn: "Log In", logLink: "/logIn", pageSize:"height:100%"});
  }
});

module.exports = router;