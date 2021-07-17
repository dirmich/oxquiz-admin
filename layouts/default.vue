<template>
  <v-app>
    <!-- <core-filter /> -->
    <!-- <core-toolbar /> -->
    <core-drawer :title="title" :links="links" />
    <core-view />
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: '게임관리자',
        // title: 'Game server Admin.',
        // logo: './img/vuetifylogo.png',
        links: [
          {
            to: '/',
            // icon: 'mdi-view-dashboard',
            text: '결과 리스트',
          },
          {
            to: '/page1',
            // icon: 'mdi-view-dashboard',
            text: '경품관리',
          },
          {
            to: '/page2',
            // icon: 'mdi-view-dashboard',
            text: '테스트',
          },
          // {
          //   to: '/page2',
          //   // icon: 'mdi-view-dashboard',
          //   text: '당첨수량관리'
          // },
          // {
          //   to: '/page3',
          //   // icon: 'mdi-view-dashboard',
          //   text: '당첨리스트'
          // },
          {
            to: '/changepass',
            text: '환경설정',
          },
          {
            action: this.doLogout,
            text: '로그아웃',
          },
          // {
          //   to: '/game1test',
          //   // icon: 'mdi-view-dashboard',
          //   text: 'GameFighter'
          // },
          // {
          //   to: '/game2test',
          //   // icon: 'mdi-view-dashboard',
          //   text: '묵찌빠 테스트'
          // },
          // {
          //   to: '/UserProfile',
          //   icon: 'mdi-account',
          //   text: 'User Profile'
          // },
          // {
          //   to: '/TableList',
          //   icon: 'mdi-clipboard-outline',
          //   text: 'Table List'
          // },
          // {
          //   to: '/Typography',
          //   icon: 'mdi-format-font',
          //   text: 'Typography'
          // },
          // {
          //   to: '/Icons',
          //   icon: 'mdi-chart-bubble',
          //   text: 'Icons'
          // },
          // {
          //   to: '/Maps',
          //   icon: 'mdi-map-marker',
          //   text: 'Maps'
          // },
          // {
          //   to: '/Notifications',
          //   icon: 'mdi-bell',
          //   text: 'Notifications'
          // }
        ],
      }
    },
    methods: {
      async doLogout() {
        await this.logout()
        this.$router.push('/login')
      },
      ...mapActions(['logout']),
    },
  }
</script>
<style lang="scss" scoped>
  // @import "~/assets/styles/index.scss"
</style>
