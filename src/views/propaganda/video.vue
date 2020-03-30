<template>
  <div class="video">
    <h2>{{form.couName}}</h2>
    <el-row>
      <el-col :span="16">
        <!-- <video :src="form.playUrl" :poster="form.couCover" style="width:95%;" controls="true"></video> -->
        <!-- <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>-->
        <video
          id="my-player"
          class="video-js vjs-default-skin vjs-big-play-centered"
          controls
          preload="auto"
          autoplay="autoplay"
          :poster="form.couCover"
          width="100%"
          height="400"
        >
          <!-- <source src="rtmp://58.200.131.2:1935/livetv/hunantv" type="rtmp/flv" /> -->
            <source :src="form.playUrl" type="rtmp/mp4" />
            此视频暂无法播放，请稍后再试
        </video>
      </el-col>
      <el-col :span="6">
        <h4>课件信息</h4>
        <p>
          <span>知识范围:</span>
          <span>{{form.knowScope}}</span>
        </p>
        <p>
          <span>内容分类:</span>
          <span>{{form.cate}}</span>
        </p>
        <p>
          <span>视频时长:</span>
          <span>{{form.videoDuration}}</span>
        </p>
        <p>课程简介:</p>
        <p>{{form.cusDesc}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import "videojs-flash";

export default {
  data() {
    return {
      video: "",
      form: {
        couName: "",
        knowScope: "",
        cate: "",
        videoDuration: "",
        content: "",
        video: "",
        cusCover: ""
      },
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "rtmp/flv", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov" //url地址
          }
        ],
        poster: "", //你的封面地址
        // techOrder: ['flash'],
        // techOrder:['flash'],
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created() {},
  mounted() {
    this.getData();
    this.initVideo()
  },
  methods: {
    initVideo() {
      //谷歌浏览器要专门去开启flash播放器，打包后查看和代码运行都需要重新设置flash为允许状态
      // 设置flash路径,用于在videojs发现浏览器不支持HTML5播放器的时候自动唤起flash播放器
      videojs.options.flash.swf =
        "https://cdn.bootcss.com/videojs-swf/5.4.1/video-js.swf";
      this.player = videojs("my-player"); //my-player为页面video元素的id
      this.player.play(); //播放
    },
    getData() {
      let obj = {
        planId: this.$router.currentRoute.query.id
      };
      this.$ajaxPost("/train/getPublicTrainVideo", obj).then(res => {
        this.form = res.data.content;
      });
    }
  }
};
</script>

<style lang='scss'>
.video {
  width: 85%;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
}
#my-player{
  width: 93%;
}
</style>
