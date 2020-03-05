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
        <el-tabs v-model="activeName" type="card" stretch>
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
      <el-col :span="16">
        <el-tabs class="new-box" type="card">
          <el-tab-pane label="法律法规">
            <div class="tab-content" v-for="item in content.lawList" :key="item.lawId">
              <div class="tab-left">{{item.lawTitle}}</div>
              <div class="tab-right">{{item.execDate}}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="司法解释">
            <div class="tab-content" v-for="item in content.judicialList" :key="item.lawId">
              <div class="tab-left">{{item.lawTitle}}</div>
              <div class="tab-right">{{item.publishDate}}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="国际条约惯例">
            <div class="tab-content" v-for="item in content.internationalList" :key="item.lawId">
              <div class="tab-left">{{item.lawTitle}}</div>
              <div class="tab-right">{{item.publishDate}}</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <el-tabs class="new-box" type="card">
          <el-tab-pane label="法律服务">
            <div class="serve-box">
              <div class="serve-content">
                <i class="iconfont iconhtmal"></i>
                <div>在线咨询</div>
              </div>
              <div class="serve-content">
                <i class="iconfont iconyuyuexuanzhong"></i>
                <div>在线预约</div>
              </div>
              <div class="serve-content">
                <i class="iconfont iconxiaoxi"></i>
                <div>司法考试</div>
              </div>
              <div class="serve-content">
                <i class="iconfont iconsifa"></i>
                <div>群众批评意见</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-carousel height="120px" style="margin: 10px 0">
      <el-carousel-item v-for="item in content.bannerList1" :key="item.bannerId">
        <img :src="item.imgPath">
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="10">
      <el-col :span="16">
        <el-tabs class="new-box" type="card">
          <el-tab-pane label="司法培训">
            <div class="serve-box train-box">
              <div class="train-content" v-for="item in 8" :key="item">
                <div class="train-title">暂无数据</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <img src="../../assets/img/csfb.png" class="img-content" alt="">
        <img src="../../assets/img/sft.png" class="img-content" alt="">
        <img src="../../assets/img/pfw.png" class="img-content" alt="">
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="16">
        <el-tabs type="card" class="new-box">
          <el-tab-pane label="司法地图">
            <!--<div style="background-color: red; height: 320px;">-->
            <!--</div>-->
            <baseMap></baseMap>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <div class="map-list">
          <div class="map-content" v-for="item in content.mapList" :key="item.orgName">
            <div class="map-left">{{item.orgName}}</div>
            <div class="map-right">
              <span>{{item.orgCunt}}</span>家
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import baseMap from '@/components/map'
export default {
  name: 'Home',
  components: {
    baseMap
  },
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
    .new-box {
      overflow: hidden;
      height: 300px;
      background-color: #fff;
      padding: 15px!important;
      border-top: 2px solid #449efe;
      box-sizing: border-box;
      .el-tabs__item {
        height: 40px;
        line-height: 40px;
      }
      .el-tab-pane {
        .tab-content {
          display: flex;
          height: 40px;
          line-height: 40px;
          .tab-left {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            flex: 1;
            padding-right: 30px;
            font-size: 16px;
          }
          .tab-right {
            text-align: right;
            width: 120px;
            color: #666;
          }
        }
        .serve-box {
          padding: 15px 0;
          display: grid;
          grid-gap: 15px 15px;
          grid-template-columns: repeat(3, 1fr);
          .serve-content {
            padding: 20px 0 10px;
            text-align: center;
            border: 1px solid #ddd;
            i {
              font-size: 36px;
            }
            div {
              padding: 5px 0;
            }
            &:hover {
              background: #3ba6d5;
              font-weight: 700;
              color: #fff;
            }
          }
        }
        .train-box {
          grid-template-columns: repeat(4, 1fr);
          .train-content {
            height: 100px;
            background-color: #ddd;
            position: relative;
            .train-title {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 30px;
              line-height: 30px;
              padding: 0 6px;
              box-sizing: border-box;
              font-size: 14px;
              font-weight: 700;
              background: rgba(0, 0, 0, 0.5);
              color: #fff;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }
    }
    .img-content {
      width: 100%;
      /*height: 90px;*/
      background-color: red;
      margin-bottom: 15px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    .map-list {
      .map-content {
        display: flex;
        font-size: 16px;
        padding: 0 20px;
        border: 1px solid #ccc;
        height: 48px;
        line-height: 48px;
        .map-left {
          flex: 1;
        }
        .map-right {
          text-align: right;
          width: 80px;
          span {
            font-size: 28px;
            color: red;
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
