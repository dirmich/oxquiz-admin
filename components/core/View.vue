<template>
  <v-main>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <nuxt />
      </v-fade-transition>
    </div>
    <!-- <core-footer v-if="$route.name !== 'Maps'" /> -->
  </v-main>
</template>

<script>
  export default {
    metaInfo() {
      return {
        // title: 'Vuetify Material Dashboard by CreativeTim'
      }
    },
  }
</script>

<style>
  #core-view {
    padding-bottom: 100px;
  }
</style>
