import colors from 'vuetify/es5/util/colors'
import pkg from './package'
import cfg from './config'

module.exports = {
  ssr: false,
  head: {
    title: '게임관리자',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
    script: [
      {
        src: 'https://cdn.polyfill.io/v2/polyfill.js?features=default,fetch,Math.cbrt,Object.values,Array.prototype.findIndex,Array.from,Array.prototype.@@iterator,Symbol.iterator,NodeList.prototype.@@iterator,String.prototype.@@iterator',
        // Object.assign,Object.entries,EventSource,
      },
    ],
  },
  env: cfg,
  server: {
    host: '0.0.0.0',
    port: 3400,
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  router: {
    // base: '/admin/'
  },
  /*
   ** Global CSS
   */
  css: [
    // '~/assets/style/app.styl'
    // '~/assets/styles/index.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/index.js',
    // { src:'@/plugins/socketio.js', ssr:false}
  ],
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: cfg.backend.host, // + ':' + cfg.backend.port,
    // See https://github.com/nuxt-community/axios-module#options
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {},
}
