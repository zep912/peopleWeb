<template>
  <div class="userInfo">
    <el-row>
      <el-col :span="6">
        <el-menu :unique-opened="true" @open="handleOpen" @select="handleSelect">
          <el-submenu index="home" :class="{'no-opened': ['home', 'info', 'feedback', 'session'].includes(active)}">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span slot="title">个人信息主页</span>
            </template>
          </el-submenu>
          <el-submenu index="refer">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span>我的咨询</span>
            </template>
            <el-menu-item index="refer" :class="{'is-active': active === 'refer'}">免费咨询</el-menu-item>
            <el-menu-item index="payRefer" :class="{'is-active': active === 'payRefer'}">针对性咨询</el-menu-item>
          </el-submenu>
          <el-submenu index="lawHelp">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span>我的预约</span>
            </template>
            <el-menu-item index="lawHelp" :class="{'is-active': active === 'lawHelp'}">法律援助预约</el-menu-item>
            <el-menu-item index="lawPeople" :class="{'is-active': active === 'lawPeople'}">人民调解预约</el-menu-item>
          </el-submenu>
          <el-submenu index="info" :class="{'no-opened': ['home', 'info', 'feedback', 'session'].includes(active)}">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span slot="title">个人信息</span>
            </template>
          </el-submenu>
          <el-submenu index="feedback" :class="{'no-opened': ['home', 'info', 'feedback', 'session'].includes(active)}">
            <template slot="title">
              <i class="el-icon-arrow-right"></i>
              <span slot="title">意见反馈</span>
            </template>
          </el-submenu>
          <el-submenu index="session" disabled :class="{'no-opened': ['home', 'info', 'feedback', 'session'].includes(active)}">
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
      this.active = key !== 'session' ? key : 'home';
    },
    handleSelect(key) {
      this.active = key;
    },
  }
};
</script>

<style lang="scss">
.userInfo{
  width: 85%;
  margin: 0 auto 20px;
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
    &.no-opened {
      .el-submenu__title {
        .el-icon-arrow-right {
          transform: none;
        }
      }
    }
    &.is-disabled {
      .el-submenu__title {
        opacity: 1;
      }
    }
  }
  .el-col-15 {
    margin-left: 20px;
    background-color: #fff;
  }
}
</style>
