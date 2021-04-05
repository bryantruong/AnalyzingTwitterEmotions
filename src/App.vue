<template>
  <div id="app">
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand href="#">Analyzing Tweet Emotions</b-navbar-brand>
    </b-navbar>
    <b-container class="mt-1">
      <Main />
    </b-container>
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },
  metaInfo: {
    title: 'Analyzing Tweet Emotions',
  },
};
</script>

<style>
</style>
