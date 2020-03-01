<template>
  <div class="register">
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="群众姓名:">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="身份证号:">
    <el-input v-model="form.idCode" placeholder="请输入18位身份证号"></el-input>
  </el-form-item>
  <el-form-item label="手机号码:">
    <el-input v-model="form.mobile" placeholder="请输入11位手机号"></el-input>
  </el-form-item>
  <el-form-item label="验证码:">
<el-input v-model="form.code"></el-input>
  </el-form-item>
  <el-form-item label="设置密码:">
    <el-input v-model="form.paw" type='password'></el-input>
  </el-form-item>
  <el-form-item label="确认密码:">
    <el-input v-model="form.paw2" type='password'></el-input>
  </el-form-item>
  <el-form-item label="性别:">
    <el-radio-group v-model="form.sex">
    <el-radio :label="1">男</el-radio>
    <el-radio :label="2">女</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item label="出生日期:">
    <el-date-picker
      v-model="form.date"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="所属地区::">
    <el-input v-model="form.desc"></el-input>
  </el-form-item>
</el-form>
<el-button type="primary" @click="onSubmit">注册</el-button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            form: {
          name: '',
          idCode: '',
          paw: '',
          paw2: '',
          sex: 1,
          date: '',
          desc: '',
        }
 
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        onSubmit() {
        console.log('submit!');
      }
 
    }
}
</script>

<style lang='scss'>
.register{
    width: 85%;
    background: #fff;
    padding: 15px;
    margin: 10px auto;
    text-align: left;
    .el-form-item{
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;
    }
    .el-input__inner{
        border: 0
    }
    .el-form-item__label{
        text-align: justify;
        text-align-last: justify
    }
}
</style>