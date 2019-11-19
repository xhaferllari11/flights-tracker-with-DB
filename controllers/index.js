
function index(req,res,next){
    res.render('index', { title: 'Flights Tracker' })
}

module.exports = {
    index
}