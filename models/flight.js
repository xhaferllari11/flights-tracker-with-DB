const mongoose = require('mongoose');

// I should make a new Airport model for reference instead of embed

const destinationSchema = new mongoose.Schema({
    airport: {
        type: String,
        enum: ['AUS','DAL','LAX','SAN','SEA']
    },
    arrival: {
        type: Date,
        default: function(){
            const currDate = new Date();
            currDate.setFullYear(currDate.getFullYear()+1);
            return currDate;
        }
    }
});

const flightsSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest','United']},
    flightNo: {type: Number, min: 10, max: 9999},
    departs: {
        type: Date,
        default: function(){
            const currDate = new Date();
            currDate.setFullYear(currDate.getFullYear()+1);
            return currDate;
        }
    },
    airport: {
        type: String,
        enum: ['AUS','DAL','LAX','SAN','SEA'],
        default: 'SAN'
    },
    destinations: [destinationSchema]
});

module.exports = mongoose.model('Flight', flightsSchema);

