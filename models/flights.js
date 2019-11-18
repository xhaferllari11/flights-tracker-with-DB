const mongoose = require('mongoose');



const flightsSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest','United']},
    flightNo: {type: Number, min: 10, max: 9999},
    departs: {
        type: Date,
        default: function(){
            const currDate = new Date();
            return currDate.setFullYear(currDate.getFullYear()+1)
        }
    }
});

module.exports = mongoose.model('Flight', flightsSchema);
