<template>
  <div id="app">
    <div id="top">
      <img src alt />
      <div class="topRight">
        <el-button-group>
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="primary">登录</el-button>
        </el-button-group>
        <div class="topBtn">
          <el-input v-model="keyWord" placeholder="请输入关键字查询"></el-input>
          <el-button type="primary" @click="btn">搜索</el-button>
        </div>
      </div>
    </div>
    <div id="nav">
      <div class="navList">
        <router-link to="/">首页</router-link>
        <router-link to="/government">政务公开</router-link>
        <router-link to="/law">法律服务</router-link>
        <router-link to="/lawer">律师信息</router-link>
        <router-link to="/propaganda">普法宣传</router-link>
        <router-link to="/map">司法地图</router-link>
        <router-link to="/mailbox">局长信箱</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyWord:''
    };
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    btn(){

    }
  }
};
</script>
<style lang="scss">
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background: #f2f2f2;
  height: 100%;
  padding-bottom: 10px;
}
#top {
  width: 85%;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  .topRight{
    text-align: right;
    .el-button-group{
      .el-button{
background: #0fa1d4
      }
      
    }
  }
  .topBtn{
    width: 400px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .el-input__inner{
      border: 1px solid #197fc5;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0
    }
    .el-button{
      border-radius: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background: #1a7ec5;
      width: 100px
    }
  }
}
#nav {
  width: 100%;
  background: #0ea6d6;
  font-size: 16px;
  height: 60px;
  a {
    font-weight: bold;
    // color: #2c3e50;
    display: flex;
    width: 14.28%;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
  }
}
#nav .router-link-exact-active {
  color: #fff;
  background: #58bde0;
}
.navList {
  width: 85%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
