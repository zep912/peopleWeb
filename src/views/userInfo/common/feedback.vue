<template>
  <div class="feedback">
    <span class="title">意见反馈</span>
    <el-form label-width="80px" :model="form">
      <el-form-item label="标题:">
        <el-input placeholder="请输入" v-model="form.feeTitle"></el-input>
      </el-form-item>
      <el-form-item label="反馈内容:">
        <el-input type="textarea" :rows="10" v-model="form.feeContent"></el-input>
      </el-form-item>
    </el-form>
    <div class="footBtn">
      <el-button class="save" @click="save">提交</el-button>
      <el-button class="quit">取消</el-button>
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
      }
    };
  },
  methods: {
    save() {
      let obj = {
        token: this.$store.state.token, //类型：String  必有字段  备注：用户身份标识
        ...this.form,
        feeModel: "1" //类型：String  必有字段  备注：固定值填1
      };
      this.$ajaxPost("/suggest/saveSuggestFeedback", obj).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "提交成功",
            center: true
          });
          this.form = {
             feeTitle: "",
        feeContent: ""
          }
        }
      });
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

