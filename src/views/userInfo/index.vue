<template>
  <div class="userInfo">
    <el-row>
      <el-col :span="6">
        <el-menu :unique-opened="true" @open="handleOpen" @close="handleClose" @select="handleSelect">
          <el-submenu index="refer">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span>我的咨询</span>
            </template>
            <el-menu-item index="refer">免费咨询</el-menu-item>
            <el-menu-item index="payRefer">针对性咨询</el-menu-item>
          </el-submenu>
          <el-submenu index="lawHelp">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span>我的预约</span>
            </template>
            <el-menu-item index="lawHelp">法律援助预约</el-menu-item>
            <el-menu-item index="lawPeople">人民调解预约</el-menu-item>
          </el-submenu>
          <el-submenu index="info" :class="{'is-active': active >= 3}">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span slot="title">个人信息</span>
            </template>
          </el-submenu>
          <el-submenu index="feedback" :class="{'is-active': active >= 3}">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span slot="title">意见反馈</span>
            </template>
          </el-submenu>
          <el-submenu index="4" :class="{'is-active': active >= 3}">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span slot="title">在线会话</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="17">
        <component :is="active"></component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import home from './common/home';
import info from './common/info';
import feedback from './common/feedback';
import lawHelp from './common/lawHelp';
import lawPeople from './common/lawPeople';
import payRefer from './common/payRefer';
import refer from './common/refer';
export default {
  data() {
    return {
      active: 'home'
    }
  },
  components: {home, info, feedback, lawHelp, lawPeople, payRefer, refer},
  methods: {
    handleOpen(key) {
      console.log(key);
      if (key != 1) this.active = key;
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key);
      this.active = key;
      console.log(key, keyPath);
    },
  }
};
</script>

<style lang="scss">
.userInfo{
  width: 85%;
  margin: 0 auto;
  margin-top: 20px;
  .el-submenu {
    border-bottom: 1px solid #ccc;
    .el-menu-item::before{
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 50%;
      display: inline-block;
      background: #999;
      margin-right: 5px;
      vertical-align: middle
    }
    .el-submenu__title {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      .el-submenu__icon-arrow {
        display: none;
      }
      .el-icon-arrow-right {
        transition: all 0.3s;
      }
    }
    &.is-opened {
      .el-submenu__title {
        background: linear-gradient(to right, #0ea4d5, #1c78c2);
        color: #fff;
        font-weight: 600;
        i {
          color: #fff;
        }
        .el-icon-arrow-right {
          transform: rotate(90deg);
        }
      }
    }
    &.is-active {
      .el-submenu__title {
        .el-icon-arrow-right {
          transform: none;
        }
      }
    }
  }
  .el-col-15 {
    margin-left: 20px;
    background-color: #fff;
  }
}
</style>
