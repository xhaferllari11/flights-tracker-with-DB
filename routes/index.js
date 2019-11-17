var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let x = new Date().setFullYear(new Date().getFullYear()+1);
  
  console.log( x);
  res.render('index', { title: 'Flights Tracker' });
});

module.exports = router;
