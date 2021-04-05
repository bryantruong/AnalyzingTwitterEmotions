<template>
  <b-container>
    <h3 class="display-3">Welcome!</h3>
    <p class="lead">This application uses Watson Natural Language Understanding to analyze a given Twitter user's last 100 tweets.</p>
    <p class="font-weight-light font-italic"><small>
      *Note that this only works for public Twitter accounts. Retweets are not analyzed.
      </small>
    </p>
    <app-user-input />
    <app-progress-bar></app-progress-bar>
    <app-tweet-list></app-tweet-list>
  </b-container>
</template>

<script>
import UserInput from "./UserInput.vue";
import ProgressBar from "./ProgressBar.vue";
import TweetList from "./TweetList.vue";
export default {
  components: {
    "app-user-input": UserInput,
    "app-progress-bar": ProgressBar,
    "app-tweet-list": TweetList
  },
  computed: {
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
