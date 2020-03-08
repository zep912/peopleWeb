<template>
  <div class="forgetPwd">
    <div class="forgetHead">找回密码</div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form" v-show="formShow">
      <el-form-item label="登录账号:" prop="accout">
        <el-input v-model="form.loginName" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phoneNum">
        <el-input v-model="form.phoneNum" :maxlength="11" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="validateCode">
        <el-input
          v-model="form.validateCode"
          v-show="isCode"
          style="width:200px;border:1px solid #ccc"
        ></el-input>
        <a href="javascript:void(0)" v-show="getCodeShow" @click="getCode">点击获取</a>
        <el-button
          type="primary"
          :disabled="disabled"
          v-show="isCode"
          @click="getCode"
          style="margin-left:10px"
        >{{codeMsg}}</el-button>
      </el-form-item>
    </el-form>
    <div @click="next('rules')" class="next" v-show="formShow">下一步</div>
    <el-form :model="formItem" v-show="!formShow" ref="ruleForm" :rules="ruleForm">
      <el-form-item label="设置新密码:" prop="newPassword">
        <el-input
          type="password"
          show-password
          placeholder="请输入密码"
          v-model="formItem.newPassword"
          clearable
          style="width:300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码:" prop="checkPass">
        <el-input
          type="password"
          show-password
          placeholder="请输入密码"
          v-model="form.checkPass"
          clearable
          style="width:300px"
        ></el-input>
      </el-form-item>
    </el-form>
    <div @click="save('ruleForm')" class="next" v-show="!formShow">提交</div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formItem.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formItem.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formShow: true,
      getCodeShow: true,
      codeMsg: "",
      isCode: false,
      disabled: true,
      form: {
        accout: "",
        phoneNum: "",
        validateCode: ""
      },
      formItem: {
        newPassword: "",
        checkPass: ""
      },
      ruleForm: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      rules: {
        accout: [
          { required: true, message: "请输入登录账号", trigger: "change" }
        ],
        phoneNum: [
          { required: true, message: "请填写手机号码", trigger: "change" }
        ],
        validateCode: [
          { required: true, message: "请输入验证码", trigger: "change" }
        ]
      },
      pwdToken: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            pwdToken: this.pwdToken,
            newPassword: this.formItem.newPassword
          };
          this.$$ajaxPost("/login/saveNewPwd", obj).then(res => {
            if (res.data.code == 200) {
              this.$message.success("找回成功");
            } else {
              this.$message.warning("找回失败");
            }
          });
        }
      });
    },
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$ajaxPost("/login/checkUserPhone", this.form).then(res => {
            if (res.data.code == 200) {
              this.pwdToken = res.data.data.pwdToken;
              this.formShow = false;
            }
          });
        }
      });
    },
    getCode() {
      if (this.form.phoneNum == "") {
        this.$message.warning("手机号不能为空");
        return;
      } else if (!/^1[3456789]\d{9}$/.test(this.form.phoneNum)) {
        this.$message.warning("请填写正确的手机号码");
        return;
      } else {
        this.isCode = true;
        this.getCodeShow = false;
        this.codeMsg = this.num + "s";
        let timer = setInterval(() => {
          this.num--;
          this.codeMsg = this.num + "s";
          if (this.num == 0) {
            clearInterval(timer);
            this.codeMsg = "重新获取";
            this.num = 60;
            this.disabled = false;
          }
        }, 1000);
      }
      this.$ajaxPost("/login/getSmsCode", { phoneNum: this.form.mobile }).then(
        res => {
          if (res.data.msg == "成功") {
            this.$message.success("发送成功");
          }
        }
      );
    }
  }
};
</script>

<style lang='scss'>
.forgetPwd {
  width: 85%;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
  .forgetHead {
    text-align: center;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
  }
}
.next {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;
}
.next:hover {
  color: #0ea6d6;
}
</style>