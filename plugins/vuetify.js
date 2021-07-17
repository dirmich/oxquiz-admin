import Vue from 'vue'
import Vuetify from 'vuetify'
// import colors from 'vuetify/es5/util/colors'
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
// import '~/assets/styles/index.scss'
import '~/libsrc/dist/gameconn'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme
  // theme: {
  //   primary: '#121212', // a color that is not in the material colors palette
  //   accent: colors.grey.darken3,
  //   secondary: colors.amber.darken3,
  //   info: colors.teal.lighten1,
  //   warning: colors.amber.base,
  //   error: colors.deepOrange.accent4,
  //   success: colors.green.accent3
  // }
})


