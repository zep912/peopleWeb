<template>
  <div id="map">
    <div class="mapBox" id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  prop:{
    center:''
  },
  created() {},
  mounted() {
    let timer = this.$nextTick(() => {
      setTimeout(() => {
        this.getMap();
      }, 500);
    });
    console.log(this.center)
  },
  methods: {
    getMap() {
      var map = new BMapGL.Map("container");
      map.centerAndZoom(new BMapGL.Point(this.center.lng, this.center.lat), 19); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.setHeading(64.5);
      map.setTilt(73);
    }
  }
};
</script>

<style>
#map {
  width: 100%;
}
.mapBox {
  height: 800px;
  width: 100%;
}
</style>