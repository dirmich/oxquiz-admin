<template>
  <v-toolbar
    id="game-toolbar"
    flat
    prominent
    class="indigo"
  >
    <v-toolbar-title class="white--text font-weight-bold">
      게임관리자
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn flat>회원로그</v-btn>
      <v-btn flat>일별 실행횟수</v-btn>
      <!-- <v-flex
        align-center
        layout
        py-2
      >
      </v-flex> -->
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  
}
</script>

<style scoped lang="scss">
  #game-toolbar a {
    text-decoration: none;
  }
</style>
