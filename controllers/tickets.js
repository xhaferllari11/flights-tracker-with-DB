const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

function newTicket(req,res,next){
    Ticket.find({flight: req.params.flightId})
    .exec(function(err,tickets){
        Flight.findById(req.params.flightId)
        .exec(function(e, f){
            res.render('tickets/new', {
                title: 'New Ticket',
                boughtTics: tickets,
                flight: f   
            })
        })
    })
}

function create(req,res,next){
    req.body.flight = req.params.flightId;
    Ticket.create(req.body, function(er, ticket){
        console.log(ticket);
        res.redirect(`/flights/${req.params.flightId}`);
    })
}

module.exports = {
    new: newTicket,
    create
}