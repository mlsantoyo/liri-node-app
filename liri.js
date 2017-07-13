// require nmps
var Twitter = require('twitter');
var fs = require('fs');
var Spotify = require('node-spotify-api');

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

//use switch case to list all the commands: my-tweets, spotify-this-song, movie-this, do-what-it-says
switch (command) {
	case 'my-tweets':
	myTweets();
	break;

	case 'spotify-this-song':
	spotify();
	break;

	case 'movie-this':
	movie();
	break;

	case 'do-what-it-says':
	dwis();
	break;
};

//node liri.js my-tweets shows last 20 tweets and when they were created in your terminal/bash window
function myTweets() {
	// var client = new Twitter;
    var params = {screen_name: 'MaltNectar', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweetData, response) {
      if (!error) {
        
        console.log('<<<<<<<<<<<<<<<< My Tweets >>>>>>>>>>>>>>>>');
        tweetData.forEach(function(obj) {
          console.log('--------------------------');
          console.log('Time: ' + obj.created_at);
          console.log('Tweet: ' + obj.text);
          console.log('--------------------------');
          
        });
        console.log('===========================================');
        // console.log(' ');
        // console.log(tweets);

        // console.log(tweetData);
      } else {
        console.log(error);
      }
    });
  };

  function spotify() {

  	var spotify = new Spotify({
  		id: '5fbd873d512145ef99f5bd94287ee12e',
  		secret: '95b557199e174647afcd06b5c233fc82'
  	});

  	spotify.search({ type: 'track', query: 'Like a stone' }, function(err, data) {
  		if (err) {
  			return console.log('Error occurred: ' + err);
  		}

  		console.log('================ Song Info ================');
        console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
        console.log('Name: ' + data.tracks.items[0].name);
        console.log('Link: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('===========================================');

    // console.log(JSON.stringify(data, null, " 	"));
  	});

  };