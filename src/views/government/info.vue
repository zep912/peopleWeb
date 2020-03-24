<template>
  <div class="info">
    <h3>{{content.newsTitle}}</h3>
    <div class="time-box">
      <span>发布时间：{{content.publishTime}}</span>
      <span>来源：{{content.newsSource}}</span>
    </div>
    <div class="detail">
      {{content.newsTitle}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "info",
    data() {
      return {
        content: {}
      }
    },
    methods: {
      getData() {
        this.$ajaxPost('/doc/news/getOpenNewsDetail', {newsId: this.$route.query.newId}).then(({data}) => {
          if (data.code == 200) {
            this.content = data.content;
          }
        })
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
.info {
  width: 85%;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  text-align: center;
  h3 {
    font-size: 30px;
    font-weight: 700;
    padding: 10px 0;
  }
  .time-box {
    font-size: 12px;
    color: #666;
  }
  .detail {
    white-space: pre-wrap;
    margin: 10px;
    padding-bottom: 20px;
  }
}
</style>
