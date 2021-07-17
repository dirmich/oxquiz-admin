<template>
  <v-layout  column class="ma-3">
    <v-layout class="ma-3" column>
      <v-flex>
        <v-btn-toggle v-model="mode" dark mandatory class="elevation-0" style="background-color:inherit">
        <v-btn  class="h-btn blue" large>회원 로그</v-btn>
        <v-btn  class="h-btn blue" large>랭킹</v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex v-show="mode==0" class="mt-5">
        게임 횟수 : {{ totalCount }}
      </v-flex>
      <v-flex v-show="mode==0" class="mt-2">
        게임참여자 수 : {{ totalUser }}
      </v-flex>
    </v-layout>
    <v-layout>
      <hm-table
        :loadList="loadList"
        :header="header"
        :mode="mode"
      />
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  middleware: 'checkadmin',
  data() {
    return {
      mode:0,
      page:1,
      totalpage:0,
      totalCount:0,
      totalUser:0,
      dataHeader:[
        { text:'번호', val:(item,idx)=>(idx+1) },
        { text:'승자', val:(item)=>(item.winner.name+'('+item.winner.uid+')') /*, link:'aaa' */},
        { text:'패자', val:(item)=>(item.loser.name+'('+item.loser.uid+')') },
        { text:'시간', val:(item)=>(new Date(item.date).format("yyyy-MM-dd hh:mm:cc")) },
      ],
      rankingHeader:[
        { text:'순위', val:(item,idx)=>(idx+1) },
        { text:'아이디', val:(item)=>(item.uid[0]) },
        { text:'이름', val:(item)=>(item.name[0]) },
        { text:'승', val:(item)=>(item.win) },
        { text:'패', val:(item)=>(item.lose) },
      ]
    }
  },
  methods: {
    async loadData(page,uid,sd,ed) {
      if (page)
        this.page = page
      let qry = '/api/turnbase/getlist?page='+this.page
      if (uid) {
        qry += '&userid='+uid
      }
      if (sd) {
        qry += '&sd='+sd
        if (ed) {
          qry += '&ed='+ed
        } else {
          qry += '&ed='+sd
        }
      }
      let ret = await this.$axios.get(qry)
      this.totalCount = ret.data.meta.totalDocs
      this.totalUser = (uid)?((ret.data.meta.totalDocs>0)?1:0):ret.data.playcount.length
      return ret.data.meta
    },
    async loadRanking(page,stage) {
      if (page)
        this.page = page
      let qry = '/api/turnbase/getRanking?page='+this.page
      let ret = await this.$axios.get(qry)
      return ret.data.meta
    },
    reset() {
      this.totalpage=0
      this.totalCount=0
      this.totalUser=0
    }
  },
  computed: {
    header() {
      return (this.mode==0)?this.dataHeader:this.rankingHeader
    },
    loadList() {
      return (this.mode==0)?this.loadData:this.loadRanking
    }
  },
}
</script>

<style scoped lang="scss">
.h-btn {
  width:100px;
  
}
</style>
