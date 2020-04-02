<template>
  <div class="propa" id="propaga">
    <div class="propa_wrap">
      <el-row>
        <el-col :span="8">
          <ul class="propaUl">
            <li
              v-for="(item,index) in navList"
              :key="index"
              @click="navClick(item,index,item.index)"
              :class="{active:active==index}"
            >
              <i class="el-icon-arrow-right"></i>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="15">
          <div class="lawArt">
            <div class="lawTitle">
              <span class="lawTitles">{{navTitle}}</span>
              <span>
                共计：
                <span>{{pageform.total}}</span>篇
              </span>
            </div>
            <ul class="lawUl">
              <li v-for="(item,index) in list" :key="index" @click="lawClick(item.newsId)">
                <span class="newsTitle" :title="item.newsTitle">{{item.newsTitle}}</span>
                <span class="time">{{item.publishTime}}</span>
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import util from "@/assets/js/util.js";
export default {
  data() {
    return {
      active: 0,
      isShow: true,
      navList: [
        {
          name: "组织机构",
          index: 1
        },
        {
          name: "公示信息",
          index: 2
        },
        {
          name: "通知公告",
          index: 3
        },
        {
          name: "新闻资讯",
          index: 4
        },
        {
          name: "办事指南",
          index: 5
        },
        {
          name: "征求意见",
          index: 6
        }
      ],
      activeName: "1",
      tabPosition: "left",
      num: "1000",
      list: [],
      navTitle: "组织机构",
      pageform: {
        pageSize:10,
        pageNum: 1,
        total: 0
      },
      types:'',
      proIndex:''
    };
  },
  methods: {
    // 通过列表跳转到对应的文章页面
    lawClick(newId) {
      this.$router.push({path:'/government/info',query:{newId}})
    },
    // 改变pagesize触发的分页方法
    handleSizeChange(val) {
      this.pageform.pageNum = val;
      this.getData()
    },
    // 点击分页的每个页码触发的分页方法，同时请求数据初始化
    handleCurrentChange(val) {
      this.pageform.pageNum = val;
      this.active = this.proIndex
      this.getData()
    },
    // 返回上一页回到当时点击的状态的方法
    // 通过vuex来保存数据，通过判断路由来设置面包屑导航的数据。
    setBreadcrumbList(name) {
      const breadcrumbList = this.$store.state.breadcrumbList;
      if (breadcrumbList.length < 3) {
        breadcrumbList.push({path: '/government', name});
      } else {
        breadcrumbList.splice(2, breadcrumbList.length - 2, {path: '/government', name});
      }
      this.$store.commit('breadcrumbList', breadcrumbList);
    },
    // 点击左侧导航改变右侧数据内容
    navClick(n,index,type) {
      this.active = index;
      this.navTitle = n.name;
      this.setBreadcrumbList(n.name);
      this.types = type;//左侧导航的标识，1,2,3,4...请求数据
      this.proIndex = index//改变左侧点击的状态值。active
      this.pageform.pageNum=1;
      this.getData()
    },
    // 初始化右侧列表数据
    getData(){
      let obj = {
          newsType: this.types, //类型：String  必有字段  备注：资讯类型 1：组织机构；2：公示信息；3：通知公告；4：新闻资讯；5：办事指南；6：征求意见；7：政务公开
          pageNum: this.pageform.pageNum,
          pageSize: this.pageform.pageSize
        };
        this.$ajaxPost("/doc/news/getOpenNewsList", obj).then(res => {
          this.list = res.data.content.dataList;
          this.pageform.total = res.data.content.pageInfo.total;
        });
    }
  },
  // 路由周期，离开页面，跳转其他页面时，根据nextRoute判断是否需要缓存查询条件
  beforeRouteLeave(to, from, next) {
    const nextRoute = ['/government/info'];
    console.log(to, 'to.name');
    if (nextRoute.indexOf(to.path) > -1) {
      util.setSearchCache({ to, from, next }, { toPath: to.path, pagePath: '/government', request: { active: this.active, navTitle: this.navTitle, types: this.types, pageform: this.pageform }})
    }
    next()
  },
  // 路由周期，进入周期页面，根据nextRoute判断是否需要缓存查询条件
  beforeRouteEnter(to, from, next) {
    const nextRoute = ['/government/info'];
    if (nextRoute.indexOf(from.path) > -1) {
      next(vm => {
        const request = util.getSearchCache({ to, from, next }, { fromPath: from.path, pagePath: '/government' });
        console.log(request, 'request12333');
        vm.active = request ? request.active : vm.active;
        vm.navTitle = request ? request.navTitle : vm.navTitle;
        vm.types = request ? request.types : vm.types;
        vm.pageform = request ? request.pageform : vm.pageform;
        vm.getData()
      })
    } else {
      next(vm => {
        vm.navClick({ name: "组织机构" }, 0,1);
      })
    }
  }
};
</script>

<style lang='scss' scope>
.menu {
  margin-top: 20px;
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
    li span:nth-of-type(1){
      display: inline-block;
      width: 80%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      word-break: break-all;
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
.propa_wrap .el-col li:nth-of-type(2) {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.propa_wrap .el-col li:nth-of-type(3),
.propa_wrap .el-col li:nth-of-type(4),
.propa_wrap .el-col li:nth-of-type(5) {
  border-bottom: 1px solid #ccc;
}
</style>
