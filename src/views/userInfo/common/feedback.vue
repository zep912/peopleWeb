<template>
  <div class="feedback">
    <span class="title">意见反馈</span>
    <el-form label-width="100px" :model="form" ref="ruleForm" :rules="ruleForm">
      <el-form-item label="标题:" prop="feeTitle">
        <el-input placeholder="请输入" v-model="form.feeTitle"></el-input>
      </el-form-item>
      <el-form-item label="反馈内容:" prop="feeContent">
        <el-input type="textarea" :rows="10" v-model="form.feeContent"></el-input>
      </el-form-item>
    </el-form>
    <div class="footBtn">
      <el-button class="save" @click="save('ruleForm')">提交</el-button>
      <el-button class="quit" @click="quit('ruleForm')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "feedback",
  data() {
    return {
      form: {
        feeTitle: "",
        feeContent: ""
      },
      ruleForm: {
        feeTitle: [{ required: true, message: "请填写标题", trigger: "blur" }],
        feeContent: [{ required: true, message: "请填写标题", trigger: "blur" }]
      }
    };
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            token: this.$store.state.token, //类型：String  必有字段  备注：用户身份标识
            ...this.form,
            feeModel: "1" //类型：String  必有字段  备注：固定值填1
          };
          this.$ajaxPost("/suggest/saveSuggestFeedback", obj).then(res => {
            if (res.data.code == 200) {
              this.$message.success("提交成功");
              this.$refs[formName].resetFields();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    quit(formName){
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.feedback {
  width: 100%;
  background: #fff;
  border-top: 1px solid #1787c8;
  box-sizing: border-box;
  margin-left: 20px;
  padding: 20px;
  .title {
    display: inline-block;
    width: 120px;
    height: 44px;
    background: linear-gradient(to right, #10a1d4, #1b7bc3);
    color: #fff;
    font-size: 16px;
    line-height: 44px;
    text-align: center;
    margin-bottom: 20px;
  }
}
.footBtn {
  text-align: center;
  margin-top: 100px;
  margin-bottom: 30px;
  .el-button {
    width: 120px;
  }
  .save {
    background: linear-gradient(to right, #10a1d4, #1b7bc3);
    color: #fff;
  }
}
</style>

