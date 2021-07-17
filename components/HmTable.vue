<template>
  <!-- <v-container> -->
  <!-- <div style="width:100%;display:flex-basis"> -->
  <v-col style="height:100%">
    <v-row wrap justify="center">
      <div class="mr-3" v-if="mode == 5 && showOption">
        <v-text-field
          label="사용자 아이디"
          color="blue"
          clearable
          readonly
          v-model="uid"
          @click.clear="$emit('update', { userid: uid })"
          @keydown.enter="reload"
        />
        <!-- @input="$emit('input',uid)" -->
      </div>
      <v-col>
        <v-row align="center">
          <v-btn dark color="blue" @click="today">오늘</v-btn>
          <v-menu v-model="show">
            <template v-slot:activator="{ on, attrs }">
              <v-col sm="2">
                <v-text-field
                  label="시작일"
                  color="blue"
                  v-model="start"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                />
              </v-col>
            </template>
            <v-date-picker
              class="text--blue"
              v-model="start"
              :first-day-of-week="0"
              @input="update"
              color="blue"
              locale="ko-KR"
            />
          </v-menu>

          <v-menu v-model="show2">
            <template v-slot:activator="{ on, attrs }">
              <v-col sm="2">
                <v-text-field
                  label="종료일"
                  color="blue"
                  v-model="end"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                />
              </v-col>
            </template>
            <v-date-picker
              v-model="end"
              :first-day-of-week="0"
              @input="update"
              color="blue"
              locale="ko-KR"
            />
          </v-menu>
          <v-btn small rounded dark color="pink" @click="search()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn small rounded dark color="green" @click="download">
            <v-icon>mdi-file-excel</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <!-- <v-flex xs2 v-if="mode==1 && showOption">
        <v-layout row>
        <v-text-field
          label="스테이지"
          color="blue"
          v-model="stage"
          @keydown.enter="reload"
        />
        <v-btn small round dark color="pink" @click="search()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        </v-layout>
      </v-flex> -->
      <!-- <v-flex >
        <v-btn small round dark color="pink" @click="search()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        
      </v-flex> -->
    </v-row>
    <v-col justify="center">
      <v-row class="header">
        <div
          class="el"
          v-for="(item, idx) in header"
          :key="idx"
          :style="elStyle"
        >
          <span>{{ item.text }}</span>
        </div>
      </v-row>
      <v-row
        class="item"
        v-for="(item, idx) in list"
        :key="idx"
        @click="onLineClick && onClickLine(item, idx)"
      >
        <div
          class="el"
          v-for="(el, eidx) in header"
          :key="'e' + eidx"
          :style="elStyle"
        >
          <span
            :class="{ link: el.link }"
            @click="el.link && onClickItem(item, idx, eidx)"
            >{{ el.val(item, (page - 1) * pagesize + idx, eidx) }}</span
          >
        </div>
      </v-row>

      <v-row justify="center">
        <v-pagination
          v-model="page"
          :length="totalpage"
          color="blue"
          total-visible="10"
        />
      </v-row>
    </v-col>
    <v-dialog
      v-model="dialog"
      max-width="720"
      @keydown.esc="dialog = false"
      tabindex="0"
    >
      <div style="background-color:white" class="pb-3">
        <!-- <center><v-btn class="blue lighten-2" @click="dialog=false">Close</v-btn></center> -->
      </div>
    </v-dialog>
  </v-col>
  <!-- </div> -->
  <!-- </v-container> -->
</template>

<script>
  import swal from '~/utils/swal'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      showOption: {
        type: Boolean,
        default: false,
      },
      mode: {
        type: Number,
        default: 0,
      },
      onItemClick: Function,
      onLineClick: Function,
      loadList: Function,
      pagesize: {
        type: Number,
        default: 10,
      },
      header: {
        type: Array,
        default: [],
      },
      userid: {
        type: String | Number,
        default: '',
      },
      // list: {
      //   type: Array,
      //   default: []
      // },
    },
    mounted() {
      this.loadlist(this.page)
    },
    data() {
      return {
        uid: '',
        show: false,
        show2: false,
        currItem: {},
        currIdx: 0,
        stage: 1,
        dialog: false,
        // header:[
        //   { text:'발신처', val:(item)=>(item.send_corp+'('+item.send_name+')') },
        //   { text:'수신처', val:(item)=>(item.recv_corp) },
        //   { text:'종류', val:(item)=>item.table},
        //   { text:'전표일자/번호',  val:(item)=>(item.table!='이미지')?item.desc.전표일자+'-'+item.desc.전표번호:'-' },
        //   // { text:'전표번호',  val:(item)=>(item.table!='이미지')?item.desc.전표번호:'-'},
        //   { text:'내용',  val:(item)=> this.getDesc(item)},
        //   { text:'메모',  val:(item)=>this.getMemo(item)},
        //   { text:'보낸 날짜', val:(item)=>(new Date(item.send_time)).format('yyyy-MM-dd hh:mm') },
        //   { text:'받은 날짜', val:(item)=>this.getSendResult(item) },
        // ],
        list: [],
        page: 1,
        totalpage: 1,
        // startday:Date(),
        // endday:Date(),
        start: new Date().firstDay().format('yyyy-MM-dd'),
        end: new Date().format('yyyy-MM-dd'),
      }
    },
    methods: {
      today() {
        let c = new Date().format('yyyy-MM-dd')
        this.start = this.end = c
      },
      reload() {
        this.loadlist(this.page)
      },
      update() {},

      search() {
        this.loadlist(1)
      },
      onClickLine(item, idx) {
        // console.log('onClickLine(',item,idx,')')
      },
      onClickItem(item, idx, eidx) {
        // console.log('onClickItem(',item,idx,eidx,')')
        // if (this.showOption)
        //   this.userid = item.user.uid
        if (this.onItemClick) {
          if (this.onItemClick(item, idx, eidx)) {
            // this.$nextTick(()=>{
            //   this.loadlist(1)
            // })
          }
        }
      },
      loadlist(page) {
        if (this.loadList) {
          // if (this.mode==0)
          return this.loadList(page, this.userid, this.start, this.end).then(
            ret => {
              // console.log('1++>',ret)
              this.page = page
              this.totalpage = ret.totalPages
              this.list = ret.docs
            }
          )
          // else
          // return this.loadList(page,this.stage).then((ret)=>{
          //   // console.log('2++>',ret)
          //   this.page = page
          //   this.totalpage = ret.totalPages
          //   this.list = ret.docs
          // })
        }
      },
      download() {
        let qry = '/api/admin/getlist?mode=0&page=0'
        qry += '&sd=' + this.start
        qry += '&ed=' + this.end

        this.$axios.get(qry).then(ret => {
          // this.loadList(0,this.userid,this.start,this.end).then((ret)=>{
          let list = ret.data.meta.docs
          const title =
            this.start != this.end ? this.start + ' - ' + this.end : this.start
          let CSV = ''
          if (list.length == 0) return
          CSV += title + '\r\n\n'
          CSV += this.header.map(i => i.text).join(',')
          CSV += '\r\n'
          list.forEach(row => {
            CSV += new Date(row.date).format('yyyy-MM-dd hh:mm:cc') + ','
            CSV += row.rname + ','
            CSV += row.uid + ','
            CSV += row.name + ','
            CSV += row.phone + ','
            CSV += row.address + ','
            CSV += '\r\n'
          })
          // location.href= 'data:text/csv;charset=UTF-8,' + encodeURIComponent(CSV)
          this.downloadCsv(CSV, title)
        })
      },
      downloadCsv(data, title) {
        var pom = document.createElement('a')
        var blob = new Blob(['\ufeff' + data], {
          type: 'text/csv;charset=utf-8;',
        })
        var url = URL.createObjectURL(blob)
        pom.href = url
        pom.setAttribute('download', title + '.csv')
        pom.click()
      },
      // loadlist(page) {
      //   let qry='/api/requiry/{code}?sd={sd}&ed={ed}&page={page}&pagesize={pagesize}'.supplant({
      //     code:this.code,
      //     sd:this.startday.format('yyyy-MM-dd'),
      //     ed:this.endday.format('yyyy-MM-dd'),
      //     // table:this.table,
      //     page:(page)?page:this.page,
      //     pagesize:this.pagesize
      //   })
      //   if (this.table<10) qry+='&cmd='+this.table
      //   if (this.sel>0) qry+='&sel='+this.sel
      //   this.$axios.get(qry)
      //   .then(({data})=>{
      //     console.log(data)
      //     this.list=data.list
      //     this.totalpage = data.meta.totalPages
      //     if (page)
      //     this.page=page
      //   })
      //   .catch(e=>{
      //     console.error(e)
      //   })
      // }
    },
    computed: {
      elStyle() {
        // console.log('set width',(screen.width/(this.header.length+3)) +'px')
        return {
          // width: screen.width/this.header.length +'px'
        }
      },
    },
    watch: {
      page(val) {
        console.log('setPage', val)
        // console.log('page')
        this.loadlist(val)
      },
      header(val) {
        console.log('setHeader', val)
        this.list = []
      },
      loadList(val) {
        this.loadlist(1)
      },
      mode(val) {
        this.loadlist(1)
      },
      uid(val) {
        // console.log('uid:',val)
        this.$emit('update', val ? { userid: val } : { noneuser: true })
      },
      userid(val) {
        // console.log('userid',val)
        // this.$nextTick(()=>{
        this.uid = val
        this.loadlist(1)
        // })
      },
      //   this.$emit('update',{ userid:val })
      //   // this.uid = this.userid
      //   // if (val==='')
      //   //   this.loadlist(val)
      // }
      // startday(val) {
      //   this.loadlist(1)
      // },
      // endday(val) {
      //   this.loadlist(1)
      // },
    },
  }
</script>

<style scoped lang="scss">
  div.v-date-picker-table.v-btn__content {
    color: black !important;
  }
  .ivtable {
    // height:calc(80vh - 40px);
    background-color: cadetblue;
  }
  .header {
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    height: 50px;
    width: 100%;
    // text-align: center;
    // display:inline-flex;
    // vertical-align: middle;
    &:hover {
      background-color: white;
    }
    .el {
      // border-bottom: 1px dashed black;
      padding-top: 10px;
      font-weight: bolder;
    }
  }

  .el {
    // margin-left:auto;
    // margin-right:auto;
    // padding: auto;
    text-align: center;
    display: inline-flex;
    width: calc(100% / 7);
    min-height: 30px;
    max-height: 80px;
    overflow: auto;
    span {
      // border: 1px solid red;
      margin: auto;
      // margin-left:auto;
      // margin-right:auto;
      line-height: auto;
      vertical-align: middle;
      // display:table-cell;
    }
  }
  .item {
    // display:inline-flex;
    // margin-bottom: 2px;
    width: 100%;
    border-bottom: 1px dashed rgb(100, 255, 100);
    &:nth-child(even) {
      background-color: rgb(240, 255, 240);
    }
    &:nth-child(odd) {
      background-color: rgb(220, 255, 220);
    }
    .el {
    }
  }
  .link {
    text-decoration: underline;
    color: blue;
    cursor: pointer;
  }
</style>
