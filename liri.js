require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');


var command = process.argv[2];
var value = process.argv[3];

function spotifyThis(input) {
    spotify
        .search({ type: 'track', query: value, limit : 5 })
        .then(function (response) {
            console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });

}

function concertThis() {

}

function movieThis() {

}

function doWhatItSays() {

}
switch (command) {
    case "spotify-this-song":
        spotifyThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}