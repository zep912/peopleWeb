// 页面公共方法
const mixins = {
  data () {
    return {}
  },
  methods: {
    // 判断是否登录状态
    loginStatus() {
      if (!this.$store.state.userInfo.userName) {
        this.$router.push({path: '/login'});
      }
    }
  },
  mounted() {
    this.loginStatus()
  }
};
export default mixins
