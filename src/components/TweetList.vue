<template>
  <div>
    <b-card-group
      deck
      v-for="card in this.$store.state.analyzedTweets"
      v-bind:key="card.id"
      class="mt-1 mb-b-1"
    >
      <app-tweet-card :cardInfo="card"></app-tweet-card>
    </b-card-group>
  </div>
</template>

<script>
import TweetCard from "./TweetCard.vue";
export default {
  components: {
    "app-tweet-card": TweetCard,
  },
  computed: {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
