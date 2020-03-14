<template>
  <div class="law">
    <div class="law-header">
      <div class="law-content" :class="{active: active === 'refer'}" @click="active = 'refer'">
        <i class="iconfont iconhtmal"></i>
        <div>在线咨询</div>
      </div>
      <div class="law-content" :class="{active: active === 'booking'}" @click="active = 'booking'">
        <i class="iconfont iconyuyuexuanzhong"></i>
        <div>在线预约</div>
      </div>
      <div class="law-content" :class="{active: active === 'feedback'}" @click="active = 'feedback'">
        <i class="iconfont iconxiaoxi"></i>
        <div>群众批评意见</div>
      </div>
      <div class="law-content" :class="{active: active === 'exam'}" @click="active = 'exam'">
        <i class="iconfont iconsifa"></i>
        <div>司法考试</div>
      </div>
    </div>
    <component :is="active"></component>
  </div>
</template>

<script>
import refer from './common/refer';
import booking from './common/booking';
import feedback from './common/feedback';
import exam from './common/exam';
export default {
  components: {refer, booking, feedback, exam},
  data() {
    return {
      active: 'refer',
    }
  },
  methods: {
  },
  mounted() {
    const query = this.$route.query;
    this.active = query.type ? query.type : 'refer';
  }
}
</script>

<style lang="scss">
.law {
  width: 85%;
  margin: 0 auto;
  .law-header {
    .law-content {
      width: 120px;
      display: inline-block;
      box-sizing: border-box;
      padding: 20px 10px;
      margin-right: 20px;
      text-align: center;
      border: 1px solid #ddd;
      cursor: pointer;
      i {
        font-size: 60px;
        color: #3ba6d5;
      }
      div {
        padding: 5px 0;
      }
      &.active {
        background: linear-gradient(to right, #10a1d4, #1b7bc3);
        font-weight: 700;
        color: #fff;
        i {
          color: #fff;
        }
      }
    }
  }
  .law-body {
    margin-top: 10px;
    width: 100%;
    background-color: #fff;
    padding: 15px!important;
    border-top: 2px solid #449efe;
    box-sizing: border-box;
    .el-tabs__header {
        margin: 0 0 15px;
      }
    .el-tabs__item {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 700;
        &.is-active {
          color: #fff;
          // background: #409EFF;
        }
      }
  }
}
.avatar-uploader {
  .avatar, .el-upload {
    width: 120px;
    height: 120px;
    display: block;
    border: 1px dashed #d9d9d9;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    box-sizing: border-box;
    line-height: 120px;
    text-align: center;
  }
}
.el-select {
  width: 100%;
}
</style>
