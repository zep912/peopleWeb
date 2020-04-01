<template>
  <div class="video">
    <h2>{{form.couName}}</h2>
    <el-row>
      <el-col :span="16" style="height:400px">
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
          :poster="poster"
          width="100%"
          height="400"
          data-setup='{"html5" : { "nativeTextTracks" : false }}'
          v-if="videoShow"
          ref="myVideo"
        >
          <!-- <source src='rtmp://59.44.27.201:9035/sfjvod/train/20200330/dae641baf26044c2a34078038bf8ad18.mp4' type='rtmp/mp4'> -->
          <source :src="playUrl" type="rtmp/mp4" />此视频暂无法播放，请稍后再试
        </video>
      </el-col>
      <el-col :span="6" class="kejian">
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
        <p><span>课程简介:</span></p>
        <p class="cusDesc">{{form.cusDesc}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 视频页面，后台返回的视频地址是直播地址，以rtmp开头的，使用video标签是不能播放的
// 下载了video.js,vue-video-player，videojs-flash这3个插件，实现播放rtmp视频
// 其中下载vue-video-player这个插件，主要是使用这个插件的样式，因此引入其样式
//
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
      playUrl: "",
      poster: "",
      videoShow: false
      // player: ""
    };
  },
  created() {},
  mounted() {
    this.getData();
    this.initVideo();
  },
  watch: {
    $route() {
      this.$destroy(this.player);
    }
  },
  methods: {
    initVideo() {
      this.videoShow = true
      //谷歌浏览器要专门去开启flash播放器，打包后查看和代码运行都需要重新设置flash为允许状态
      // 设置flash路径,用于在videojs发现浏览器不支持HTML5播放器的时候自动唤起flash播放器
      videojs.options.flash.swf =
        "https://cdn.bootcss.com/videojs-swf/5.4.1/video-js.swf";
      // 原本在这里初始化视频，但是有个bug，如果是请求过来的数据，视频地址是有了，但并不会播放
      this.player = videojs("my-player"); //my-player为页面video元素的id
      // this.player.src({
      //   src: this.playUrl,
      //   type: "rtmp/mp4"
      // });
      this.player.play(); //播放
    },
    getData() {
      let obj = {
        planId: this.$router.currentRoute.query.id
      };
      this.$ajaxPost("/train/getPublicTrainVideo", obj).then(res => {
        this.form = res.data.content;
        this.poster = this.form.couCover;
        // 手动添加视频地址到src中
        this.playUrl = this.form.playUrl;
        // my-player为页面video元素的id，videoPlayer是videojs的实例
        const videoPlayer = videojs("my-player");
        //
        videoPlayer.src({
          src: this.playUrl,
          type: "rtmp/mp4"
        });
        videoPlayer.play();
      });
    },

    destroyVideo() {
      if (this.player != null) {
        this.player.dispose();
        this.player = null;
      }
    },
    beforeDestroy() {
      this.$refs.myVideo.destroyVideo();
    },
    beforeRouteLeave() {
      this.videoShow = false;
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
  height: 400px;
}
.kejian{
  h4{
    color: #1b79c3;
    margin-bottom: 10px;
  }
  p{
    line-height: 28px;
  }
  p span:nth-of-type(1){
    color: #999;
    margin-right: 10px;
  }
  .cusDesc{
    line-height: 24px;
    text-indent: 1em;
    
  }
}
</style>
