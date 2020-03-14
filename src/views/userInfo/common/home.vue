<template>
  <div class="home">
    <ul class="home-menu">
      <li>
        <img src="../../../assets/img/u100.png" alt />

        <p>免费咨询</p>
        <p>{{form.freeCount?form.freeCount:0}}</p>
      </li>
      <li>
        <img src="../../../assets/img/u101.png" alt />

        <p>针对性咨询</p>
        <p>{{form.assignCount?form.assignCount:0}}</p>
      </li>
      <li>
        <img src="../../../assets/img/u102.png" alt />

        <p>法律援助预约</p>
        <p>{{form.lawCount?form.lawCount:0}}</p>
      </li>
      <li>
        <img src="../../../assets/img/u103.png" alt />

        <p>人民调解预约</p>
        <p>{{form.mediateCout?form.mediateCout:0}}</p>
      </li>
      <li>
        <img src="../../../assets/img/u104.png" alt />

        <p>意见反馈</p>
        <p>{{form.feedbackCout?form.feedbackCout:0}}</p>
      </li>
    </ul>

    <div class="homeBox">
      <div class="homeAt">
        <span class="homeNear">近期咨询</span>
        <span class="homeAccout">
          共有：
          <span>{{pageform.total}}篇</span>
        </span>
      </div>
      <ul class="homeUl">
        <li v-for="(item,index) in consultList" :key="index">
          <span>{{item.consultTitle}}</span>
          <span class="time">{{item.consultDate.substring(0,10)}}</span>
        </li>
      </ul>
      <div class="footPage">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageform.pageNum"
          :page-size="pageform.pageSize"
          layout="total, prev, pager, next"
          :total="pageform.total"
        >></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      lawyerRequest: {
        total: 0
      },
      form: {
        feedbackCout: "",
        freeCount: "",
        assignCount: "",
        lawCount: "",
        mediateCout: ""
      },
      list: [],
      token: "",
      pageform: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      consultList: []
    };
  },
  mounted() {
    this.token = this.$store.state.token;
    this.getIndexData();
    this.getCousultList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageform.pageNum = val;
      this.getCousultList();
    },
    handleCurrentChange(val) {
      this.pageform.pageNum = val;
      this.getCousultList();
    },
    getIndexData() {
      this.$ajaxPost("/index/indexData", {
        token: this.token
      }).then(res => {
        if (res.data.code == 200) {
          if (JSON.stringify(res.data.content) == "{}") {
            this.form = {};
          } else {
            this.form = res.data.content.countData;
          }
        }
      });
    },
    getCousultList() {
      let obj = {
        token: this.token,
        pageSize: this.pageform.pageSize,
        pageNum: this.pageform.pageNum
      };
      this.$ajaxPost("/index/recentlyConsultList", obj).then(res => {
        if (res.data.code === 200) {
          this.consultList = res.data.content.dataList;
          console.log(this.consultList);
          this.pageform.total = res.data.content.pageInfo.total;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.home {
  margin-left: 20px;
  .home-menu {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 20px;
    li {
      height: 150px;
      float: left;
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
  // border-top: 1px solid #1787c8;
    border-top: 1px solid #ccc;
  border-image:linear-gradient(to right,#10a0d3,#1b79c3) 1 10;
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
  .homeUl {
    margin-top: 20px;
    li {
      height: 44px;
      line-height: 44px;
      overflow: hidden;
      border-bottom: 1px dashed #ccc;
      box-sizing: border-box;
      // padding-right: 20px;
      .time {
        float: right;
        color: #999;
      }
    }
    li:before {
      content: "";
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
.footPage {
  text-align: right;
}
</style>
