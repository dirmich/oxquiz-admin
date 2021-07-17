import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
// const cfg = require('~/config')
import cfg from '~/config'
const opt = {
  path: '/game',
  transpors: ['websocket', 'polling'],
}

export default ({ app }) => {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: cfg.backend.host, //+':'+cfg.backend.port,
      vuex: {
        store: app.store,
        actionPrefix: '',
        mutationPrefix: 'room/',
      },
      options: opt,
    })
  )
}
