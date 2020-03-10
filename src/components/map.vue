<template>
  <div class="maps">
    <baidu-map
      class="bm-view"
      ak="u6vzTey4WMBeVAbC3SokRMGT3br2sejy"
      :center="center"
      :zoom="zoom"
      @ready="handler"
    >
    <!-- <my-overlay
      :position="{lng: 116.404, lat: 39.915}"
      :text="item.name"
      :active="active"
      @mouseover.native="active = true"
      @mouseleave.native="active = false"
      v-for='(item,index) in list' :key=index>
    </my-overlay> -->
    </baidu-map>
  </div>
</template>

<script>
// import MyOverlay from '/myOverlay'
export default {
  components: {
    // MyOverlay
  },
  data() {
    return {
      center: {
        lng: "123.17",
        lat: "41.27"
      },
      zoom: 3,
      show:false,
      list:[
        {
          lanlng:'{lng: 123.15, lat: 41.27}',
          name:'问好',
        }
      ]
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 123.17;
      this.center.lat =41.27 ;
      this.zoom = 15;
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    }
  }
};
</script>

<style>
</style>