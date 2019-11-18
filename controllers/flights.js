var Flight = require('../models/flights');
var moment = require('moment');

var passInObj = {title: 'Flights Tracker'};



function create(req,res,next){
    if (req.body.departs) {
        req.body.departs = new Date(req.body.departs);
    } else delete req.body.departs;
    console.log(typeof(req.body.flightNo));
    req.body.flightNo = parseInt(req.body.flightNo);
    if (req.body.flightNo === NaN) {}
    let flight = new Flight(req.body);
    flight.save(function(err){
        if (err) {
            console.log(err);
            return res.render('flights/new', passInObj);
        }
        res.redirect('/');
    })
}

function index(req, res, next) {
    Flight.find({},function(err, flights){
        flightsArr = flights;
        flights.forEach(function(flight){
            flight.departs = moment(flight.departs).format("MMM D YYYY, h:mm a");
        })
        res.render('flights/index', {flightDocs: flightsArr});
    })
}

function showNewFlight(req,res,next){
    res.render('flights/new', passInObj);
}

module.exports = {
    new: showNewFlight,
    index,
    create
}