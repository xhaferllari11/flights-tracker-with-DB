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
        res.redirect(`/flights/${req.params.flightId}`);
    })
}

function deteleTicket(req,res,next){
    Ticket.deleteOne({_id: req.params.ticketId})
    .exec(function(err){
        console.log(err);
        res.redirect(`/flights/${req.params.flightId}`)
    })
}

module.exports = {
    new: newTicket,
    create,
    delete: deteleTicket
}