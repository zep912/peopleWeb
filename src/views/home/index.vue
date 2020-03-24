<template>
  <div class="content">
    <el-row :gutter="10">
      <el-col :span="16">
        <el-carousel height="360px">
          <el-carousel-item v-for="item in content.bannerList1" :key="item.bannerId">
            <a :href="item.linkUrl" target="_blank">
              <img :src="item.imgPath" />
            </a>
            <div class="bannerTitle">{{item.bannerTitle}}</div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="8">
        <el-tabs v-model="activeName" type="card" stretch>
          <el-tab-pane label="通知公告" name="first">
            <el-card>
              <div
                v-for="(item, index) in content.noticeList.slice(0, 6)"
                :key="item.newsId"
                class="item"
                @click="goNews(item.newsId)"
              >
                <div class="header-top" v-if="index === 0">
                  <h3>{{item.newsTitle}}</h3>
                  <p>{{item.newsContent}}</p>
                </div>
                <div class="text" v-else>{{item.newsTitle}}</div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="公示信息" name="second">
            <el-card>
              <div
                v-for="(item, index) in content.publicityList.slice(0, 6)"
                :key="item.newsId"
                class="item"
                @click="goNews(item.newsId)"
              >
                <div class="header-top" v-if="index === 0">
                  <h3>{{item.newsTitle}}</h3>
                  <p>{{item.newsContent}}</p>
                </div>
                <div class="text" v-else>{{item.newsTitle}}</div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="新闻资讯" name="third">
            <el-card>
              <div
                v-for="(item, index) in content.newsList.slice(0, 6)"
                :key="item.newsId"
                class="item"
                @click="goNews(item.newsId)"
              >
                <div class="header-top" v-if="index === 0">
                  <h3>{{item.newsTitle}}</h3>
                  <p>{{item.newsContent}}</p>
                </div>
                <div class="text" v-else>{{item.newsTitle}}</div>
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
            <div
              class="tab-content"
              v-for="item in content.lawList"
              :key="item.lawId"
              @click="goInfo(item.lawId)"
            >
              <div class="tab-left">{{item.lawTitle}}</div>
              <div class="tab-right">{{item.execDate}}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="司法解释">
            <div
              class="tab-content"
              v-for="item in content.judicialList"
              :key="item.lawId"
              @click="goInfo(item.lawId)"
            >
              <div class="tab-left">{{item.lawTitle}}</div>
              <div class="tab-right">{{item.publishDate}}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="国际条约惯例">
            <div
              class="tab-content"
              v-for="item in content.internationalList"
              :key="item.lawId"
              @click="goInfo(item.lawId)"
            >
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
              <div class="serve-content" @click="goLaw('refer')">
                <i class="iconfont iconhtmal"></i>
                <div>在线咨询</div>
              </div>
              <div class="serve-content" @click="goLaw('booking')">
                <i class="iconfont icondate901"></i>
                <div>在线预约</div>
              </div>
              <div class="serve-content" @click="goLaw('exam')">
                <i class="iconfont iconsfks"></i>
                <div>司法考试</div>
              </div>
              <div class="serve-content" @click="goLaw('feedback')">
                <i class="iconfont iconxiaoxi"></i>
                <div>群众批评意见</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-carousel height="120px" style="margin: 10px 0">
      <el-carousel-item v-for="item in content.bannerList2" :key="item.bannerId">
        <a :href="item.linkUrl" target="_blank"><img :src="item.imgPath" /></a>
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="10">
      <el-col :span="16">
        <el-tabs class="new-box" type="card">
          <el-tab-pane label="司法培训">
            <div class="serve-box train-box">
              <div
                class="train-content"
                v-for="item in content.trainList"
                :key="item.couId"
                @click="goVideo(item.planId)"
              >
                <img :src="item.coverUrl" alt />
                <div class="train-title">{{item.trainTitle}}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <a href="http://www.moj.gov.cn/index.html" target="_blank">
          <img src="../../assets/img/csfb.png" class="img-content" alt />
        </a>
        <a href="http://sft.ln.gov.cn/" target="_blank">
          <img src="../../assets/img/sft.png" class="img-content" alt />
        </a>
        <a href="http://www.legalinfo.gov.cn/" target="_blank">
          <img src="../../assets/img/pfw.png" class="img-content" alt />
        </a>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px;background:#fff;border-top: 1px solid #ccc;border-image: linear-gradient(to right, #10a0d3, #1b79c3) 1 10;padding-bottom:20px">
      <el-col :span="16">
        <el-tabs type="card" class="new-box" style="border-top:none;border-image:0">
          <el-tab-pane label="司法地图">
            <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" style='margin-top:20px;height:300px'>
              <bm-marker :position="center" :dragging="true" @click="infoWindowOpen">
                <bm-info-window
                  :show="infoWindow.show"
                  @close="infoWindowClose"
                  @open="infoWindowOpen"
                  :width='100'
                  :height=0
                >
                辽阳市司法局
                </bm-info-window>
              </bm-marker>
            </baidu-map>
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
// import baseMap from '@/components/map'
export default {
  name: "Home",
  components: {
    // baseMap
  },
  data() {
    return {
      activeName: "first",
      activeName1: "first",
      content: {
        bannerList1: [],
        bannerList2: [],
        newsList: [],
        mapList: [],
        noticeList: [],
        trainList: [],
        examLink: {
          linkUrl: "",
          imgId: "",
          imgUrl: ""
        },
        lawList: [],
        judicialList: [],
        publicityList: [],
        internationalList: []
      },
      center: { lng: 0, lat: 0 },
      zoom: 3,
      infoWindow: {
        show: true
      }
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 123.17;
      this.center.lat = 41.27;
      this.zoom = 15;
    },
    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
    },
    getData() {
      this.$ajaxPost("/index/mainData", { request: 123 }).then(({ data }) => {
        if (data.code === 200) {
          this.content = data.content;
        }
      });
    },
    goLaw(type) {
      this.$router.push({ path: "/law", query: { type } });
    },
    goVideo(id) {
      this.$router.push({ path: "/propaganda/video", query: { id } });
    },
    goInfo(id) {
      this.$router.push({ path: "/propaganda/getInfo", query: { id } });
    },
    goNews(newId) {
      this.$router.push({ path: "/government/info", query: { newId } });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="scss">
.bm-view {
  width: 100%;
  height: 300px;
}
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
      // background: #409eff;
    }
  }
  .el-card__body {
    padding: 0;
    .item {
      width: 100%;
      .header-top {
        padding: 10px;
        border-bottom: 1px dashed #ccc;
        cursor: pointer;
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
          white-space: pre-wrap;
        }
      }
      .text {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 20px;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        &:before {
          content: "";
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
    // height: 300px;
    background-color: #fff;
    padding: 15px !important;
    // border-top: 2px solid #449efe;
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
        cursor: pointer;
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
          cursor: pointer;
          i {
            font-size: 36px;
            color: #3ba6d5;
          }
          div {
            padding: 5px 0;
          }
          &:hover {
            background: linear-gradient(to right, #10a0d3, #1b79c3);
            font-weight: 700;
            color: #fff;
            i {
              color: #fff;
            }
          }
        }
      }
      .train-box {
        grid-template-columns: repeat(4, 1fr);
        .train-content {
          height: 100px;
          background-color: #ddd;
          position: relative;
          cursor: pointer;
          > img {
            width: 100%;
            height: 100%;
          }
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
      // border: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-top: 1px solid #ccc;
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
    .map-content:last-child{
      border-bottom: 1px solid #ccc;
    }
  }
}
.content .el-tabs__item.is-active {
  background: linear-gradient(to right, #10a0d3, #1b79c3);
}
.content .el-tabs__header {
  border-bottom: 0 !important;
}
.el-tabs__item {
  background: #f1f1f1;
}
.el-carousel__item {
  img {
    width: 100%;
    height: 100%;
  }
}
.el-carousel__indicators--horizontal {
  left: auto;
  right: 10px;
  bottom: -2px;
  transform: translateX(0);
  .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 1;
  }
  .is-active {
    .el-carousel__button {
      background-color: #3b9dd8;
    }
  }
}
.bannerTitle {
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #00000080;
  padding: 0 10px;
}
.el-carousel--horizontal {
  overflow: hidden;
}
.map-list{
  margin-top: 75px;
}
</style>
