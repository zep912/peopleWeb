<template>
  <div class="lawArt">
    <div class="lawTitle">
      <span class="lawTitles">法律法规</span>
      <span>
        共计：
        <span>{{num}}</span>篇
      </span>
    </div>
    <ul class="lawUl">
      <li v-for="(item,index) in list" :key="index" @click="lawClick(item,id)">
        <span>{{item.title}}</span>
        <span class="time">{{item.time}}</span>
      </li>
    </ul>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: "1000",
      list: [],
      page:{
        pageSize:10,
        pageNum:1
      }
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    lawClick(n, id) {
      console.log(n, id);
    },
    getData() {
      let obj = {
        // token: "64d1d05f5ccb4670a6d342f3b3c002ce", //类型：String  必有字段  备注：token 用户身份标识
        scopeLevel: "", //类型：String  可有字段  备注：效力级别
        lawTimeliness: "", //类型：String  可有字段  备注：时效性
        lawTitle: "", //类型：String  可有字段  备注：标题
        ...this.page
      };
      this.$ajaxPost("/doc/lawRegulations/getLawRegulationsList", obj).then(
        res => {
          console.log(res);
        }
      );
    }
  }
};
</script>

<style lang='scss'>
.lawArt {
  padding: 20px;
  background: #fff;
  margin-left: 20px;
  border-top: 1px solid #0ea5d5;
  .lawTitles {
    display: inline-block;
    width: 150px;
    height: 40px;
    background: linear-gradient(to right, #10a0d3, #1b79c3);
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    margin-right: 30px;
    color: #fff;
  }
  .lawUl {
    margin-top: 10px;
    margin-bottom: 20px;
    li {
      height: 50px;
      width: 100%;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      list-style: none;
    }
    li span:nth-of-type(1)::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #000;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
