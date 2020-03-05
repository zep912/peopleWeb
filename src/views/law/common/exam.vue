<template>
  <div class="lawArt">
    <div class="lawTitle">
      <span class="lawTitles">考试动态</span>
      <span>
                共计：
                <span>{{total}}</span>篇
              </span>
    </div>
    <ul class="lawUl">
      <li v-for="(item,index) in list" :key="index">
        <span>{{item.newsTitle}}</span>
        <span class="time">{{item.publishTime}}</span>
      </li>
    </ul>
    <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
  export default {
    name: "exam",
    data() {
      return {
        list: [
          {newsTitle: '标题', publishTime: '2020-02-10'}
        ],
        total: 1
      }
    }
  }
</script>

<style lang="scss">
.lawArt {
    margin-top: 15px;
    padding: 20px;
    background: #fff;
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
