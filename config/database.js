var mongoose = require('mongoose');
mongoose.connect(
    'mongodb://localhost/flights', 
    {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true
    }
);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log(`DB connection on ${db.host} : ${db.port}`)
});
