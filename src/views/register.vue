<template>
  <div class="register">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="群众姓名:" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号:" prop="identityCard">
        <el-input v-model="form.identityCard" placeholder="请输入18位身份证号"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phoneNum">
        <el-input v-model="form.phoneNum" placeholder="请输入11位手机号" :maxlength="11"></el-input>
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
      <el-form-item label="设置密码:" prop="password">
        <el-input v-model="form.password" type="password" show-password style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="paw2">
        <el-input v-model="form.paw2" type="password" show-password style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期:" prop="birthday">
        <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-row style="border-bottom:1px solid #ccc">
        <el-col :span="10">
          <el-form-item label="所属地区:" prop="areaArray" style="border-bottom:0;margin-bottom:0">
            <area-list v-model="form.areaArray"></area-list>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-input
            v-model="form.desc"
            style="margin-left:20px;border:1px solid #ccc"
            placeholder="请输入详细地址"
          ></el-input>
        </el-col>
      </el-row>
      <el-button type="primary" @click="onSubmit" style="margin-top:20px">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import areaList from "@/components/areaList";
export default {
  components: { areaList },
  data() {
    return {
      form: {
        userName: "",
        identityCard: "", //类型：String  必有字段  备注：身份证号
        phoneNum: "", //类型：String  必有字段  备注：手机号
        validateCode: "", //类型：String  必有字段  备注：验证码
        password: "", //类型：String  必有字段  备注：密码
        sex: "", //类型：String  必有字段  备注：性别
        birthday: "", //类型：String  必有字段  备注：出生日期
        areaCityId: "", //类型：String  必有字段  备注：市ID
        areaRegionId: "", //类型：String  必有字段  备注：(县)区ID
        areaStreetId: "", //类型：String  可有字段  备注：(镇)街道ID
        areaVillageId: "", //类型：String  可有字段  备注：(村)社区ID
        openId: "" //类型：String  可有字段  备注：公众号openId
      },
      isCode: false,
      getCodeShow: true,
      codeMsg: "",
      disabled: true,
      num: 60,
      rules: {
        userName: [
          { required: true, message: "请填写姓名", trigger: "change" }
        ],
        phoneNum: [
          { required: true, message: "请输入手机号码", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        paw2: [
          { required: true, message: "请再次输入密码", trigger: "change" }
        ],
        identityCard: [
          { required: true, message: "请填写身份证号", trigger: "change" }
        ],
        validateCode: [
          { required: true, message: "请输入验证码", trigger: "change" }
        ],
        usepasswordrName: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [
          { required: true, message: "请选择出生日期", trigger: "change" }
        ],
        areaArray: [
          { required: true, message: "请选择地址", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      // 校验身份证
      var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (idcardReg.test(this.form.identityCard)) {
            const areaArray = this.form.areaArray;
            let form = Object.assign({}, this.form);
            if (areaArray && areaArray.length) {//对地址重新包装
              form.areaCityId = areaArray[0];
              form.areaRegionId = areaArray[1];
              form.areaStreetId = areaArray[2];
            }
            this.$ajaxPost("/login/saveRegisterUser", form).then(({ res }) => {
              if (res.code == 200) {
                this.$nextTick(() => {
                  this.$refs["form"].clearValidate();
                });
                this.$message.success("提交成功", 3000);
              } else {
                this.$message.error(res.msg, 3000);
              }
            });
          } else {
           this.$message.error('请填写正确的身份证号')
            return false;
          }
        }else{
          console.log('error')
        }
      });
    },
    // 获取验证码，判断手机号，倒计时事件
    getCode() {
      if (this.form.phoneNum == "") {
        this.$message.warning("手机号不能为空");
        return;
      } else if (!/^1[3456789]\d{9}$/.test(this.form.phoneNum)) {
        this.$message.warning('请填写正确的手机号码')
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
            this.$message({
              message: "发送成功",
              type: "success"
            });
          }
        }
      );
    }
  }
};
</script>

<style lang='scss'>
.register {
  width: 85%;
  background: #fff;
  padding: 15px;
  margin: 10px auto;
  text-align: left;
  .el-form {
    max-width: 800px;
    margin: 0 auto;
  }
  .el-form-item {
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
  .el-input__inner {
    border: 0;
  }
  .el-form-item__label {
    text-align: justify;
    text-align-last: justify;
  }
}
</style>
