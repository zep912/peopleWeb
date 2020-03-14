<template>
  <div>
    <div class="header">
      <div id="top">
        <img class="imgLogo" src="../assets/img/pic4.png" alt/>
        <div class="topRight">

          <el-button-group>
            <el-button type="text" @click="register" v-show='isLogin'>注册</el-button>
            <el-button type="text" @click="$router.push({path: '/login'})" v-show='isLogin'>登录</el-button>
            <el-button type='text' v-show='!isLogin' @click="user">您好 {{userName}}</el-button>
            <el-button type='text' v-show='!isLogin' @click="quit">注销</el-button>
            <!--<el-button type="text" @click="user">个人中心</el-button>-->
          </el-button-group>
          <div class="topBtn">
            <el-input v-model="keyWord" placeholder="请输入关键字查询"></el-input>
            <el-button type="primary" @click="btn">搜索</el-button>
          </div>
        </div>
      </div>
    </div>

    <div id="nav">
      <div class="navList">
        <router-link to="/" :class="{'router-link-exact-active': $route.path === '/'}">首页</router-link>
        <router-link to="/government" :class="{'router-link-exact-active': $route.path.indexOf('/government') > -1}">政务公开</router-link>
        <router-link to="/law" :class="{'router-link-exact-active': $route.path.indexOf('/law') > -1}">法律服务</router-link>
        <router-link to="/listLawer" :class="{'router-link-exact-active': $route.path.indexOf('/listLawer')} > -1">律师信息</router-link>
        <router-link to="/propaganda" :class="{'router-link-exact-active': $route.path.indexOf('/propaganda') > -1}">普法宣传</router-link>
        <router-link to="/map" :class="{'router-link-exact-active': $route.path.indexOf('/map')} > -1">司法地图</router-link>
        <router-link to="/mailbox" :class="{'router-link-exact-active': $route.path.indexOf('/mailbox')} > -1">局长信箱</router-link>
      </div>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="!['', '/'].includes($route.path)">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/foot";
export default {
  name: "layout",
  components: {
    Footer
  },
  data() {
    return {
      keyWord: "",
      breadcrumbList: [{path: '/', name: '首页'}],
      isLogin:true,
      userName:''
    };
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    user() {
      this.$router.push("./user");
    },
    btn() {},
    quit(){
      this.isLogin = true;
      this.$store.commit('userInfo', '');
      this.$store.commit('authorityList', '');
      this.$store.commit('token', '');
      this.$Cookies.set('token', '');
    }
  },
  created() {
    const {path, name} = this.$route;
    if (path.lastIndexOf('/') === 0) {
      if (path.length > 1) {
        this.breadcrumbList = [{path: '/', name: '首页'}, {path, name}];
      } else {
        this.breadcrumbList = [{path: '/', name: '首页'}];
      }
    } else if (path.lastIndexOf('/') > 0) {
      this.breadcrumbList.push({path, name});
    }
  },
  mounted(){
    console.log(this.$store)
    if(this.$store.state.token){
      this.isLogin = false;
      this.userName = this.$store.state.userInfo.userName
    }
  },
  watch: {
    $route(val) {
      const {path, name} = val;
      if (path.lastIndexOf('/') === 0) {
        if (path.length > 1) {
          this.breadcrumbList = [{path: '/', name: '首页'}, {path, name}];
        } else {
          this.breadcrumbList = [{path: '/', name: '首页'}];
        }
      } else if (path.lastIndexOf('/') > 0) {
        this.breadcrumbList.push({path, name});
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background: #f2f2f2;
  height: 100%;
  // padding-bottom: 10px;
}
.header {
  width: 100%;
  background: #fff;
}
#top {
  width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  .imgLogo {
    height: 100px;
  }
  .topRight {
    text-align: right;
    .el-button-group {
      background: linear-gradient(to right, #10a0d3, #1b79c3);
      padding: 10px 0;
      border-radius: 5px;
      .el-button--text {
        color: #fff!important;
        padding: 0 10px 0;
        border-right: 1px solid #fff;
        &:last-of-type {
          border-right: none;
        }
      }
    }
  }
  .topBtn {
    width: 400px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .el-input__inner {
      border: 1px solid #197fc5;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
    }
    .el-button {
      border-radius: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background: #1a7ec5;
      width: 100px;
    }
  }
}
#nav {
  width: 100%;
  background: linear-gradient(to right, #10a0d3, #1b79c3);
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
  background: rgba(255, 255, 255, 0.4);
}
.navList {
  width: 85%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-around;
}
  .el-breadcrumb {
    width: 85%;
    margin: 20px auto;
    font-size: 16px;
    font-weight: 700;
  }
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  color: #3ba6d5;
}
</style>
