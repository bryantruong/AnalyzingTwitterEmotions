<template>
  <b-card v-bind:title="getTitle">
    <b-card-text>
      <em>"{{ cardInfo.text }}"</em>
    </b-card-text>

    <b-card-text>
      <ul>
        <li>Anger: {{ cardInfo.emotions.anger }}</li>
        <li>Disgust: {{ cardInfo.emotions.disgust }}</li>
        <li>Fear: {{ cardInfo.emotions.fear }}</li>
        <li>Joy: {{ cardInfo.emotions.joy }}</li>
        <li>Sadness: {{ cardInfo.emotions.sadness }}</li>
      </ul>
    </b-card-text>
    <b-button variant="primary" v-bind:href="url" target="_blank" class="card-link"
      >View Tweet</b-button
    >
  </b-card>
</template>

<script>
export default {
  props: ["cardInfo"],
  data: function () {
    return {};
  },
  methods: {},
  computed: {
    // Generate the Link to the Original Tweet
    url() {
      let linkToTweet =
        "https://www.twitter.com/" +
        this.$store.state.handle +
        "/status/" +
        this.cardInfo.id;
      return linkToTweet;
    },
    getTitle(){
      let emotions = this.cardInfo.emotions;
      // Use a reducer function to get the key with the max value 
      let maxEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
      // Capitalize the first letter
      maxEmotion = maxEmotion.charAt(0).toUpperCase() + maxEmotion.slice(1);
      return maxEmotion;
    }
  },
};
</script>

<style scoped>
</style>