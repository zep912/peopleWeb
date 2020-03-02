<template>
  <div class="propa" id='propaga'>
    <div class="menu">首页>普法宣传</div>
    <div class="propa_wrap">
      <el-row>
        <el-col :span="9">
          <router-link to="/lawArt"><i class="el-icon-arrow-right"></i>以案释法</router-link>
          <router-link to=""><i class="el-icon-arrow-right"></i>法律法规</router-link>
          <router-link to=""><i class="el-icon-arrow-right"></i>司法培训</router-link>
          <img src="../../assets/img/pic1.png" alt="">
          <img src="../../assets/img/pic2.png" alt="">
          <img src="../../assets/img/pic3.png" alt="">
        </el-col>
        <el-col :span="10">
          <router-view />
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "1",
      tabPosition: "left"
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang='scss'>
.propa {
  width: 85%;
  margin: 0 auto;
}
.propa_wrap{
  margin-top: 20px;
}
.propa_wrap .el-col a{
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  color: #000;
  box-sizing: border-box;
  padding-left: 10px;
  i{
    margin-right: 10px;
  }
}
.propa_wrap .el-col img{
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.propa_wrap .el-col img:nth-of-type(2){
  margin-top: 0;
  margin-bottom: 0;
}
 #propaga .router-link-active{
  background: linear-gradient(to right,#0ea4d5,#1c78c2);
  color: #fff;
  font-weight: 600;
}
.propa_wrap .el-col a:nth-of-type(2){
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>