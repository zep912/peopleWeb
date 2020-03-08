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
          <el-button type="primary" class="mapBtn">搜索</el-button>
          <div class="maparea">
            <el-dropdown>
              <span class="el-dropdown-link">
                所属区域
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
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
                  :command="item.value"
                >{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="maparea-arrow">
              <i class="el-icon-arrow-up"></i>
            </span>
          </div>
          <ul class="mapUl">
            <li v-for="(item,index) in organList" :key="index">
              <div class>{{item.num}}</div>
              <span>{{item.title}}</span>
            </li>
          </ul>
          <!-- 树形 -->
          <div class="mapTree">
            <div class="mapTreeMain">
              <span>
                <img src="../../assets/img/tree1.png" alt />
                {{main}}
              </span>
              <span>
                数量:
                <span>{{treeNum}}</span>
              </span>
            </div>

            <ul v-show="!organShow">
              <li v-for="(item,index) in organArr" :key="index" @click="organClick(item.id)">
                <span>{{item.title}}</span>
                <i class="el-icon-arrow-right" style="line-height:48px"></i>
              </li>
            </ul>

            <ul v-show="organShow">
              <li v-for="(item,index) in mapTreeList" :key="index" @click="orgClick(item.id)">
                <span>
                  <img src="../../assets/img/tree2.png" alt />
                  {{item.city}}
                </span>
                <span>
                  数量:
                  <span>{{item.num}}</span>
                </span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8" v-show="!boxShow">
          <el-form>
            <el-form-item label="律所名称:">{{form.name}}</el-form-item>
            <el-form-item label="机构代码:">{{form.name}}</el-form-item>
            <el-form-item label="成立时间:">{{form.name}}</el-form-item>
            <el-form-item label="负责人:">{{form.name}}</el-form-item>
            <el-form-item label="注册地址:">{{form.name}}</el-form-item>
            <el-form-item label="手机号码:">{{form.name}}</el-form-item>
            <el-form-item label="律师人数:">{{form.name}}</el-form-item>
            <el-form-item label="律所简介:">{{form.name}}</el-form-item>
            <el-form-item label="照片:">
              <img :src="item.img" alt v-for="(item,index) in form.imgList" :key="index" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16">
          <baseMap></baseMap>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import baseMap from "@/components/map";
export default {
  components: {
    baseMap
  },
  data() {
    return {
      form: {
        orgName: "",
        orgType: ""
      },
      boxShow: true,
      organShow: true,
      input1: "",
      main: "辽阳市",
      treeNum: 100,
      center: {
        lng: "116.404",
        lat: "39.915"
      },
      zoom: 3,
      orgList: [
        {
          value: "1",
          label: "律师事务所"
        },
        {
          value: "2",
          label: "法律援助中心"
        },
        {
          value: "3",
          label: "调委组织"
        },
        {
          value: "4",
          label: "司法鉴定"
        },
        {
          value: "5",
          label: "公证处"
        },
        {
          value: "6",
          label: "基层法律事务所"
        }
      ],
      mapTreeList: [
        {
          city: "宏伟区",
          num: 100
        },
        {
          city: "宏伟区",
          num: 100
        },
        {
          city: "宏伟区",
          num: 100
        },
        {
          city: "宏伟区",
          num: 100
        }
      ],
      organArr: [
        {
          title: "辽阳市灯塔市法律援助中心",
          id: "1"
        },
        {
          title: "辽阳市灯塔市法律援助中心",
          id: "1"
        },
        {
          title: "辽阳市灯塔市法律援助中心",
          id: "1"
        },
        {
          title: "辽阳市灯塔市法律援助中心",
          id: "1"
        }
      ],
      organList: [
        {
          num: 100,
          title: "全部"
        },
        {
          num: 100,
          title: "律师事务所"
        },
        {
          num: 100,
          title: "法律援助中心"
        },
        {
          num: 100,
          title: "调委组织"
        },
        {
          num: 100,
          title: "司法鉴定"
        },
        {
          num: 100,
          title: "公证处"
        },
        {
          num: 100,
          title: "基层法律服务所"
        }
      ],
      lawCommand:0,
      pageform: {
        pageSize:10,
        pageNum: 1,
        total: 0
      },
    };
  },
  mounted() {
    this.getLawList()
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    orgClick(id) {
      console.log(id);
      this.organShow = !this.organShow;
    },
    handleCommand(n) {
      this.lawCommand = n,
      this.getLawList()
    },
    organClick(id) {
      console.log(id);
      this.boxShow = !this.boxShow;
    },
    getLawList() {
      
      let obj = {
        token:this.$store.state.token,
        orgType: this.lawCommand, //类型：String  可有字段  备注：机构类型 1.律师事务所；2.法律援助中心；3.调委组织；4.司法鉴定；5.公证处；6.基层法律服务所；
        orgName: this.form.orgName, //类型：String  可有字段  备注：名称
        areaRegionId: "", //类型：String  可有字段  备注：所属区ID
        areaStreetId: "", //类型：String  可有字段  备注：所属街道ID
        pageNum: this.pageform.pageNum,
        pageSize: this.pageform.pageSize
      };
      this.$ajaxPost('/lawOrg/getLawOrgList',obj).then(res=>{
        console.log(res)
      })
    }
  }
};
</script>

<style lang='scss'>
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
