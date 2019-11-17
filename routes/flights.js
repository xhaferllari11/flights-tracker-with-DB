var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/new', function(req, res, next){
  console.log('went in');
  res.render('flights/new', {title: 'Flights Tracker'});
})

router.get('/', function(req, res, next) {
  res.render('flights/index', {title: 'Flights Tracker'});
});
module.exports = router;
