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
                <span>{{num}}</span>篇
              </span>
            </div>
            <ul class="lawUl">
              <li v-for="(item,index) in list" :key="index" @click="lawClick(item,id)">
                <span>{{item.newsTitle}}</span>
                <span class="time">{{item.publishTime}}</span>
              </li>
            </ul>
            <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
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
      page: {
        pageSize: 10,
        pageNum: 1
      },
      total:0
    };
  },
  created() {},
  mounted() {
    this.navClick({ name: "组织机构" }, 0,1);
  },
  methods: {
    lawClick(n, id) {
      console.log(n, id);
    },
    navClick(n,index,type) {
      this.active = index;
      this.navTitle = n.name;
        let obj = {
          token: "64d1d05f5ccb4670a6d342f3b3c002ce", //类型：String  可有字段  备注：token 用户身份标识
          newsType: type, //类型：String  必有字段  备注：资讯类型 1：组织机构；2：公示信息；3：通知公告；4：新闻资讯；5：办事指南；6：征求意见；7：政务公开
          ...this.page
        };
        this.$ajaxPost("/doc/news/getOpenNewsList", obj).then(res => {
          console.log(res);
          this.list = res.data.content.dataList;
          this.num = res.data.content.pageInfo.total;
          this.total = this.num;
        });
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
  border-top: 1px solid #0ea5d5;
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
