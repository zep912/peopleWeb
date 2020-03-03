<template>
  <div class="login-container">
    <div class="login-content">
      <h1>“智慧司法”网络平台</h1>
      <div class="login-form">
        <div class="login-left">
          <el-form label-width="0px" :model="form" ref="form">
            <el-form-item prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="login-right">
          <el-button @click="login">登录</el-button>
        </div>
      </div>
      <div class="login-footer">
        <el-button type="text" @click="$router.push('/register')">账号注册</el-button>
        <el-button type="text">忘记密码？</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        form: {
          username: '',
          password: '',
          osname: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'}
          ],
        }
      }
    },
    methods: {
      login() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$ajaxPost('/login/loginCheck', this.form).then(({data}) => {
              if (data.code === 200) {
                this.$store.commit('userInfo', data.content.userInfo);
                this.$store.commit('authorityList', data.content.authorityList);
                this.$store.commit('token', data.content.token);
              }
            })
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("../assets/img/login-bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .login-content {
    width: 560px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h1 {
      font-size: 60px;
      font-weight: 900;
      text-align: center;
      color: #fff;
      margin-bottom: 50px;
    }
    .login-form {
      width: 400px;
      background: rgba(255, 255, 255, 0.5);
      padding: 40px 30px 10px;
      margin: 0 auto;
      border-radius: 20px;
      display: flex;
      .login-left {
        flex: 1;
      };
      .login-right {
        .el-button {
          margin-left: 10px;
          width: 100px;
          height: 100px;
          border-radius: 10px;
          background: #243c61;
          color: #fff;
          font-size: 24px;
          border-color: #7592ad;
        }
      }
    }
    .login-footer {
      text-align: center;
      .el-button--text {
        width: 120px;
        color: #fff;
        font-size: 16px;
      }
    }
  }
}
</style>
