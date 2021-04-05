<template>
  <div>
    <b-progress
      class="mt-5"
      :value="getNumber"
      variant="success"
      striped
      :animated="this.$store.state.animate"
    ></b-progress>
    <p>
      <em>{{ getStatus }}</em>
    </p>

    <!-- <b-progress :value="50" variant="info" striped :animated="animate" class="mt-2"></b-progress>
    <b-progress :value="75" variant="warning" striped :animated="animate" class="mt-2"></b-progress>
    <b-progress :value="100" variant="danger" :animated="animate" class="mt-3"></b-progress> -->
<!-- 
    <b-button variant="secondary" @click="animate = !animate" class="mt-3">
      {{ animate ? "Stop" : "Start" }} Animation
    </b-button> -->
  </div>
</template>

<script>
export default {
  computed: {
    getStatus: function () {
      return this.$store.state.currentStep;
    },
    getNumber: function () {
      return this.$store.state.progressNumber;
    },
  },
  data() {
    return {
    };
  },
};
</script>