<template>
  <div class="map">
    <div class="mapbox">
      <el-row>
        <el-col :span="8" v-show="boxShow">
          <el-input
            placeholder="请输入想要搜索机构名称"
            v-model="form.orgName"
            prefix-icon="el-icon-search"
            style="width:75%"
          ></el-input>
          <el-button type="primary" class="mapBtn" @click="search">搜索</el-button>
          <div class="maparea">
            <el-dropdown @command="handleAreaCommand">
              <span class="el-dropdown-link">
                所属区域
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in areaRegionList"
                  :key="item.areaId"
                  :command="item.areaId"
                >{{item.areaName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                机构类别
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in orgList"
                  :key="index"
                  :command="item.dictDataCode"
                >{{item.dictDataName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="maparea-arrow">
              <i class="el-icon-arrow-up"></i>
            </span>
          </div>
          <ul class="mapUl">
            <li v-for="(item,index) in organList" :key="index">
              <div
                :class="{active:active==index}"
                @click="orgListClick(item.orgType,index)"
              >{{item.orgCount||item.orgCunt}}</div>
              <span>{{item.allOrg||item.orgName}}</span>
            </li>
          </ul>
          <!-- 树形 -->
          <div class="mapTree">
            <div class="mapTreeMain">
              <span>
                <img src="../../assets/img/tree1.png" alt />
                {{mapTreeList[0]?mapTreeList[0].areaRegionName:''}}
              </span>
              <span>
                数量:
                <span>{{mapTreeList[0]?mapTreeList[0].areaOrgCount:''}}</span>
              </span>
            </div>

            <ul v-show="!organShow">
              <li
                v-for="(item,index) in lawOrgList"
                :key="index"
                @click="organClick(item.lawOrgId)"
              >
                <span>{{item.orgName}}</span>
                <i class="el-icon-arrow-right" style="line-height:48px"></i>
              </li>
            </ul>

            <ul v-show="organShow">
              <li
                v-for="(item,index) in organArr"
                :key="index"
                @click="orgClick(item.areaRegionId)"
              >
                <span>
                  <img src="../../assets/img/tree2.png" alt />
                  {{item.areaRegionName?item.areaRegionName:''}}
                </span>
                <span>
                  数量:
                  <span>{{item.areaOrgCount}}</span>
                </span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8" v-show="!boxShow">
          <el-form :model="formItem">
            <el-form-item label="律所名称:">{{formItem.orgName}}</el-form-item>
            <el-form-item label="机构代码:">{{formItem.orgCode}}</el-form-item>
            <el-form-item label="成立时间:">{{formItem.year}}</el-form-item>
            <el-form-item label="负责人:">{{formItem.orgPrincipalName}}</el-form-item>
            <el-form-item label="注册地址:">{{formItem.orgFullAddress}}</el-form-item>
            <el-form-item label="手机号码:">{{formItem.orgTelephone}}</el-form-item>
            <el-form-item label="律师人数:">{{formItem.personTotal}}</el-form-item>
            <el-form-item label="律所简介:">{{formItem.orgDesc}}</el-form-item>
            <el-form-item label="照片:">
              <img :src="item.img" alt v-for="(item,index) in form.orgImgList" :key="index" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16">
          <baidu-map
            class="bm-view"
            ak="u6vzTey4WMBeVAbC3SokRMGT3br2sejy"
            :center="center"
            :zoom="zoom"
            @ready="handler"
            mapType="BMAP_NORMAL_MAP"
            anchor="BMAP_ANCHOR_TOP_RIGHT"
            :scroll-wheel-zoom=true
            :double-click-zoom=false
          >
            <my-overlay
              :position="{lng: item.lng, lat: item.lat}"
              :text="item.areaRegionName+'('+item.areaOrgCount+')'"
              :active="active"
              :info="item"
              :lawMsg = item.lawMsg
              @mouseover.native="actives = true"
              @mouseleave.native="actives = false"
              v-for="(item,index) in mapList"
              :key="index"
              v-show='orgListShow'
            ></my-overlay>
            <my-overlay
              :position="{lng: item.lng, lat: item.lat}"
              :text="item.areaRegionName"
              :active="active"
              :info="item"
              :lawMsg = item.lawMsg
              @mouseover.native="actives = true"
              @mouseleave.native="actives = false"
              v-for="(item,index) in mapList"
              :key="'info'+index"
              v-show="lawOrgListShow"
            ></my-overlay>
          </baidu-map>
          <!-- <myMap :center='center'></myMap> -->
          <!-- <div class="mapBox" id="container"></div> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import MyOverlay from "@/components/myOverlay";
// import myMap from "@/components/map";
export default {
  components: {
    MyOverlay,
    // myMap
  },
  data() {
    return {
      orgListShow:true,
      lawOrgListShow:false,
      formItem: {
        orgName: "",
        orgCode: "",
        year: "",
        orgPrincipalName: "",
        orgFullAddress: "",
        orgTelephone: "",
        personTotal: "",
        orgDesc: ""
      },
      mapList: [],
      active: 0,
      form: {
        orgName: "",
        orgType: "",
        areaRegionId: ""
      },
      boxShow: true,
      organShow: true,
      input1: "",
      main: "辽阳市",
      treeNum: 100,
      orgList: [],
      mapTreeList: [],
      organArr: [],
      organList: [],
      lawCommand: "",
      pageform: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      areaRegionList: [],
      lawOrgList: [],
      center: {
        lng: "123.17",
        lat: "41.27"
      },
      zoom: 3,
      show: false
    };
  },
  mounted() {
    this.getLawList();
    this.getOrgList();
    this.getAreaList();
    this.getFaYuan();
    // let timer = this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.getMap();
    //   }, 500);
    // });
  },
  methods: {
    // getMap() {
    //   var map = new BMapGL.Map("container");
    //   var point = new BMapGL.Point(this.center.lng, this.center.lat);
    //   map.centerAndZoom(point, 13); // 初始化地图,设置中心点坐标和地图级别
    //   map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    //   map.setHeading(64.5);
    //   map.setTilt(73);
    //   var opts = {
    //     position: point, // 指定文本标注所在的地理位置
    //     offset: new BMapGL.Size(30, -30) //设置文本偏移量
    //   };
    //   var label = new BMapGL.Label("欢迎使用百度地图JSAPI WebGL版本", opts); // 创建文本标注对象
    //   label.setStyle({
    //     color: "red",
    //     fontSize: "12px",
    //     height: "20px",
    //     lineHeight: "20px",
    //     fontFamily: "微软雅黑"
    //   });
    //   map.addOverlay(label);
    // },
    getFaYuan() {
      let obj = {
        dictCode: "fayuanjigou",
        parentDictDataCode: "",
        userId: "111"
      };
      this.$ajaxPost("/support/getDictionaryList", obj).then(res => {
        this.orgList = res.data.content.resultList;
      });
    },

    // handler({ BMap, map }) {
    handler() {
      // console.log(BMap, map);
      this.center.lng = 123.17;
      this.center.lat = 41.27;
      this.zoom = 15;
    },
    orgListClick(n, index) {
      this.form.orgType = n || "";
      this.active = index;
      this.getOrgList();
    },
    search() {
      this.getOrgList();
    },
    orgClick(id) {
      this.form.areaRegionId = id;
      this.organShow = !this.organShow;
      this.getLawList();
    },
    handleCommand(n) {
      this.form.orgType = n;
      this.getOrgList();
    },
    handleAreaCommand(id) {
      this.form.areaRegionId = id;
      this.getOrgList();
    },
    organClick(id) {
      this.mapList = [];
      this.boxShow = !this.boxShow;
      let obj = {
        token: this.$store.state.token,
        lawOrgId: id
      };
      this.$ajaxPost("/lawOrg/getLawOrgInfo", obj).then(res => {
        this.formItem = res.data.content;
        let obj = {};
        obj.areaRegionName = this.formItem.orgName;
        obj.lng = this.formItem.areaX;
        obj.lat = this.formItem.areaY;
        obj.credentialCode = this.formItem.credentialCode;
        obj.orgTelephone = this.formItem.orgTelephone;
        obj.orgFullAddress = this.formItem.orgFullAddress;
        obj.orgImg = this.formItem.orgImgList[0]
        obj.lawMsg = false;
        obj.infoMsg =true
        this.mapList.push(obj);
        this.center = {
          lng: this.mapList[0].lng,
          lat: this.mapList[0].lat
        };
        this.zoom = 8;
        // console.log(this.mapList,888)
      });
    },
    getLawList() {
      let obj = {
        token: this.$store.state.token,
        ...this.form,
        areaStreetId: "", //类型：String  可有字段  备注：所属街道ID
        pageNum: this.pageform.pageNum,
        pageSize: this.pageform.pageSize
      };
      this.$ajaxPost("/lawOrg/getLawOrgList", obj).then(res => {
        this.lawOrgList = res.data.content.dataList;
      });

      this.mapList = [];
      this.lawOrgList.forEach(el => {
        let lawObj = {};
        lawObj.lng = el.areaX;
        lawObj.lat = el.areaY;
        lawObj.areaRegionName = el.orgName;
        lawObj.lawMsg = false
        lawObj.infoMsg =false
        this.mapList.push(lawObj);
      });
      this.orgListShow = false;
      this.lawOrgListShow = true;
    },
    getOrgList() {
      let obj = {
        token: this.$store.state.token,
        ...this.form
      };
      this.$ajaxPost("/lawOrg/getOrgCollectData", obj).then(res => {
        this.organList = res.data.content.collectData.orgList;
        this.mapTreeList = res.data.content.areaOrgList;
        this.organArr = this.mapTreeList.slice(0);
        this.organArr = this.organArr.slice(1);
        this.mapList = this.organArr;
        this.mapList.forEach(el => {
          el.lng = el.areaCoordinate.split(",")[0];
          el.lat = el.areaCoordinate.split(",")[1];
          el.lawMsg = true
          el.infoMsg = false
        });
      });
    },
    getAreaList() {
      this.$ajaxPost("/support/getAreaList", { areaLevel: "3" }).then(
        ({ data }) => {
          if (data.code === 200) {
            this.areaRegionList = [{ areaId: "", areaName: "全部" }].concat(
              data.content.dataList.reduce((res, item) => {
                if (!res.some(val => val.areaId === item.areaId)) {
                  item.leaf = item.areaLevel === "4";
                  res.push(item);
                }
                return res;
              }, [])
            );
          }
        }
      );
    }
  }
};
</script>

<style lang='scss'>
#container {
  width: 100%;
  height: 800px;
}
.mapTree {
  margin-top: 20px;
  .mapTreeMain {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 48px;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 3px;
    padding-right: 10px;
    img {
      vertical-align: middle;
      margin-right: 8px;
    }
    span:nth-of-type(1) {
      color: #158ccb;
    }
    span:nth-of-type(2) {
      span {
        margin-left: 20px;
        color: #158ccb;
        font-weight: 600;
      }
    }
  }
  ul {
    li {
      height: 48px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      padding-left: 20px;
      padding-right: 10px;
      line-height: 48px;
      display: flex;
      justify-content: space-between;
      span:nth-of-type(1) {
        color: #158ccb;
      }
      span:nth-of-type(2) {
        span {
          margin-left: 20px;
          color: #158ccb;
          font-weight: 600;
        }
      }
    }
  }
}
.mapbox {
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
}
.mapBtn {
  margin-left: 10px;
  background: linear-gradient(to right, #109ed3, #1a7fc5);
}
.mapUl {
  overflow: hidden;
  .active {
    background: linear-gradient(to right, #109ed3, #1a7fc5);
    color: #fff;
  }
  li:last-of-type {
    margin-right: 0;
  }
  li {
    width: 19%;
    float: left;
    // margin-right: 5px;
    text-align: center;
    margin-top: 10px;
    div {
      width: 60px;
      height: 60px;
      background: #e9eef3;
      text-align: center;
      line-height: 60px;
      font-size: 18px;
      margin: 0 auto;
      color: #158ccb;
      font-weight: 600;
      border-radius: 5px;
      margin-bottom: 5px;
    }
    span {
      font-size: 12px;
    }
  }
}
.map {
  width: 85%;
  margin: 0 auto;
}
.bm-view {
  width: 100%;
  height: 800px;
}
.maparea {
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  .el-dropdown {
    width: 42%;
    text-align: center;
    box-sizing: border-box;
  }
  .el-dropdown:nth-of-type(1),
  .el-dropdown:nth-of-type(2) {
    border-right: 1px solid #ccc;
  }
  .maparea-arrow {
    display: inline-block;
    width: 10%;
    text-align: center;
  }
}
</style>
