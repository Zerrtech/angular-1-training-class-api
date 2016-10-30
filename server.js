// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static image serving
//app.use(express.static('images'));

var port = process.env.PORT || 5000;        // set our port
console.log(process.env); // $$$ debugging to see what HEROKU spits out automatically in env

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var herodata = require('./data/heroes.json');
// modify the imageUrl property to have the full URL of this instance
var host;
if (process.env.HOST) {
    host = process.env.HOST;
} else {
    host = "http://localhost";
}
var url = host + ":" + port.toString();
for (var h=0; h < herodata.length; h++) {
    herodata[h].imageUrl = url + herodata[h].imageUrl;
}

router.route('/heroes')
.post(function(req, res) {
    res.status(201).send(req.body);
})
.get(function(req, res) {
    return res.json(herodata);
});

router.route('/heroes/:id')
.put(function(req, res) {
    res.status(204).send();
})
.get(function(req, res) {
    var id = parseInt(req.params.id, 10);
    var matches = herodata.filter(function(hero) {
        return (hero.id === id);
    });
    if (matches.length === 1) {
        res.json(matches[0]);
    } else {
        res.status(404).send({ error: 'Hero not found!'});
    }
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);
app.use('/images', express.static('images'));

// START THE SERVER
// =============================================================================
app.listen(port);
