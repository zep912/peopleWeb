<template>
  <div class="content">
    <el-row :gutter="10">
      <el-col :span="16">
        <el-carousel height="360px">
          <el-carousel-item v-for="item in content.bannerList1" :key="item.bannerId">
            <img :src="item.imgPath">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="8">
        <el-tabs v-model="activeName" type="card" stretch @tab-click="handleClick">
          <el-tab-pane label="通知公告" name="first">
            <el-card>
              <div v-for="(item, index) in content.noticeList.slice(0, 6)" :key="item.newsId" class="item">
                <div class="header-top" v-if="index === 0">
                  <h3>{{item.newsContent}}</h3>
                  <p>
                    {{item.newsTitle}}
                  </p>
                </div>
                <div class="text" v-else>{{item.newsContent}}</div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="公示信息" name="second">
            <el-card>
              <div v-for="(item, index) in content.publicityList.slice(0, 6)" :key="item.newsId" class="item">
                <div class="header-top" v-if="index === 0">
                  <h3>{{item.newsContent}}</h3>
                  <p>
                    {{item.newsTitle}}
                  </p>
                </div>
                <div class="text" v-else>{{item.newsContent}}</div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="新闻资讯" name="third">
            <el-card>
              <div v-for="(item, index) in content.newsList.slice(0, 6)" :key="item.newsId" class="item">
                <div class="header-top" v-if="index === 0">
                  <h3>{{item.newsContent}}</h3>
                  <p>
                    {{item.newsTitle}}
                  </p>
                </div>
                <div class="text" v-else>{{item.newsContent}}</div>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="16" style="background-color: #fff; padding: 10px">
        <el-tabs v-model="activeName1" type="card" @tab-click="handleClick">
          <el-tab-pane label="法律法规" name="first">
            <div class="tab-content">
              <div class="tab-header">
                <h3>司法行政十大原则金曲奉献祖国"征集评选活动"</h3>
                <p>
                  网上申请的，先行提交电子材料，现场验证时提交纸质原件，正本原件核对无误后退回。网上提交的材料必须与当场提交的材料内容相同。
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="司法解释" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="国际条约惯例" name="third">配置管理</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      activeName: 'first',
      activeName1: 'first',
      content: {
        bannerList1: [],
        bannerList2: [],
        newsList: [],
        mapList: [],
        noticeList: [],
        trainList: [],
        examLink: {
          linkUrl: '',
          imgId: '',
          imgUrl: ''
        },
        lawList: [],
        judicialList: [],
        publicityList: [],
        internationalList: []
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getData() {
      this.$ajaxPost('/index/mainData', {request: 123}).then(({data}) => {
        if (data.code === 200) {
          this.content = data.content;
        }
      })
    }
  },
  mounted() {
    this.getData();
  }
}
</script>
<style lang="scss">
  .content {
    width: 85%;
    margin: 10px auto;
    height: 1000px;
    font-size: 14px;
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__item {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      font-weight: 700;
      &.is-active {
        color: #fff;
        background: #409EFF;
      }
    }
    .el-card__body {
      padding: 0;
      .item {
        width: 100%;
        .header-top {
          padding: 10px;
          border-bottom: 1px dashed #ccc;
          h3 {
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 20px;
          }
          p {
            margin-top: 10px;
            width: 100%;
            min-height: 40px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        .text {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          padding: 0 20px;
          height: 36px;
          line-height: 36px;
          &:before {
            content: '';
            display: inline-block;
            width: 5px;
            height: 5px;
            margin-right: 5px;
            background-color: black;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        &:nth-of-type(2) {
          margin-top: 14px;
        }
        &:last-of-type {
          margin-bottom: 14px;
        }
      }
    }
  }
</style>
