var Flight = require('../models/flight');
var moment = require('moment');

var passInObj = {title: 'Flights Tracker'};

function create(req,res,next){
    if (req.body.departs) {
        //convert to date object
        req.body.departs = new Date(req.body.departs);
    } else delete req.body.departs; //Schema sets to default if deleted
    req.body.flightNo = parseInt(req.body.flightNo);
    if (req.body.flightNo === NaN) {}
    let flight = new Flight(req.body);
    flight.save(function(err){
        if (err) {
            console.log(err);
            return res.render('flights/new', {title: 'New Flight'});
        }
        res.redirect('/');
    })
}

function index(req, res, next) {
    Flight.find({},function(err, flights){
        res.render('flights/index', {flightDocs: flights, title: 'Flights', moment});
    })
}

function showNewFlight(req,res,next){
    res.render('flights/new', {title: 'New Flight'});
}

function checkAirports(aiportToCheck, currDestinations, currAirport){
    if (currDestinations.some( (d) => d.airport == aiportToCheck)) {
        console.log('matched');
        return "disabled";
    } else if (currAirport == aiportToCheck) { 
        return "disabled";
    } else {return "";}
}

function show(req,res,next){
    Flight.findById(req.params.id, function(err,flight){
        res.render('flights/show', {title: 'Flight Details', flight, moment, checkAirports})
    })
}



module.exports = {
    new: showNewFlight,
    index,
    create,
    show
}