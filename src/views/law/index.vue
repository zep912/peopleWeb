<template>
  <div class="law">
    <div class="law-header">
      <div class="law-content" :class="{active: active === 'refer'}" @click="active = 'refer'">
        <i class="iconfont iconzixun"></i>
        <div>在线咨询</div>
      </div>
      <div class="law-content" :class="{active: active === 'booking'}" @click="active = 'booking'">
        <i class="iconfont iconrili"></i>
        <div>在线预约</div>
      </div>
      <div class="law-content" :class="{active: active === 'feedback'}" @click="active = 'feedback'">
        <i class="iconfont iconyijian"></i>
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
import mixins from '@/assets/js/mixins.js'
export default {
  components: {refer, booking, feedback, exam},
  mixins: [mixins],
  data() {
    return {
      active: 'refer',
    }
  },
  methods: {
  },
  // 路由传参，有指定tab时进指定tab，否则加第一个tab
  mounted() {
    const {active = 'refer'} = this.$route.query;
    this.active = active;
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
      background: #fff;
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
    // border-top: 2px solid #449efe;
    border-top: 1px solid #ccc;
  border-image:linear-gradient(to right,#10a0d3,#1b79c3) 1 10;
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
