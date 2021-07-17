<template>
<!-- <v-container> -->
  <!-- <div style="width:100%;display:flex-basis"> -->
  <v-layout column >
    <v-layout wrap justify-center>

    </v-layout>
    <!-- <v-layout justify-center column> -->
      <!-- <v-flex  class="header"> -->
      <div style="overflow:scroll">
        <div class="el" v-for="(item,idx) in header" :key="idx" :style="elStyle">
          <span>{{item.text}}</span>
        </div>
      </div>
      <!-- </v-flex> -->
      <!-- <v-flex class="item" v-for="(item,idx) in list" :key="idx" @click="onLineClick&&onClickLine(item,idx)"> -->
      <div class="item" v-for="(item,idx) in list" :key="idx" @click="onLineClick&&onClickLine(item,idx)">
        <div class="el" v-for="(el,eidx) in header" :key="'e'+eidx" :style="elStyle">
          <span v-if="el.type!='modify'" :class="{link:el.link}" @click="el.link&&onClickItem(item,idx,eidx)">{{el.val(item,idx)}}</span>
          <v-btn color="green" dark v-else @click="onItemClick&&onItemClick(item)">수정</v-btn>
        </div>
      </div>
      <!-- </v-flex> -->
    <!-- </v-layout> -->
    
    <v-layout justify-center>
      <!-- <v-pagination
        v-model="page"
        :length="totalpage" 
        color="blue"
        total-visible="10"
      /> -->
      <!-- <v-btn color="blue" dark @click="onItemClick&&onItemClick(null)">신규 등록</v-btn> -->
    </v-layout>
  </v-layout>
  <!-- </div> -->
<!-- </v-container> -->
</template>

<script>
import swal from '~/utils/swal'
import { mapGetters } from 'vuex'

export default {
  props: {

    showOption:{
      type:Boolean,
      default:false
    },
    mode:{
      type:Number,
      default:0
    },
    onItemClick:Function,
    onLineClick:Function,
    loadList:Function,

    header: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.loadlist()
  },
  data() {
    return {
      uid:'',
      show:false,
      show2:false,
      currItem:{},
      currIdx:0,
      stage:1,
      dialog:false,
      list:[],
      page:1,
      totalpage:1,
      // startday:Date(),
      // endday:Date(),
      start:new Date().firstDay().format('yyyy-MM-dd'),
      end:new Date().format('yyyy-MM-dd'),
    }
  },
  methods: {
    reload() {
      this.loadlist()
    },
    onClickLine(item,idx) {
      // console.log('onClickLine(',item,idx,')')
    },
    onClickItem(item,idx,eidx) {
      // console.log('onClickItem(',item,idx,eidx,')')
      // if (this.showOption)
      //   this.userid = item.user.uid
      if (this.onItemClick) {
        if (this.onItemClick(item,idx,eidx)) {
          // this.$nextTick(()=>{
          //   this.loadlist(1)
          // })
        }
      }
    },
    loadlist(page) {
      if (this.loadList) {
        return this.loadList().then((ret)=>{
          // console.log('1++>',ret)
          this.list = ret
        })
      }
    }
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
        width: 100.0/this.header.length+'%'
        // width:'150px'
      }
    }
  },
  watch:{
    header(val) {
    console.log('setHeader',val)
      this.list=[]
    },
    loadList(val) {
      this.loadlist()
    },
  }
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
  border-bottom: 2px solid blue;
  height:50px;
  width:100%;
  // text-align: center;  
  // display:inline-flex;
  // vertical-align: middle;
  &:hover {
    background-color: white;
  }
  .el {
    // border-bottom: 1px dashed black;
    padding-top:10px;
    font-weight: bolder;
  }
}

.el {
  // margin-left:auto;
  // margin-right:auto;
  // padding: auto;
  text-align: center;  
  display:inline-flex;
 width: calc(100% / 7);
  min-height:30px;
  max-height: 80px;
  overflow:auto;
  span {
    // border: 1px solid red;
    margin:auto;
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
  // width:100%;
  border-bottom: 1px dashed rgb(100,255,100);
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
