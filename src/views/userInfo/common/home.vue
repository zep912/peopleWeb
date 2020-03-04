<template>
  <div class="home">
    <ul class="home-menu">
      <li>
        <img src="../../../assets/img/u100.png" alt />

        <p>免费咨询</p>
        <p>{{form.num1}}</p>
      </li>
      <li>
        <img src="../../../assets/img/u101.png" alt />

        <p>针对性咨询</p>
        <p>{{form.num1}}</p>
      </li>
      <li>
        <img src="../../../assets/img/u102.png" alt />

        <p>法律援助预约</p>
        <p>{{form.num1}}</p>
      </li>
      <li>
        <img src="../../../assets/img/u103.png" alt />

        <p>人民调解预约</p>
        <p>{{form.num1}}</p>
      </li>
      <li>
        <img src="../../../assets/img/u104.png" alt />

        <p>意见反馈</p>
        <p>{{form.num1}}</p>
      </li>
    </ul>

    <div class="homeBox">
      <div class="homeAt">
        <span class="homeNear">近期咨询</span>
        <span class="homeAccout">
          共有：
          <span>{{num}}篇</span>
        </span>
      </div>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <span>{{item.title}}</span>
          <span class="time">{{item.time}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      form: {
        num1: 100
      },
      num: 1234,
      list: [
        {
          title: "123",
          time: "2020-01-01"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.home {
  margin-left: 20px;
  .home-menu {
    overflow: hidden;
    li {
      width: 150px;
      height: 150px;
      float: left;
      margin-right: 20px;
      background: #fff;
      text-align: center;
      box-sizing: border-box;
      padding-top: 20px;
      img {
        margin-bottom: 10px;
        width: 40px;
      }
      p:nth-of-type(1) {
        margin-bottom: 10px;
      }
      p:nth-of-type(2) {
        font-size: 24px;
        font-weight: 600;
        color: #1982c6;
      }
    }
    li:last-of-type {
      margin-right: 0;
    }
  }
}
.homeBox {
  background: #fff;
  border-top: 1px solid #1787c8;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px;
  .homeAt {
    width: 100%;
    background: #fff;
    .homeNear {
      display: inline-block;
      width: 120px;
      height: 44px;
      background: linear-gradient(to right, #10a1d4, #1b7bc3);
      color: #fff;
      font-size: 16px;
      line-height: 44px;
      text-align: center;
      margin-right: 20px;
    }
  }
  ul {
    margin-top: 20px;
    li {
      height: 44px;
      line-height: 44px;
      overflow: hidden;
      border-bottom: 1px dashed #ccc;
      box-sizing: border-box;
      // padding-right: 20px;
      .time{
        float: right;
        color: #999
      }
    }
    li:before{
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #000;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
</style>
