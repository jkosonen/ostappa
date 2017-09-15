<template>
  <v-ons-page>
    <div class="profile-pic">
      <img src="../../assets/logo.png">
    </div>
    <v-ons-list-title v-show="isLoggedIn">Account</v-ons-list-title>
    <v-ons-list v-show="isLoggedIn">
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <account></account>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="right right-label">
          <ons-button class="button button-margin" @click="handleLogout">Logout</ons-button>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list-title v-show="!isLoggedIn">Login</v-ons-list-title>
    <v-ons-list  v-show="!isLoggedIn">
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            placeholder="Username"
            v-model="username"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          <v-ons-icon icon="fa-key" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input type="password" maxlength="20"
            placeholder="Password"
            v-model="password"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left left-label">
          <ons-button class="button button-margin" @click="handleSignUp">Sign up</ons-button>
        </div>
        <div class="right right-label">
          <ons-button class="button button-margin" @click="handleLogin">Login</ons-button>
        </div>
      </v-ons-list-item>
    </v-ons-list>      

    <v-ons-list-title>Access</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="(item, index) in access" :key="item.title"
        @click="loadView(index)"
      >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.title }}
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import { mapGetters } from 'vuex';
import auth from '../../auth/';
import Account from '../partials/Account.vue';

export default {
  name: 'Menu',
  components: {
    Account
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    loadView(index) {
      this.$store.commit('tabbar/set', index);
      this.$store.commit('splitter/toggle');
    },
    handleLogin() {
      auth.login(this.username, this.password).then( (user) => {
        this.$store.dispatch('setUser', user);
      }).catch( error => {
        console.log(error)
      });
    },
    handleLogout() {
      auth.logout();
      this.$store.dispatch('setUser', {});
    },
    handleSignUp() {
      
    }
  },
  data() {
    return {
      access: [
        {
          title: 'Home',
          icon: 'ion-home, material:md-home'
        },
        {
          title: 'Profile',
          icon: 'ion-person, material:md-account'
        }
      ],
      username: '',
      password: ''
    };
  }
};
</script>

<style scoped>
.profile-pic {
  width: 200px;
  background-color: #fff;
  margin: 20px auto 10px;
  border: 1px solid #999;
  border-radius: 4px;
}

.profile-pic > img {
  display: block;
  max-width: 100%;
}

ons-list-item {
  color: #444;
}
</style>
