<template>
  <v-col style="min-height:100vh">
    <div>
      <v-btn-toggle v-model="mode" dark mandatory class="elevation-0">
        <v-btn class="h-btn blue" large>전체</v-btn>
        <v-btn class="h-btn blue" large>상품 당첨자</v-btn>
        <v-btn class="h-btn blue" large>포인트 당첨자</v-btn>
      </v-btn-toggle>
    </div>
    <div class="mt-5">전체 게임 횟수 : {{ totalGameCount }}</div>
    <div class="mt-2">{{ getModeName }} : {{ totalCount }}</div>
    <div class="mt-2">게임 순참여자 수 : {{ totalUser }}</div>
    <hm-table
      :loadList="loadList"
      :header="header"
      showOption
      :mode="mode"
      :onItemClick="onItemClick"
      @update="update"
    />
  </v-col>
</template>

<script>
  export default {
    middleware: 'checkadmin',
    data() {
      return {
        mode: 0,
        page: 1,
        totalpage: 0,
        totalCount: 0,
        totalGameCount: 0,
        totalUser: 0,
        list: [],
        stage: 1,
        userid: '',
        dataHeader: [
          {
            text: '게임일시',
            val: item => new Date(item.date).format('yyyy-MM-dd hh:mm:cc'),
          },
          { text: '결과', val: item => item.rname },
          { text: '아이디', val: item => item.uid /* , link:'aaa'*/ },
          { text: '이름', val: item => item.name },
          { text: '전화번호', val: item => item.phone },
          { text: '주소', val: item => item.address },
        ],
      }
    },
    methods: {
      update(data) {
        // console.log('update',data)
        if (data.userid) {
          // console.log('set userid',data.userid)
          this.userid = data.userid
        } else if (data.noneuser) {
          // console.log('set userid = ""')
          this.userid = ''
        }
      },
      onItemClick(item, idx, eidx) {
        this.userid = item.user.uid
        return true // refresh
      },
      async loadData(page, uid, sd, ed) {
        // console.log('loadlist1')
        if (page) this.page = page
        let qry = '/api/admin/getlist?mode=' + this.mode + '&page=' + this.page
        if (uid) {
          qry += '&userid=' + uid
        }
        if (sd) {
          qry += '&sd=' + sd
          if (ed) {
            qry += '&ed=' + ed
          } else {
            qry += '&ed=' + sd
          }
        }
        let ret = await this.$axios.get(qry)
        this.totalGameCount = ret.data.playcount
        this.totalCount = ret.data.meta.totalDocs
        this.totalUser = ret.data.ucount
        return ret.data.meta
      },

      reset() {
        this.totalpage = 0
        this.totalCount = 0
        this.totalGameCount = 0
        this.totalUser = 0
        this.list = []
      },
    },
    computed: {
      header() {
        // return (this.mode==0)?this.dataHeader:this.rankingHeader
        return this.dataHeader
      },
      loadList() {
        // return (this.mode==0)?this.loadData:this.loadRanking
        return this.loadData
      },
      getModeName() {
        switch (this.mode) {
          case 1:
            return '기간내 상품 당첨자:'
          case 2:
            return '기간내 포인트 당첨자수:'
          default:
            return '기간내 게임횟수:'
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .h-btn {
    width: 100px;
  }
</style>
