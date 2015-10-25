var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
//var cloudinary = require('cloudinary');
//var config = require('./utils/config');

var twitterServices = require("./services/twitterServices");
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000;        // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

router.route('/login').get(twitterServices.twitterLogin);


router.route("/tweets/:hashTag").get(twitterServices.searchTweets);

router.route("/tweets/location").get(twitterServices.searchLocationTweets);

// prefix all routes with ap1/v1
app.use('/api/v1', router);


app.listen(port);
console.log("magic happens on port: " + port);