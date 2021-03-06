// require nmps
var Twitter = require('twitter');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var request = require("request");



// code to get the data from keys.js 

var twitterKeys = require('./keys.js');
//keys stored in a variable
var client = new Twitter({
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret
});
//	test to see if the keys are working
	// console.log(client);

//declare a variable to hold the command

var command = process.argv[2];

//declare a variable to hold the user's input
var input = "";

//declare a variable to loop through multiple word inputs by user
//the loop goes through each input and adds it to the previous to make one string that will be used as the search criteria
var nodeArgs = process.argv;

for (var i=3; i < nodeArgs.length; i++){
  if (i > 3 && i < nodeArgs.length){
    input = input + "+" + nodeArgs[i];
  } else{
    input = input + nodeArgs[i];
  }
};


//use switch case to list all the commands: my-tweets, spotify-this-song, movie-this, do-what-it-says
switch (command) {
	case 'my-tweets':
	myTweets();
	break;

	case 'spotify-this-song':
  if (input){
    spotify(input);
  } else {
    spotify('The Sign Ace of Base');
  }
  break;

  case 'movie-this':
  if (input){
    movie(input);
  } else {
    movie('Mr Nobody');
  }
  break;

  case 'do-what-it-says':
  dwis();
  break;

  default:
    console.log("Sorry....your command is invalid. Please use my-tweets, spotify-this-song, movie-this, or do-what-it-says");
};

//node liri.js my-tweets shows last 20 tweets and when they were created in your terminal/bash window
function myTweets() {

  var params = {screen_name: 'MaltNectar', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweetData, response) {
    if (!error) {

      console.log('<<<<<<<<<<<<<<<< My  Tweets >>>>>>>>>>>>>>>>');
      tweetData.forEach(function(obj) {
        console.log('--------------------------');
        console.log('Time: ' + obj.created_at);
        console.log('Tweet: ' + obj.text);
        console.log('--------------------------');

      });
      console.log('<<<<<<<<<<<<<<<<<<<<<<End>>>>>>>>>>>>>>>>>>>>>>');
        
      } else {
        console.log(error);
      }
    });
};

function spotify(input) {

 var spotify = new Spotify({
  id: '5fbd873d512145ef99f5bd94287ee12e',
  secret: '95b557199e174647afcd06b5c233fc82'
});

 spotify.search({ type: 'track', query: input }, function(err, data) {
  if (err) {
   return console.log('Error occurred: ' + err);
 }

 console.log('<<<<<<<<<<<<<<<< Track Info >>>>>>>>>>>>>>>>');
 console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
 console.log('Name: ' + data.tracks.items[0].name);
 console.log('Link: ' + data.tracks.items[0].preview_url);
 console.log('Album: ' + data.tracks.items[0].album.name);
 console.log('<<<<<<<<<<<<<<<<<<< End  >>>>>>>>>>>>>>>>>>>');

    // console.log(JSON.stringify(data, null, " 	"));
  });

};

function movie(input) {

 request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&tomatoes=true&apikey=40e9cece", function(error, response, body) {


    if(!error && response.statusCode == 200){

      var body = JSON.parse(body);

      console.log('<<<<<<<<<<<<<<<< Movie Info >>>>>>>>>>>>>>>>');
      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log('<<<<<<<<<<<<<<<<<<< End  >>>>>>>>>>>>>>>>>>>');

    } else {
      console.log('Error occurred.')
    };
   }); 
  };
  
 function dwis() {

  fs.readFile('random.txt', 'utf8', function(err,data){

  
  var contents = data.toString();
  var contArray = contents.split(",");

  // console.log(contArray);



  var randomFunction = contArray[0];
  var randomArgument = contArray[1];

  switch (randomFunction) {
    case 'my-tweets':
    randomFunction = myTweets();
    break;

    case 'spotify-this-song':
    randomFunction = spotify(randomArgument);
    break;

    case 'movie-this':
    randomFunction = movie(randomArgument);
    break;

  };
});
};