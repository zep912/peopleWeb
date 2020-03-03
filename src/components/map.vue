<template>
  <div class="maps">
    <baidu-map
      class="bm-view"
      ak="u6vzTey4WMBeVAbC3SokRMGT3br2sejy"
      :center="center"
      :zoom="zoom"
      @ready="handler"
    ></baidu-map>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  components: {
    BaiduMap
  },
  data() {
    return {
      center: {
        lng: "116.404",
        lat: "39.915"
      },
      zoom: 3
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    }
  }
};
</script>

<style>
</style>