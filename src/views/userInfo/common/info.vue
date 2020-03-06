<template>
  <div class="info">
    <span>个人信息</span>
    <el-form>
      <el-form-item label='群众姓名:'>{{form.personName}}</el-form-item>
      <el-form-item label='身份证号:'>{{form.idNumber}}</el-form-item>
      <el-form-item label='手机号码:'>{{form.cellphone}}</el-form-item>
      <el-form-item label='性别:'>{{form.sexDesc}}</el-form-item>
      <el-form-item label='出生日期:'>{{form.birthday}}</el-form-item>
      <el-form-item label='所属地区:'>{{form.addressDetail}}</el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "info",
    data() {
      return {
        form:{
          personName:'',
          idNumber:'',
          cellphone:'',
          sexDesc:'',
          birthday:'',
          addressDetail:''
        }
      }
    },
    mounted(){
      this.getUserInfo()
      
    },
    methods: {
      getUserInfo(){
        this.$ajaxPost('/citizen/getCitizenInfo',{'token':this.$store.state.token}).then(res=>{
          this.form = res.data.content
        })
      },
      
    }
  }
</script>

<style lang="scss">
  .info {
    width: 100%;
    background: #fff;
    border-top: 1px solid #1787c8;
    box-sizing: border-box;
    margin-left: 20px;
    padding: 20px;
    span{
      display: inline-block;
      width: 120px;
      height: 44px;
      background: linear-gradient(to right, #10a1d4, #1b7bc3);
      color: #fff;
      font-size: 16px;
      line-height: 44px;
      text-align: center;
    }
    .el-form{
      margin-top: 20px;
      .el-form-item{
        margin-bottom: 0 ;
      }
    }
  }
</style>
