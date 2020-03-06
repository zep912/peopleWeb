<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
};
</script>
<style lang="scss">
@import './assets/font/iconfont.css';
  * {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
li{
  list-style: none
}
.el-form {
  width: 90%;
}
</style>
