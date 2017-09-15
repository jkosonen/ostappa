<template>
    <v-ons-card class="card">
        <div class="account">
            <div class="pic">
                <img v-if="user.gravatar" :src="user.gravatar + '?s=50'" alt="Gravatar">
            </div>
            <div class="data">
                {{user.username}}
            </div>
        </div>
    </v-ons-card>
</template>

<script>
export default {
  name: 'Account',
  computed: {
    user () {
      return this.$store.state.user;
    },
  }
};
</script>

<style scoped>
    .card {
     width: 100%;   
    }
    .account {
        display: flex
    }
    .data {
        flex: 1;
        margin-left: 10px;
    }

</style>