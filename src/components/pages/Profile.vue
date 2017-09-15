<template>
  <v-ons-page>
    
    <p class="intro">
      This is a kitchen sink example that shows off the Vue bindings for Onsen UI.<br><br>
    </p>

  </v-ons-page>
</template>

<script>

export default {
  name: 'Profile',
  data () {
    return {
      
    };
  },

  methods: {
   
  }
};
</script>

<style scoped>
.intro {
  text-align: center;
  padding: 0 20px;
  margin-top: 40px;
}

ons-card {
  cursor: pointer;
  color: #333;
}

.card__title, .card--material__title {
  font-size: 20px;
}
</style>
