
// =====================================================================
// Requires
// =====================================================================
require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();

var fs = require('fs');


var userCommand = process.argv[2];
var secondCommand = process.argv[3];


// =====================================================================
// 4 Main functions
// =====================================================================


// MOVIE Call Function

var movieCall =
    function () {


        // Grab or assemble the movie name and store it in a variable called "movieName"
        var movieName = "";
        for (let i = 3; i < process.argv.length; i++) {
            movieName += " " + process.argv[i].trim();
        }


        var queryUrl = "http://www.omdbapi.com/?t=" + movieName.trim() + "&y=&plot=short&apikey=trilogy";

        if (secondCommand === undefined) {
            console.log("\n========== Type New Movie or Try ==========\n");
            console.log("If you haven't watched Mr. Nobody, then you should: \nhttp://www.imdb.com/title/tt0485947/" + "\nIt's on Netflix! ");
            console.log("\n=============================================\n");

        }

        else {
            request(queryUrl, function (error, response, body) {
                console.log(queryUrl);
                if (!error && response.statusCode === 200) {
                    console.log("\n========== * Movie *  ==========\n");
                    console.log
                        ("Movie Title: " + JSON.parse(body).Title
                        + "\nRelease Year: " + JSON.parse(body).Year
                        + "\nIMBDRating: " + JSON.parse(body).imdbRating
                        + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value
                        + "\nCountry: " + JSON.parse(body).Country
                        + "\nLanguage: " + JSON.parse(body).Language
                        + "\nPlot: " + JSON.parse(body).Plot
                        + "\nActors: " + JSON.parse(body).Actors);
                    console.log("\n=================================\n");

                }
            });

        }
    }


// Concert Call Function

var concertCall =

    function () {


        var artist = "";
        for (let i = 3; i < process.argv.length; i++) {
            artist += " " + process.argv[i].trim();
        }

        // Include the request npm package (run "npm install request" in this folder first!)
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist.trim() + "/events?app_id=codingbootcamp";


        if (secondCommand === undefined) {
            console.log("\n========== Type your band or artist name again ==========\n");

        }
        else {
            // console.log(queryUrl);
            request(queryUrl, function (error, response, body) {


                var eventDate = JSON.parse(body)[0].datetime;
                var concertDate = moment(eventDate).format('MM/DD/YYYY')



                if (!error && response.statusCode === 200) {
                    console.log("\n=========== * Concert *  ===========\n");


                    console.log
                        ("Venue Name: " + JSON.parse(body)[0].venue.name
                        + "\nVenue location: " + JSON.parse(body)[0].venue.city
                        + "\nDate of the Event: " + concertDate

                        );
                    console.log("\n=====================================\n");

                }
            });
        }
    }





//Sopitfy Function
// var getArtistNames = function(artis){
//     return artist.name;
// }
var spotifySong =
    function (songName) {




        if (songName === undefined) {
            console.log("\n========== Type a New Song or Try ============\n");
            console.log("Artist: Ace of Base" + "\nSong:The Sign ");
            console.log("\n===============================================\n");
        } else {


            //      var songName= '';
            // for (let i = 3; i < process.argv.length; i++) {
            //     songName += " " + process.argv[i].trim();
            // }


            //launch spotify search
            spotify.search({ type: 'track', query: songName }, function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }
                //tried searching for release year! Spotify doesn't return this!

                console.log("\n=============== * Spotify *  ===============\n");
                console.log
                    ("Artist: " + data.tracks.items[0].artists[0].name
                    + "\nSong Title: " + data.tracks.items[0].name
                    + "\nAlbum: " + data.tracks.items[0].album.name
                    + "\nPreview Here: " + data.tracks.items[0].preview_url
                    );

                console.log("\n============================================\n");

            });
        };

    }




//Do What it Says Function
var doWhat =
    function () {
        // App functionality from file read / loads fs npm package


        fs.readFile("random.txt", "utf-8", function (error, data) {
            console.log(data);
            if (error) throw err;

            var dataArr = data.split(',');
            if (dataArr.length == 2) {
                call(dataArr[0], dataArr[1]);
            }
        });

    }

// =====================================================================
// Run the main function with the initial action and data
// =====================================================================

var call = function (userCommand, secondCommand) {

    switch (userCommand) {
        case "movie-this":
            movieCall(secondCommand);
            break;
        case "concert-this":
            concertCall();
            break;

        case "spotify-this-song":
            spotifySong(secondCommand);
            break;

        case 'do-what-it-says':
            doWhat();
            break;

        default:
            console.log("LIRI does not know that")
            break;
    }
}

var runThis = function (argOne, argTwo) {
    call(argOne, argTwo);

}
runThis(process.argv[2], process.argv[3]);