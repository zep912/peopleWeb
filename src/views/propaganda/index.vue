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
          <img src="../../assets/img/pic1.png" alt class="propaImg" />
          <img src="../../assets/img/pic2.png" alt class="propaImg" />
          <img src="../../assets/img/pic3.png" alt class="propaImg" />
        </el-col>
        <el-col :span="15">
          <div class="lawArt" v-show="isShow">
            <div class="lawTitle">
              <span class="lawTitles">{{navTitle}}</span>
              <span>
                共计：
                <span>{{num}}</span>篇
              </span>
            </div>
            <ul class="lawUl">
              <li v-for="(item,index) in list" :key="index" @click="lawClick(item,id)">
                <span class="lawTitle">{{item.lawTitle}}</span>
                <span class="time">{{item.execDate}}</span>
              </li>
            </ul>
            <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
          </div>
          <Judicial v-show="!isShow"></Judicial>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Judicial from "./judicial";
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
      page: {
        pageSize: 10,
        pageNum: 1
      }
    };
  },
  created() {},
  mounted() {
    this.navClick({ name: "法律法规" }, 0);
    this.active = 0;
  },
  methods: {
    lawClick(n, id) {
      console.log(n, id);
    },
    navClick(n, type, index) {
      this.active = index;
      if (type != 4) {
        this.isShow = true;
        this.navTitle = n.name;
        let obj = {
          token: "64d1d05f5ccb4670a6d342f3b3c002ce",
          scopeLevel: "",
          lawTimeliness: "",
          lawTitle: "",
          docType: type,
          ...this.page
        };
        this.$ajaxPost("/doc/lawRegulations/getLawRegulationsList", obj).then(
          res => {
            this.list = res.data.content.dataList;
            this.total = res.data.content.pageInfo.total;
            this.num = this.total
          }
        );
      } else {
        this.isShow = false;
        return;
      }
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
.propa_wrap .el-col li:nth-of-type(3) {
  border-bottom: 1px solid #ccc;
}
</style>
