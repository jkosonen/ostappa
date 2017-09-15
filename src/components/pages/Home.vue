<template>
  <v-ons-page>
    <api-request :resource="$api.getLists" v-model="data" resp="data" :trigger.sync="loadNewLists">
      <div slot="waiting">
        <list-view v-show="!isLoggedIn" :data="defaultList"></list-view>
        <list-view v-show="isLoggedIn" :data="data"></list-view>
      </div>
    </api-request>

  </v-ons-page>
</template>

<script>
import List from '../../models/list';
import ListView from '../partials/ListView.vue';

export default {
  name: 'Home',
  components: {ListView} ,
  data() {
    return {
      defaultList: {lists: [new List()]}, 
      data: {},
      loadNewLists: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  watch: {
    isLoggedIn (isLoggedIn) {
      if (isLoggedIn) {
        this.loadNewLists = true;
      }
    }
  },
  mounted: function () {
    this.loadNewLists = this.$store.getters.isLoggedIn;
    console.log(this.loadNewLists);
  }
}
</script>
