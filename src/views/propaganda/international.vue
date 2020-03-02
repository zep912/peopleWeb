<template>
  <div class="lawArt">
    <div class="lawTitle">
      <span class="lawTitles">国际条约惯例</span>
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
      list: [
        {
          title: "律师事务所设立审核登记",
          time: "2018-12-14",
          id:11
        },
        {
          title: "律师事务所设立审核登记",
          time: "2018-12-14",
          id:2
        },
        {
          title: "律师事务所设立审核登记",
          time: "2018-12-14",
          id:3  
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
      lawClick(n,id){
          console.log(n,id)
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
    li span:nth-of-type(1)::before{
        content:'';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #000;
        display: inline-block;
        margin-right: 10px;
    }
  }
  .el-pagination{
      text-align: right
  }
}
</style>