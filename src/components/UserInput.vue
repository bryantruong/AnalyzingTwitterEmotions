<template>
  <div>
    <b-form inline>
      <h4 class="mr-sm-2">Username to Analyze:</h4>
      <b-modal
        v-model="this.$store.state.showError"
        title="Error"
        @ok="handleOk"
        >{{ this.$store.state.errorMessage }}</b-modal
      >

      <label class="sr-only" for="inline-form-input-username">Username</label>
      <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          id="inline-form-input-username"
          placeholder="i.e. KingJames"
          v-model="handle"
          :disabled="this.$store.state.disabled"
          required
        ></b-form-input>
      </b-input-group>

      <b-button variant="primary" :disabled="this.$store.state.disabled" v-on:click="startAnalysis">Analyze</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      handle: null,
      modalShow: false,
    };
  },
  methods: {
    startAnalysis: function () {
      this.$store.state.disabled = true;
      // Reset the state, since we are starting a new analysis
      this.$store.dispatch("reset");
      if (this.handle != null) {
        this.$store.dispatch("getUserID", this.handle);
      } else {
        this.$store.state.errorMessage =
          "You must enter a valid, public Twitter username to proceed.";
        this.$store.state.showError = true;
        this.$store.state.disabled = false;
      }
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      this.$store.state.showError = false;
    },
  },
};
</script>

<style scoped>
</style>