var Flight = require('../models/flight');
var moment = require('moment');
var Ticket = require('../models/ticket');

var passInObj = { title: 'Flights Tracker' };

function create(req, res, next) {
    if (req.body.departs) {
        //convert to date object
        req.body.departs = new Date(req.body.departs);
    } else delete req.body.departs; //Schema sets to default if deleted
    req.body.flightNo = parseInt(req.body.flightNo);
    if (req.body.flightNo === NaN) { }
    let flight = new Flight(req.body);
    flight.save(function (err) {
        if (err) {
            console.log(err);
            return res.render('flights/new', { title: 'New Flight' });
        }
        res.redirect('/');
    })
}

function index(req, res, next) {
    Flight.find({}, function (err, flights) {
        res.render('flights/index', { flightDocs: flights, title: 'Flights', moment });
    })
}

function showNewFlight(req, res, next) {
    res.render('flights/new', { title: 'New Flight' });
}

function checkAirports(aiportToCheck, currDestinations, currAirport) {
    if (currDestinations.some((d) => d.airport == aiportToCheck)) {
        console.log('matched');
        return "disabled";
    } else if (currAirport == aiportToCheck) {
        return "disabled";
    } else { return ""; }
}

function convertToNum(tiks) {
    let seats = [];
    tiks.forEach(function (tik) {
        let row, col;
        if (tik.seat.charAt(0) === 'A') {
            row = 2
        } else if (tik.seat.charAt(0) === 'B') {
            row = 3
        } else if (tik.seat.charAt(0) === 'C') {
            row = 4
        } else if (tik.seat.charAt(0) === 'D') {
            row = 5
        } else if (tik.seat.charAt(0) === 'E') {
            row = 6
        } else if (tik.seat.charAt(0) === 'F') {
            row = 7
        }
        col = parseInt(tik.seat.substr(1));
        seats.push((row * 100) + col);
    });
    console.log(seats);
    return seats;
}

function show(req, res, next) {
    console.log('entered here')
    Flight.findById(req.params.id, function (err, flight) {
        console.log('then here')
        Ticket.find({ flight: req.params.id }, function (e, ticks) {
            console.log('finally here');
            res.render('flights/show', {
                title: 'Flight Details',
                flight,
                moment,
                checkAirports,
                tickets: ticks,
                getSeatArr: convertToNum
            })
        })
    })
}


module.exports = {
    new: showNewFlight,
    index,
    create,
    show
}




// the code below is to be used in flights/show ejs to
// show available and taken seats in airplane, but apparently
// it takes too long to form 1000 divs, saving here when
// i get faster computer






