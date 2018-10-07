require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

var request = require("request");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument

for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {

        movieName = movieName + "+" + nodeArgs[i];

    }

    else {

        movieName += nodeArgs[i];

    }
}

// Include the request npm package (run "npm install request" in this folder first!)
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function (error, response, body) {


    if (!error && response.statusCode === 200) {

        console.log
            ("Movie Title: " + JSON.parse(body).Title
            + "\nRelease Year: " + JSON.parse(body).Year
            + "\nRating: " + JSON.parse(body).imbdRating
            // + "\n Release Year: " + JSON.parse(body).Rating[2]
            + "\nRelease Year: " + JSON.parse(body).Country
            + "\nRelease Year: " + JSON.parse(body).Language
            + "\nRelease Year: " + JSON.parse(body).Plot
            + "\nRelease Year: " + JSON.parse(body).Actors);
        console.log("\n----------\n");

    }
});



