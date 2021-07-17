<template>
  <v-main>
    <v-layout column justify-center>
      <v-flex class="ma-3">
        <h2>비밀번호 변경</h2>
      </v-flex>
      <!-- <v-flex class="ma-2">
        <span class='label'>현재비밀번호</span>
        <input type='password' v-model="oldpass"/>
      </v-flex> -->
      <v-flex class="ma-2">
        <span class="label">새 비밀번호</span>
        <input type="password" v-model="newpass1" />
      </v-flex>
      <v-flex class="ma-2">
        <span class="label">새 비밀번호 확인</span>
        <input type="password" v-model="newpass2" />
      </v-flex>
      <v-flex xs2 class="ma-2">
        <v-btn large dark color="pink" @click="onSubmit">확인</v-btn>
      </v-flex>
    </v-layout>
  </v-main>
</template>

<script>
  import swal from '~/utils/swal'
  export default {
    data() {
      return {
        oldpass: '',
        newpass1: '',
        newpass2: '',
      }
    },
    methods: {
      async onSubmit() {
        if (this.newpass1 != this.newpass2) {
          swal.error('Error', '비밀번호가 일치하지 않습니다. 다시 입력하세요')
          return
        }
        if (this.newpass1.length < 6) {
          swal.error('Error', '비밀번호의 길이는 6자이상으로 입력하세요')
          return
        }
        let ret = await this.$axios.post('/api/setpwd', { pwd: this.newpass1 })
        ret = ret.data
        if (ret.error) {
          swal.error('Error', ret.error)
        } else {
          swal.ok('확인', '비밀번호가 변경되었습니다')
        }
      },
    },
  }
</script>

<style scoped>
  .label {
    width: 150px;
    text-align: right;
    /* font-size: 25px; */
  }
  input[type='password'] {
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    /* font-size: 25px; */
    padding: 5px;
    background-color: lightgrey;
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }
</style>
