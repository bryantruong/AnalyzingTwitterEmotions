//This is our API
const express = require('express');
var bodyParser = require('body-parser');
// const { debug } = require('ibm_db');


// Use the standard router Express ships with
const router = express.Router();
// Required to read from the .env file
require('dotenv').config({ silent: true });
// body-parser allows Express to read the HTTP request body (useful for POST/PUT/PATCH)
const { default: axios } = require('axios');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const { IamAuthenticator } = require('ibm-watson/auth');

// Create the service wrapper
const nlu = new NaturalLanguageUnderstandingV1({
    version: '2020-03-10',
    authenticator: new IamAuthenticator({
      apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY,
    }),
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
  });
// The get request to get the twitter user ID and if the account is protected or not
router.get('/getUserInfo:username', function (request, response) {
    let handle = request.params.username;
    console.log(handle);
    // After lots of debugging, you actually use the endpointURL WITHOUT the/by?usernames= 
    // Seems like axios appends the parameter to the endpoint URL automatically, unlike needle
    const endpointURL = "https://api.twitter.com/2/users/by?";
    let userInfo = null;
    getUserInfo(endpointURL, handle);
    async function getUserInfo(endpointURL, handle) {
        try {
            let twitterResponse = await axios.get(endpointURL, {
                headers: {
                    // 'User-Agent': 'v2UserLookupJS',
                    'authorization': 'TODO: Bearer Token Here!'
                },
                params: {
                    usernames: handle, // Edit usernames to look up
                    "user.fields": "protected", // Edit optional query parameters here
                }
            });
            userInfo = twitterResponse.data.data[0];
            console.log(userInfo);
            response.send(userInfo)
        }
        catch (error) {
            response.status(400).send({
                message: 'No user found with that handle.'
            });
        }

    }
});

// The get request to get the user's last 100 tweets. Does not include retweets and replies
router.get('/loadTweets:userID', function (request, response) {
    let userID = request.params.userID;
    let baseURL = "https://api.twitter.com/2/users/" + userID + "/tweets";
    let tweetResponse = null;
    getTweets(baseURL);
    async function getTweets(endpointURL) {
        try {
            let twitterResponse = await axios.get(endpointURL, {
                headers: {
                    'authorization': 'TODO: Bearer Token Here!'
                },
                params: {
                    "max_results": 100,
                    // "max_results": 10,
                    "exclude":'retweets,replies'
                }
            });
            fullTweetObject = twitterResponse.data.data;
            response.send(fullTweetObject);
        }
        catch (error) {
            response.status(400).send({
                message: 'Unable to get Tweets for the user.'
            });
        }

    }
});


// The get request to get the user's last 100 tweets. Does not include retweets and replies
router.get('/analyze:text', function (request, response) {
    let tweetText = request.params.text;
    console.log(tweetText);
    let watsonResponse = null;
    // https://cloud.ibm.com/apidocs/natural-language-understanding?code=node#emotion
    const options = {
        text: tweetText,
        features: {
          emotion: {},
        },
      };
    analyzeTweet(options);
    async function analyzeTweet(options) {
        try {
            let watsonResponse = await nlu.analyze(options)
            emotionResponse = watsonResponse.result.emotion.document.emotion;
            console.log(emotionResponse)
            response.send(emotionResponse);
        }
        catch (error) {
            console.log(error);
            response.status(400).send({
                message: 'Unable to Analyze Tweet Text.'
            });
        }

    }
});

//Export these routes as a router object for webServer.js
module.exports = router;
