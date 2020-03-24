<template>
  <div class="video">
    <h2>{{form.couName}}</h2>
    <el-row>
      <el-col :span="16">
        <video :src="form.playUrl" :poster="form.couCover" style="width:95%;" controls="true"></video>
      </el-col>
      <el-col :span="6">
        <h4>课件信息</h4>
        <p>
          <span>知识范围:</span>
          <span>{{form.knowScope}}</span>
        </p>
        <p>
          <span>内容分类:</span>
          <span>{{form.cate}}</span>
        </p>
        <p>
          <span>视频时长:</span>
          <span>{{form.videoDuration}}</span>
        </p>
        <p>课程简介:</p>
        <p>{{form.cusDesc}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
        video:'',
        form:{
            couName:'',
            knowScope:'',
            cate:'',
            videoDuration:'',
            content:'',
            video:'',
            cusCover:''
        }
    };
  },
  created() {},
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let obj = {
        planId:this.$router.currentRoute.query.id
      };
      this.$ajaxPost('/train/getPublicTrainVideo',obj).then(res=>{
        this.form = res.data.content;
        console.log(this.form,111)
        console.log(this.form.couCover)
      })
    }
  }
};
</script>

<style lang='scss'>
.video {
  width: 85%;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
}
</style>