<template>
  <div class="mailbox">
    <div class="mail-box">局长信箱</div>
    <el-form>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发信人">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        name:''
      }
    }
  },
  mounted(){

  },
  methods:{

  }
};
</script>

<style>
</style>