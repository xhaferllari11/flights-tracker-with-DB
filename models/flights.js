const mongoose = require('mongoose');


const currDate = new Date();

const flightsSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest','United']},
    flightNo: {type: Number, min: 10, max: 9999},
    departs: {
        type: Date,
        default: currDate.setFullYear(currDate.getFullYear()+1)
    }
});

module.exports = mongoose.model('Flight', flightsSchema);
