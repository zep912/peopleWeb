<template>
  <div class="propa" id="propaga">
    <div class="propa_wrap">
      <el-row>
        <el-col :span="8">
          <ul class="propaUl">
            <li
              v-for="(item,index) in navList"
              :key="index"
              @click="navClick(item,item.docType,index)"
              :class="{active:active==index}"
            >
              <i class="el-icon-arrow-right"></i>
              <span>{{item.name}}</span>
            </li>
          </ul>
          <a href="http://search.chinalaw.gov.cn/" target="_blank"><img src="../../assets/img/pic1.png" alt class="propaImg" /></a>
          <a href="http://search.chinalaw.gov.cn/search2.html" target="_blank"><img src="../../assets/img/pic2.png" alt class="propaImg" /></a>
          <a href="javascript:void(0)"><img src="../../assets/img/pic3.png" alt class="propaImg" /></a>

        </el-col>
        <el-col :span="15">
          <div class="lawArt" v-show="isShow">
            <div class="lawTitle">
              <span class="lawTitles">{{navTitle}}</span>
              <span>
                共计：
                <span>{{pageform.total}}</span>篇
              </span>
            </div>
            <ul class="lawUl">
              <li v-for="(item,index) in list" :key="index" @click="lawClick(item.lawId)">
                <span class="lawTitle">{{item.lawTitle}}</span>
                <span class="time">{{item.execDate}}</span>
              </li>
            </ul>
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageform.pageNum"
              :page-size="pageform.pageSize"
              layout="total, prev, pager, next"
              :total="pageform.total"
            >></el-pagination>
          </div>
          <Judicial v-show="!isShow" ref='children'></Judicial>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Judicial from "./judicial";
import util from "@/assets/js/util.js";
export default {
  components: {
    Judicial
  },
  data() {
    return {
      active: 0,
      isShow: true,
      total: 0,
      navList: [
        {
          name: "法律法规",
          docType: 1
        },
        {
          name: "司法解释",
          docType: 2
        },
        {
          name: "国际条约惯例",
          docType: 3
        },
        {
          name: "司法培训",
          docType: 4
        }
      ],
      activeName: "1",
      tabPosition: "left",
      num: 0,
      list: [],
      navTitle: "法律法规",
      pageform: {
        pageSize:10,
        pageNum: 1,
        total: 0
      },
      types:'',
      proIndex:'',
      pageNum:1
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageform.pageNum = val;
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageform.pageNum = val;
      this.active = this.proIndex
      this.getData()
    },
    lawClick(id) {
      this.$router.push({ path: "/propaganda/getInfo", query: { id } });
    },
    setBreadcrumbList(name) {
      const breadcrumbList = this.$store.state.breadcrumbList;
      if (breadcrumbList.length < 3) {
        breadcrumbList.push({path: '/propaganda', name});
      } else {
        breadcrumbList.splice(2, breadcrumbList.length - 2, {path: '/propaganda', name});
      }
      this.$store.commit('breadcrumbList', breadcrumbList);
    },
    navClick(n, type, index) {
      this.types = type;
      this.proIndex = index;
      this.active = index;
      this.setBreadcrumbList(n.name);
      this.pageform.pageNum=1;
      if (type != 4) {
        this.isShow = true;
        this.navTitle = n.name;
        this.getData()
      } else {
        this.isShow = false;
        this.$refs.children.pageform.pageNum=1;
        return;
      }
    },
    getData(){
      let obj = {
          scopeLevel: "",
          lawTimeliness: "",
          lawTitle: "",
          docType: this.types,
          pageNum: this.pageform.pageNum,
          pageSize: this.pageform.pageSize
        };
        this.$ajaxPost("/doc/lawRegulations/getLawRegulationsList", obj).then(
          res => {
            this.list = res.data.content.dataList;
            this.pageform.total = res.data.content.pageInfo.total;
          }
        );
    }
  },
  // 路由周期，离开页面，跳转其他页面时，根据nextRoute判断是否需要缓存查询条件
  beforeRouteLeave(to, from, next) {
    const nextRoute = ['/propaganda/getInfo'];
    console.log(to, 'to.name');
    if (nextRoute.indexOf(to.path) > -1) {
      util.setSearchCache({ to, from, next }, { toPath: to.path, pagePath: '/propaganda', request: { active: this.active, navTitle: this.navTitle, types: this.types, pageform: this.pageform }})
    }
    next()
  },
  // 路由周期，进入周期页面，根据nextRoute判断是否需要缓存查询条件
  beforeRouteEnter(to, from, next) {
    const nextRoute = ['/propaganda/getInfo'];
    if (nextRoute.indexOf(from.path) > -1) {
      next(vm => {
        const request = util.getSearchCache({ to, from, next }, { fromPath: from.path, pagePath: '/propaganda' });
        vm.active = request ? request.active : vm.active;
        vm.navTitle = request ? request.navTitle : vm.navTitle;
        vm.types = request ? request.types : vm.types;
        vm.pageform = request ? request.pageform : vm.pageform;
        vm.getData()
      })
    } else {
      next(vm => {
        vm.navClick({ name: "法律法规" }, 1);
        vm.active = 0;
      })
    }
  }
};
</script>

<style lang='scss' scope>
.lawTitle {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  width: 80%;
  display: inline-block;
}
.lawArt {
  padding: 20px;
  background: #fff;
  margin-left: 20px;
  // border-top: 1px solid #0ea5d5;
  border-top: 1px solid #ccc;
  border-image:linear-gradient(to right,#10a0d3,#1b79c3) 1 10;
  .lawTitles {

    display: inline-block;
    width: 150px;
    height: 40px;
    background: linear-gradient(to right, #10a0d3, #1b79c3);
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    margin-right: 30px;
    color: #fff;
  }
  .lawUl {
    margin-top: 10px;
    margin-bottom: 20px;
    li {
      height: 50px;
      width: 100%;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      list-style: none;
    }
    li span:nth-of-type(1)::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #000;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .el-pagination {
    text-align: right;
  }
}
.propa {
  width: 85%;
  margin: 0 auto;
}
.propa_wrap {
  margin-top: 20px;
}
.propa_wrap .el-col .propaUl li {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  color: #000;
  box-sizing: border-box;
  padding-left: 15px;
  background: #fff;
  cursor: pointer;
  i {
    margin-right: 10px;
  }
}
.propa_wrap .propaImg {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.propa_wrap .el-col img:nth-of-type(2) {
  margin-top: 0;
  margin-bottom: 0;
}
#propaga .active {
  background: linear-gradient(to right, #0ea4d5, #1c78c2);
  color: #fff;
  font-weight: 600;
}
.propa_wrap .propaUl li:nth-of-type(2) {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.propa_wrap .propaUl li:nth-of-type(3) {
  border-bottom: 1px solid #ccc;
}
</style>
