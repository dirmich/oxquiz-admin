<template>
  <v-layout id="base">
    <div id="container">
      <h1>
        OK Quiz<br />
        게임관리자
      </h1>

      <p style="width:40%">
        관리자 암호를 입력하세요
      </p>

      <div id="subscribe">
        <input
          type="password"
          placeholder="암호를 입력하세요"
          v-model="passwd"
          @keyup.enter="onSubmit"
          autofocus
        />
        <input type="submit" value="확인" @click="onSubmit" />
      </div>
    </div>
  </v-layout>
</template>

<script>
import "animate.css";
import swal from "~/utils/swal";
import { session } from "~/utils/storage";

import { mapGetters, mapActions } from "vuex";
export default {
  layout: "raw",
  data() {
    return {
      passwd: ""
    };
  },
  mounted() {
    //      console.log(this.$router)
  },
  methods: {
    async onSubmit() {
      let r = await this.$axios.post("/api/login", { pwd: this.passwd });
      // console.log(r)
      r = r.data;

      if (r.token != null) {
        session.set("token", r.token);
        await this.login();
        this.$nextTick(() => {
          this.$router.push("/");
          // this.$router.push({path:this.localPath('/'), query:{}})
        });
      } else {
        this.passwd = "";
        swal.error("에러", r.error ? r.error : "암호가 틀렸습니다");
      }
    },
    ...mapActions(["login"])
  },
  computed: {
    ...mapGetters(["isLogged"])
  }
};
</script>

<style scoped>
#base {
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: #444;
  -webkit-font-smoothing: antialiased;
  background: #000222;
  background: linear-gradient(to bottom, #000222 0%, #4b637c 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000222', endColorstr='#4b637c',GradientType=0 );
}

#container {
  position: fixed;
  width: 100%;
  height: 300px;
  top: 25%;
  left: 50%;
  margin-top: -150px;
  margin-left: -50%;
  text-align: center;
  -webkit-animation-name: bounceInDown;
  -webkit-animation-fill-mode: both;
  -webkit-animation-duration: 1.5s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: bounceInDown;
  -moz-animation-fill-mode: both;
  -moz-animation-duration: 1.5s;
  -moz-animation-iteration-count: 1;
  -moz-animation-timing-function: linear;
  animation-name: bounceInDown;
  animation-fill-mode: both;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
}
h1 {
  font-size: 90px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 4px #000;
  margin-top: 20px;
}

p {
  width: 80%;
  font-size: 23px;
  line-height: 1.3em;
  color: #fff;
  margin: 1.1em auto;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.9);
}

p a {
  color: #fff;
  border-bottom: 2px solid #2da1ec;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
p a:hover {
  color: #2da1ec;
  border-bottom: 2px solid #fff;
}
#subscribe {
  margin: 0 auto;
  text-align: center;
}

input[type="password"] {
  outline: none;
  width: 30%;
  padding: 15px;
  margin: 0 auto;
  color: #fff;
  border: none;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.9);
  -moz-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.9);
  -o-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.9);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.9);
}

input[type="submit"] {
  position: absolute;
  margin-left: -105px;
  margin-top: 5px;
  font-size: 25px;
  color: #222;
  text-shadow: 0 1px 0 #fff;
  padding: 10px;
  width: 100px;
  height: 50px;
  border: none;
  background: #f0f0f0;
  background: linear-gradient(to bottom, #f0f0f0 0%, #c3d7ff 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0f0f0', endColorstr='#c3d7ff',GradientType=0 );
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  -o-box-shadow: 0 0 5px rgba(0, 0, 0, 1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 1), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  cursor: pointer;
}

input {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 25px;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
</style>
