<template>
  <v-ons-page>
    <v-ons-splitter>
      <v-ons-splitter-side swipeable side="right" collapse="" width="260px" :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="isOpen"
      >
        <menu-page></menu-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <app-tabbar></app-tabbar>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>
import AppTabbar from './AppTabbar.vue';
import MenuPage from './pages/Menu.vue';
export default {
  name: 'Splitter',
  computed: {
    isOpen: {
      get() {
        return this.$store.state.splitter.open;
      },
      set(newValue) {
        this.$store.commit('splitter/toggle', newValue)
      }
    }
  },
  components: { AppTabbar, MenuPage }
};
</script>

<style>
ons-splitter-side[animation=overlay] {
  border-left: 1px solid #bbb;
}
</style>