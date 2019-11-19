const Flight = require('../models/flights');

function create(req,res,next){
    Flight.findById(req.params.id, function(err,flight){
        if (req.body.arrival) {
            //convert to date object
            req.body.arrival = new Date(req.body.arrival);
        } else delete req.body.arrival; //Schema sets to default if deleted
        flight.destinations.push(req.body);
        flight.save(function(err){
            if (err) {console.log(err);}
            res.redirect(`/flights/${req.params.id}`);
        })
    })
}

module.exports = {
    create
}