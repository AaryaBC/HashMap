/**
 * Created by ranjay on 10/24/15.
 */
var request = require("request");
var Q = require("q");
var queryString = require("querystring");
var utils   = require('../utils/config');

var Twitter = require("twitter");
var client = new Twitter({
    consumer_key: utils.twitterConsumer_key,
    consumer_secret: utils.twitterConsumer_secret,
    access_token_key: utils.twitterAccess_token_key,
    access_token_secret: utils.twitterAccess_token_secret
});


exports.searchTweets = function (req, res) {

    /*
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    */
    var search = "#"  +req.params.hashTag;
    console.log(search);

    console.log("endpoint hit");
    client.get("search/tweets", {
        q:  search,
        count: 50
    }, function(error, tweets, response){

        if(error){
            //throw error;
            console.log("Error: "+ JSON.stringify(error));
        } else{
            console.log(JSON.stringify(tweets));  // The favorites.
            console.log(JSON.stringify(response));  // Raw response object.
            res.json(tweets);
        }

    });
};


exports.searchLocationTweets = function (req, res) {

    client.get("geo/search", {
        lat:  "77.0164",
        long: "38.9047",
        count: 50
    }, function(error, tweets, response){

        if(error){
            //throw error;
            console.log("Error: "+ JSON.stringify(error));
        } else{
            console.log(JSON.stringify(tweets));  // The favorites.
            console.log(JSON.stringify(response));  // Raw response object.
            res.json(tweets);
        }

    });


};


exports.twitterLogin = function(request, response){


    response.send("Welcome to the login page");
    /*
    makeRequest(params).then(function(user){

        console.log(user);
        response.send(user.body);

    },function(error){
        response.send(error.body);
    });
    */
};







