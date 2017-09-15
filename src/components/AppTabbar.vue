<template>
  <v-ons-page>
    <custom-toolbar>
      {{ title }}
      <v-ons-toolbar-button slot="right" @click="$store.commit('splitter/toggle')">
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button>
    </custom-toolbar>

    <v-ons-tabbar
      position="auto"
      :tabs="tabs"
      :index.sync="index"
    ></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import Home from './pages/Home.vue';
import Profile from './pages/Profile.vue';

export default {
  data () {
    return {
      carouselIndex: 0,
      items: {
        gray: 'gray',
        blue: '#085078',
        dark: '#373B44',
        orange: '#D38312'
      }
    };
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    }
  },
  computed: {
    index: {
      get() {
        return this.$store.state.tabbar.index;
      },
      set(newValue) {
        this.$store.commit('tabbar/set', newValue)
      }
    },
    title() {
      return this.md() ? 'OSTappA' : this.tabs[this.index].label;
    },
    tabs() {
      let tabs = [
        {
          label: 'Lists',
          icon: this.md() ? null : 'ion-ios-list-outline',
          page: Home
        }
      ]

      if (this.$store.getters.isLoggedIn) {
        tabs.push({
          label: 'Profile',
          icon: this.md() ? null : 'ion-person',
          page: Profile
        });
      }

      return tabs;
    }
  }
};
</script>
