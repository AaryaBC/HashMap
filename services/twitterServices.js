/**
 * Created by ranjay on 10/24/15.
 */
var request = require("request");
var Q = require("q");
var queryString = require("querystring");
var utils   = require('../utils/config');
var sentiment = require('sentiment');

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

    var negativeCount = 0;
    var positiveCount = 0;

    var search = "#"  +req.params.hashTag;
    console.log(search);

    console.log("endpoint hit");
    client.get("search/tweets", {

        q: search,
        include_entities: true,
       // geocode: "38.9047,-77.0164,1000mi",
        count: 50
    }, function(error, tweets, response){

        if(error){
            //throw error;
            console.log("Error: "+ JSON.stringify(error));
        } else{
            console.log(JSON.stringify(tweets));  // The favorites.
            console.log(JSON.stringify(response));  // Raw response object.
            //res.json(tweets.statuses);

            for(var x in tweets.statuses ){
                if(tweets.statuses[x].text != null ||  tweets.statuses[x].text != ""){

                    var sentimentResult = sentiment(tweets.statuses[x].text, {
                        "racist": -2,
                        "racially profiled": -2,
                        "need justice": -2,
                        "racsist cop": -2,
                        "racist system": -1,
                        "unjust": -1,
                        "inhumane": -1
                    });

                    if(sentimentResult.score > 0){
                        positiveCount++;

                    }else{
                        negativeCount++
                    }


                }
            }
            saveToParse({"positiveCount":positiveCount, "negativeCount":negativeCount, "numberOfTweets":tweets.statuses.length,"hashtag":search});
            res.send({"positiveCount":positiveCount, "negativeCount":negativeCount, "numberOfTweets":tweets.statuses.length});
        }

    });
};


exports.predifinedSearch = function (req, res) {





    var searchArrays = ["blacklivesmatter","heforshe","justiceforjason", "handsupdontshoot"];
    var promiseArray = [];

    var search = "";
    console.log(search);
    var returnArray = [];

    for(var pos in searchArrays){



        getTweets(searchArrays[pos]).then(function(data){
            //returnArray.push(data);
            saveToParse(data);

        },function(error){
            res.send({"error":error});
        })





    }
    console.log("endpoint hit");
    res.send("Success");


};

function getTweets(search){

    var deferred = Q.defer();

    var negativeCount = 0;
    var positiveCount = 0;

    client.get("search/tweets", {

        q: search,
        include_entities: true,
        // geocode: "38.9047,-77.0164,1000mi",
        count: 10
    }, function(error, tweets, response){

        if(error){
            //throw error;
            console.log("Error: "+ JSON.stringify(error));
            deferred.reject({"Error": error});
        } else{
             console.log(JSON.stringify(tweets));  // The favorites.
            console.log(JSON.stringify(response));  // Raw response object.
            //res.json(tweets.statuses);

            for(var x in tweets.statuses ){
                if(tweets.statuses[x].text != null ||  tweets.statuses[x].text != ""){

                    var sentimentResult = sentiment(tweets.statuses[x].text, {
                        "racist": -2,
                        "racially profiled": -2,
                        "need justice": -2,
                        "racsist cop": -2,
                        "racist system": -1,
                        "unjust": -1,
                        "inhumane": -1
                    });

                    if(sentimentResult.score > 0){
                        positiveCount++;

                    }else{
                        negativeCount++;
                    }


                }
                deferred.resolve({"positiveCount":positiveCount, "negativeCount":negativeCount, "numberOfTweets":tweets.statuses.length,"hashtag":search});
                //returnArray.push();
            }
            deferred.resolve({"positiveCount":positiveCount, "negativeCount":negativeCount, "numberOfTweets":tweets.statuses.length,"hashtag":search});
            negativeCount = 0;
            positiveCount = 0

            //res.send({"positiveCount":positiveCount, "negativeCount":negativeCount, "numberOfTweets":tweets.statuses.length,"hashtag":searchArrays[pos]});
        }

    });

    return deferred.promise;
}


exports.searchLocationTweets = function (req, res) {

    client.get("geo/search", {
        "query": "Washington DC"
    }, function(error, tweets, response){

        if(error){
            //throw error;
            console.log("Error: "+ JSON.stringify(error));
            res.send(error);
        } else{
            console.log(JSON.stringify(tweets));  // The favorites.
            console.log(JSON.stringify(response));  // Raw response object.
            res.json(tweets);
        }

    });


};

exports.testSentimentAnalysis = function (req, response) {


    var r1 = sentiment("i like candy but i really hate dogs they are stupid");
    console.dir(r1);
    console.log(r1);
    response.send(r1);

}
/*
exports.dataMineTweets = function(req, res){

    var states = [{"lat":"77.0164", "long":"38.9047", "name":"DC"}, {"lat":"74.0059", "long":"40.7127", "name":"DC"}];

    for(var x in states){

        client.get("geo/search", {
            lat: states[x].lat,// "77.0164",
            long: states[x].lat,//"38.9047",
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

    }
    /*
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
*/

exports.twitterLogin = function(request, response){


    //response.send("Welcome to the login page");
    /*
    makeRequest(params).then(function(user){

        console.log(user);
        response.send(user.body);

    },function(error){
        response.send(error.body);
    });
    */
    client.stream('statuses/filter', {track: 'twitter'},  function(stream){
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            response.send(tweet.text);
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    });
};

function saveToParse(data){

    var params = {

        url: "/classes/Tweets",
        method: "POST",
        body :{
            positiveCount: data.positiveCount,
            negativeCount: data.negativeCount,
            total:    data.total,
            hashtag: data.hashtag
        }

    };

    makeRequest(params).then(function(data){

        console.log(data);
        //response.status(data.statusCode).send(data.body);
    },function(error){
        console.log(error.body);
        //.status(error.statusCode).send(error.body);
    });


};

exports.getAllSearchData = function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var params = {
        url: "/classes/Tweets",
        method: "GET"
    };

    makeRequest(params).then(function(data){

        console.log(data.body.results);

        res.send(data.body.results);
    },function(error){
        console.log(error.message)
    });

};


function makeRequest(params){

    //var baseUrl =  "https://api.parse.com/1";

    var deferred = Q.defer();

    var url = utils.baseUrl + params.url;

    request({
        url: url, //URL to hit
        method: params.method,
        body: params.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': utils.parseApplicationId,
            'X-Parse-REST-API-Key': utils.parseRestApiKey

        }
    }, function(error, response, body){
        if(!error ) {
            //console.log(response.statusCode, body);
            deferred.resolve({statusCode: response.statusCode, body: body});

        } else {
            console.log(error);
            deferred.reject({statusCode: response.statusCode, body: body});
        }
    });

    return deferred.promise;
}




