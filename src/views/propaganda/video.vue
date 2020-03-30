<template>
  <div class="video">
    <h2>{{form.couName}}</h2>
    <el-row>
      <el-col :span="16">
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
          autoplay
          :poster="form.couCover"
          width="100%"
          height="400"
          data-setup='{"html5" : { "nativeTextTracks" : false }}'
        >
          <!-- <source src='rtmp://59.44.27.201:9035/sfjvod/train/20200330/dae641baf26044c2a34078038bf8ad18.mp4' type='rtmp/mp4'> -->
          <source :src="playUrl" type="rtmp/mp4" />此视频暂无法播放，请稍后再试
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
        cusCover: "",
        playUrl: ""
      },
      playUrl: ""
    };
  },
  created() {},
  mounted() {
    this.getData();
    this.initVideo();
  },
  methods: {
    initVideo() {
      //谷歌浏览器要专门去开启flash播放器，打包后查看和代码运行都需要重新设置flash为允许状态
      // 设置flash路径,用于在videojs发现浏览器不支持HTML5播放器的时候自动唤起flash播放器
      videojs.options.flash.swf =
        "https://cdn.bootcss.com/videojs-swf/5.4.1/video-js.swf";
      // this.player = videojs("my-player"); //my-player为页面video元素的id
      // this.player.play(); //播放
    },
    getData() {
      let obj = {
        planId: this.$router.currentRoute.query.id
      };
      this.$ajaxPost("/train/getPublicTrainVideo", obj).then(res => {
        this.form = res.data.content;
          this.playUrl = this.form.playUrl;
          const videoPlayer = videojs('my-player');
          videoPlayer.src({
            src:this.playUrl,
            type:'rtmp/mp4'
          })
          videoPlayer.play()
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
#my-player {
  width: 93%;
}
</style>
