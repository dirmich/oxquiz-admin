<template>
  <v-col>
    <v-row>
      <v-text-field
        :disabled="currRoom != null"
        v-model="room"
        label="roomname"
      />
      <v-text-field disabled v-model="user.name" label="name" />
      <v-text-field :disabled="currRoom != null" v-model="uid" label="uid" />
    </v-row>
    <v-btn @click="join" :disabled="currRoom != null">Join Room</v-btn>
    <v-btn @click="leave" :disabled="currRoom == null">Leave Room</v-btn>
    <v-btn @click="start" :disabled="currRoom == null">Start Game</v-btn>
    <v-btn @click="toggleReady" :disabled="currRoom == null">
      {{ ready ? 'Cancel' : 'Ready' }}</v-btn
    >
    <v-col class="border">
      <div :key="p.id" v-for="p in peers" :class="{ ready: p.ready }">
        {{ p.name }}
      </div>
    </v-col>
  </v-col>
</template>
<script>
  import '~/libsrc/dist/gameconn'
  import cfg from '~/config'
  export default {
    mounted() {
      GameConn.onConnect = this.onConnect
      GameConn.onJoin = this.onJoin
      GameConn.onLeave = this.onLeave
      GameConn.onReady = this.onReady
      GameConn.onStart = this.onStart
      GameConn.onCancel = this.onCancel

      GameConn.connect(cfg.backend.host)
    },
    data() {
      return {
        room: '6-test',
        name: 'test1',
        uid: '1234',
        peers: [],
        user: {},
        currRoom: null,
        ready: false,
      }
    },
    methods: {
      async join() {
        const r = await GameConn.join(this.room, this.uid, this.name)
        console.log('join', r)
        this.peers.push(r.user)
        this.user = r.user
        // if (this.peers.findIndex(p => p._id === r.user._id) < 0)
        //   this.peers.push(r.user)
        this.currRoom = r.room
      },
      async leave() {
        const r = await GameConn.leave()
        console.log('leave', r)
        this.peers = []
        this.currRoom = null
      },
      async start() {
        const r = await GameConn.start()
        console.log('start', r)
      },
      async toggleReady() {
        if (this.ready) {
          this.user.ready = false
          await GameConn.cancel()
        } else {
          this.user.ready = true
          await GameConn.ready()
        }
        this.ready = !this.ready
      },
      onConnect() {
        console.log('connected to room server')
      },
      onJoin(data) {
        console.log('joined', data)
        if (this.peers.findIndex(p => p._id === data.user._id) < 0)
          this.peers.push(data.user)
      },
      onLeave(data) {
        console.log('leaved', data)
        // console.log('->', this.peers)
        this.peers = this.peers.filter(p => {
          // console.log(p._id, data._id, p._id != data._id, p._id !== data._id)
          return p._id != data.user._id
        })
      },
      onReady(data) {
        console.log('ready', data)
        const idx = this.peers.findIndex(p => p._id === data.user._id)

        if (idx >= 0) {
          // this.peers[idx].ready = true
          this.$set(this.peers, idx, { ...this.peers[idx], ready: true })
          console.log('-->', this.peers[idx])
        }
      },
      onCancel(data) {
        console.log('cancel', data)
        const idx = this.peers.findIndex(p => p._id === data.user._id)
        if (idx >= 0) {
          // this.peers[idx].ready = false
          this.$set(this.peers, idx, { ...this.peers[idx], ready: false })
          console.log('-->', this.peers[idx])
        }
      },
      onStart(data) {
        console.log('start', data)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .ready {
    color: red;
    text-decoration-style: dashed;
  }
</style>
