<template>
  <v-ons-navigator swipeable
    :page-stack="pageStack"
    :pop-page="storePop"
    :options="options"
  ></v-ons-navigator>
</template>

<script>
import AppSplitter from './components/AppSplitter.vue';
import auth from './auth/';

export default {
  beforeCreate() {
    this.$store.commit('navigator/push', AppSplitter);
    //this.$store.dispatch('setUser', auth.getUser())
  },
  computed: {
    pageStack() {
      return this.$store.state.navigator.stack;
    },
    options() {
      return this.$store.state.navigator.options;
    }
  },
  methods: {
    storePop() {
      this.$store.commit('navigator/pop');
    }
  }
};
</script>