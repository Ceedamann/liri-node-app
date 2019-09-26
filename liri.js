require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');


var command = process.argv[2];
var value = process.argv.slice(3).join(" ");

// var userInput = "";
// for (let i = 3; i < value.length; i++) {
//     if(i > 3 && i < value.length){
//         userInput = userInput + "+" + value[i];
//     }else {
//         userInput += value[i];
//     }
    
// }

function spotifyThis(input) {
    spotify
        .search({ type: 'track', query: value, limit : 5})
        .then(function (resp) {
                    //    for (let i = 0; i < resp.length; i++) {
                        
                    //    } 
                       console.log("Artist Name: " + JSON.stringify(resp.tracks.items[0].artists[0].name, null, 2));
                       console.log("Song Title: " + JSON.stringify(resp.tracks.items[0].name, null, 2));
                       console.log("Preview link: " + JSON.stringify(resp.tracks.items[0].preview_url, null, 2));
                       console.log("Album Title: " + JSON.stringify(resp.tracks.items[0].album.name, null, 2)); 
                          
            
        })
        .catch(function (err) {
            console.log(err);
        });

}

function concertThis() {

}

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(resp) {
            console.log(resp);
            
          // Then we print out the imdbRating
          console.log("The movie's Title: " + resp.data.Title);
          console.log("The movie's was released in: " + resp.data.Year);
          console.log("The movie's rating is: " + resp.data.imdbRating);
        }
      );
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