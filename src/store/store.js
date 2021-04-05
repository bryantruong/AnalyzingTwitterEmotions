import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0,
        progressNumber: 0,
        currentStep: "Waiting for Username/Handle Input",
        handle: null,
        showError: false,
        errorMessage: "",
        userID: "",
        isPrivate: null,
        tweets: null,
        // Use this to model both the button and the input form
        disabled: false,
        //We will store the analyzed tweets here.
        analyzedTweets: [],
        animate: true,
    },
    mutations: {
        reset(state){
            // handle is modeled with the form, so no need to reset.
            state.counter = 0;
            state.currentStep = "Waiting for Username/Handle Input",
            state.errorMessage = "";
            state.userID = "";
            state.isPrivate = null;
            state.tweets = null;
            state.analyzedTweets = []
            state.aniimate = true;
        }
    },
    // Call actions, which will then call the mutations
    // Actions can be asynchronous, but mutations must be synchronous
    actions: {
        async getUserID({dispatch, state}, handle) {
            //First, update the UI
            state.handle = handle;
            state.progressNumber = 5;
            state.currentStep = "Connecting to Twitter API";
            let endpoint = "/api/getUserInfo"+state.handle;
            try {
                let userObject = await axios.get(endpoint);
                console.log(userObject.data);
                state.userID = userObject.data.id;
                state.progressNumber = 15;
                state.currentStep = "Found User ID from Twitter Handle";
                state.errorMessage = "";     
                if (userObject.data.protected == true){
                    state.progressNumber = 0;
                    state.currentStep = "Waiting for Username/Handle Input";
                    state.errorMessage = "The selected user is private/protected.";
                    state.showError = true;
                    state.isPrivate = null;
                    state.disabled = false;
                }
                else {
                    state.progressNumber = 15;
                    state.currentStep = "Found User ID from Twitter Handle";
                    dispatch('loadTweets')
                }
            } catch (error) {
                console.log("Error caught");
                state.progressNumber = 0;
                state.currentStep = "Waiting for Username/Handle Input";
                state.errorMessage = "No user found with that handle.";
                state.showError = true;
                state.isPrivate = null;
                state.disabled = false;
            } 
        },
        // Action to load the tweets from the Twitter API
        async loadTweets({dispatch, state}){
            let loadTweetsEndpoint = "/api/loadTweets"+state.userID;
            try {
                let userObject = await axios.get(loadTweetsEndpoint);
                state.tweets = userObject.data;
                let numOfTweets = state.tweets.length;
                state.progressNumber = 45;
                state.currentStep = numOfTweets +" tweets retrieved from the Twitter API. Sending to Watson API";
                console.log("Printing tweets from loadTweets");
                console.log(state.tweets);
                dispatch('analyzeTweets');
            } catch (error) {
                console.log("Error from getting tweets caught.");
                console.log(error);
                state.disabled = false;
            } 
        },
        async analyzeTweets({state}){
            console.log("ANALYZING TWEETS")
            let watsonEndpoint = "/api/analyze";
            const numOfTweets = state.tweets.length;
            for (const tweet of state.tweets){
                let tweetID = tweet.id;
                let fullText = tweet.text;
                let index = fullText.indexOf('https://t.co');
                let tweetText = '';
                if (index != -1) {
                    tweetText = fullText.slice(0,index);
                } else {
                    tweetText = fullText;
                }
                let currentEndpoint = watsonEndpoint + tweetText;
                try {
                    let analysisResults = await axios.get(currentEndpoint);
                    let analysisObject = {
                        id: tweetID,
                        text: fullText,
                        emotions: analysisResults.data
                    }
                    state.analyzedTweets.push(analysisObject);
                    // Hard coding the 55, since I set it to 45% once the tweets are retrieved.
                    let progressToAdd = (1/numOfTweets) * 55;
                    state.progressNumber += progressToAdd;
                    state.currentStep = "Connected to Watson NLU module. Analyzing tweets...";
                } catch (error){
                    console.log("Error when analyzing tweet.")
                    console.log(error);
                }
            }
            state.progressNumber = 100;
            state.currentStep = "Analysis Complete";
            state.animate = false;
            state.disabled = false;
        },
        reset({commit}){
            console.log("Trying to reset");
            commit('reset');
        }
    }
})