// import socketio from 'socket.io-client'
const io = require('socket.io-client')

class GameConn {
  constructor(opt) {
    if (GameConn.instance) {
      return GameConn.instance
    }
    GameConn.instance = this
    this.socket = null
    return this
  }

  broadcast(param) {
    return new Promise((resolve, reject) => {
      this.socket.emit('broadcast', param, r => {
        if (r.err == null) resolve(r)
        else reject(r)
      })
    })
  }
  send(target, param) {
    return new Promise((resolve, reject) => {
      this.socket.emit('sendTo', { tid: target, ...param }, r => {
        if (r.err == null) resolve(r)
        else reject(r)
      })
    })
  }

  join(roomType, uid, name) {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        'join',
        {
          roomType,
          id: uid,
          name: name,
        },
        r => {
          if (r.err == null) {
            this.user = r.user
            resolve(r)
          } else reject(r)
        }
      )
    })
  }
  leave() {
    return new Promise((resolve, reject) => {
      this.socket.emit('leave', r => {
        if (r.err == null) resolve(r)
        else reject(r)
      })
    })
  }
  result() {
    return new Promise((resolve, reject) => {
      this.socket.emit('result', r => {
        if (r.err == null) resolve(r)
        else reject(r)
      })
    })
  }
  getRanking() {
    return new Promise((resolve, reject) => {
      this.socket.emit('ranklist', r => {
        if (r.err == null) resolve(r)
        else reject(r)
      })
    })
  }
  ready() {
    return new Promise((resolve, reject) => {
      this.socket.emit('ready', r => {
        if (r.err == null) resolve(r)
        else reject(r)
      })
    })
  }
  start() {
    return new Promise((resolve, reject) => {
      this.socket.emit('start', r => {
        if (r.err == null) resolve(r)
        else reject(r)
      })
    })
  }
  cancel() {
    return new Promise((resolve, reject) => {
      this.socket.emit('cancel', r => {
        if (r.err == null) resolve(r)
        else reject(r)
      })
    })
  }

  connect(url, opt) {
    // return new Promise((resolve,reject)=>{
    if (!this.socket) {
      let self = this
      let option = {
        // autoConnect: false,
        // path: '/game',
        upgrade: true,
        transports: ['websocket', 'polling'],
      }
      this.socket = io(url, option)
      this.socket.on('connect', () => {
        if (self.onConnected) self.onConnected()
        self.socket.on('join', d => {
          this.send(d.sid, { cmd: 'welcome', user: this.user })
          if (self.onJoin) self.onJoin(d)
        })
        self.socket.on('sendTo', d => {
          let { cmd, ...param } = d
          switch (cmd) {
            case 'welcome':
              if (this.onJoin) this.onJoin(param)
              break
            default:
              if (self.onSendTo) self.onSendTo(d)
          }
        })
        if (self.onLeave) self.socket.on('leave', self.onLeave)
        if (self.onReady) self.socket.on('ready', self.onReady)
        if (self.onCancel) self.socket.on('cancel', self.onCancel)
        if (self.onStart) self.socket.on('start', self.onStart)
        if (self.onLeave) self.socket.on('msg', self.onMessage)
        self.socket.on('disconnect', () => {
          if (self.onClose) {
            self.onClose()
          }
        })
        // resolve(self)
      })
      // this.socket.open()
    }
    // else {
    //   resolve(this)
    // }
    // })
  }
  setHandler(cmd, handler) {
    this.socket.on(cmd, handler)
  }
}
module.exports = new GameConn()
// module.exports = GameConn
// export default new GameConn()
