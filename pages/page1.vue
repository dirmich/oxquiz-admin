<template>
  <v-col class="ma-3">
    <v-col class="ma-3">
      <v-flex>
        <!-- <v-btn-toggle v-model="mode" dark mandatory class="elevation-0" style="background-color:inherit">
        <v-btn  class="h-btn blue" large>회원 로그</v-btn>
        <v-btn  class="h-btn blue" large>랭킹</v-btn>
        </v-btn-toggle> -->
        <h2>경품관리 - 리스트</h2>
      </v-flex>
      <v-layout class="mt-5">
        <v-flex xs1>
          <v-text-field label="당첨 확률(%)" v-model="percent" />
        </v-flex>
        <v-btn color="blue" dark @click="applyPercent">적용</v-btn>
      </v-layout>
    </v-col>
    <v-col>
      <hm-list
        ref="hmlist"
        :loadList="loadList"
        :header="header"
        :onItemClick="onItemClick"
      />
    </v-col>
    <v-dialog
      v-model="dialog"
      max-width="720"
      @keydown.esc="dialog = false"
      tabindex="0"
    >
      <v-card class="pa-5">
        <v-layout>
          <v-layout xs-6>
            <drop-zone
              ref="dz"
              :option="dzOption"
              color="pink"
              :imgsrc="getImageUrl(currItem)"
              @added="showContent"
            >
              상품 이미지를 선택하려면 여기를 누르세요
            </drop-zone>
          </v-layout>
          <v-layout justify-center column>
            <v-flex>
              <v-text-field v-model="currItem.idx" label="족보" />
            </v-flex>
            <v-flex>
              <v-text-field v-model="currItem.info" label="족보설명" />
            </v-flex>
            <v-flex>
              <v-text-field
                v-if="currItem.type == 'p'"
                v-model="currItem.name"
                type="number"
                label="포인트"
              />
              <v-text-field
                v-if="currItem.type == 'g'"
                v-model="currItem.name"
                label="경품명"
              />
            </v-flex>
            <v-flex>
              <v-select
                v-model="currItem.type"
                label="타입"
                :items="types"
                item-text="text"
                item-value="val"
              />
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="currItem.ival"
                label="현재수량"
                type="number"
              />
            </v-flex>
            <v-card-actions>
              <v-layout justify-center>
                <v-btn dark class="pink" @click="submit">등록</v-btn>
                <v-btn dark class="blue lighten-2" @click="dialog = false"
                  >Close</v-btn
                >
              </v-layout>
            </v-card-actions>
          </v-layout>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-col>
</template>
<script>
  import swal from '~/utils/swal'
  import cfg from '~/config'

  export default {
    middleware: 'checkadmin',
    data() {
      return {
        dialog: false,
        percent: 30,
        types: [
          { text: '상품', val: 'g' },
          { text: '포인트', val: 'p' },
        ],
        header: [
          { text: '족보번호', val: (item, idx) => item.idx },
          { text: '족보설명', val: item => item.info /*, link:'aaa'*/ },
          {
            text: '경품명',
            val: item =>
              item.name + (item.type == 'p' ? 'P' : '') /*, link:'aaa'*/,
          },
          { text: '타입', val: item => (item.type == 'p' ? '포인트' : '경품') },
          { text: '현재수량', val: item => item.ival },
          { text: '총당첨자', val: item => item.count },
          {
            text: '총투입량',
            val: item => {
              let sum = item.sum
                ? item.sum + item.count
                : item.ival + item.count
              let history = item.history ? item.history : ''
              return '(' + sum + ') ' + history
            },
          },
          { text: '', type: 'modify' },
          // { text:'시간', val:(item)=>(new Date(item.playDate).format("yyyy-MM-dd hh:mm:cc")) },
        ],
        currItem: {
          ival: 0,
        },
        dzOption: {
          acceptedFiles: 'image/*',
          maxFiles: 1,
          init: function() {
            this.on('maxfilesexceeded', function(file) {
              this.removeAllFiles()
              this.addFile(file)
            })
          },
        },
        file: null,
      }
    },
    methods: {
      async applyPercent() {
        this.$axios
          .post('/api/percent', { p: this.percent })
          .then(r => {
            swal.ok('', '당첨확률이 ' + this.percent + '%로 적용되었습니다')
          })
          .catch(e => {
            swal.error('', '서버에 에러가 발생하였습니다')
          })
      },
      async loadList() {
        // console.log('loadlist1')
        let qry = '/api/admin/presents'
        let ret = await this.$axios.get(qry)
        this.percent = ret.data.p
        ret.data.list.forEach(i => {
          if (!i.ival) i.ival = 0
        })
        return ret.data.list
      },
      onItemClick(item, idx, eidx) {
        // console.log(item)
        if (this.file) {
          this.$refs.dz.dropzone.removeAllFiles()
          this.file = null
        }

        if (item) {
          this.currItem = Object.assign({}, item)
          this.dialog = true
        } else {
          this.currItem = { ival: 0 }
          this.dialog = true
        }
      },
      showContent(dz, file) {
        console.log('​showContent -> dz,file', dz, file)
        this.file = file
        this.currItem.imgUrl = file.dataURL
      },
      submit() {
        let formData = new FormData()
        formData.append('file', this.file)
        Object.keys(this.currItem).forEach(k => {
          formData.append(k, this.currItem[k])
          // console.log(k,this.currItem[k])
        })
        this.$axios.post('/api/image/upload', formData).then(r => {
          console.log(r)
          this.$refs.hmlist.loadlist()
          this.dialog = false
          this.$refs.dz.dropzone.removeAllFiles()
          this.file = null
          this.currItem = { ival: 0 }
        })
        // console.log(this.$refs.dz)
        // this.$refs.dz.dropzone.processQueue()
      },
      getVal(el) {
        console.log('-->', el)
      },
      getImageUrl(item) {
        if (item && item.imgUrl) {
          let t = cfg.backend.host + ':' + cfg.backend.port + item.imgUrl
          console.log(t)
          return t
        } else return ''
      },
    },
  }
</script>
<style lang="scss" scoped></style>
