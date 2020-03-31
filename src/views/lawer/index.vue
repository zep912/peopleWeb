<template>
  <div class="lawer" id="lawer">
    <div class="lawForm">
      <el-form :model="lawyerRequest" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="所属区域">
              <el-select v-model="lawyerRequest.areaRegionId" placeholder="请选择">
                <el-option
                  v-for="item in areaRegionList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item label="擅长专业">
              <el-select v-model="lawyerRequest.adeptSpecialty" placeholder="请选择">
                <el-option
                  v-for="item in adeptSpecialtyList"
                  :key="item.dictDataCode"
                  :label="item.dictDataName"
                  :value="item.dictDataCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item label="关键字">
              <el-input placeholder="输入查找的关键字" v-model="lawyerRequest.keyWord"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1" style="margin-top:-3px">
            <el-button class="formBtn" size="medium" @click="search">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 选择 -->
    <div class="lawSec">
      <div class="lawSecFour">
        <span :class="setClass('1')" @click="searchSort('1')">
          咨询量
          <i class="el-icon-caret-bottom"></i>
        </span>
        <span :class="setClass('2')" @click="searchSort('2')">
          满意度
          <i class="el-icon-caret-bottom"></i>
        </span>
        <span :class="setClass('3')" @click="searchSort('3')">
          接案率
          <i class="el-icon-caret-bottom"></i>
        </span>
        <span :class="setClass('4')" @click="searchSort('4')">
          结案率
          <i class="el-icon-caret-bottom"></i>
        </span>
      </div>
      <div class="lawTotal">
        <span>共计：</span>
        <span>{{lawyerRequest.total}}个</span>
      </div>
    </div>
    <!-- 律师信息 -->
    <div class="lawerList">
      <ul class="lawerUl">
        <li v-for="(item,index) in lawList" :key="index" @click="lawerClick(item)">
          <div class="lawerImg">
            <img :src="item.photoUrl" alt />
            <div class="lawerInfo">
              <h3>
                {{item.lawyerName}}律师
                <span>(执业{{item.operationYears}}年)</span>
              </h3>
              <p>
                电话：
                <span>{{item.lawyerPhone}}</span>
              </p>
              <p>
                <span>擅长专业：</span>
                <span class="shanchang">{{item.adeptSpecialtys}}</span>
              </p>
            </div>
          </div>
          <div class="lawerExcu">
            <div>
              <p>{{item.serviceData.consultAmount}}</p>
              <p>咨询量</p>
            </div>
            <div>
              <p>{{item.serviceData.serviceAmount}}</p>
              <p>服务次数</p>
            </div>
            <div>
              <p>{{item.serviceData.satisfaction.toFixed(2)}}</p>
              <p>满意度</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="footPage">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="lawyerRequest.pageNum"
          :page-size="lawyerRequest.pageSize"
          layout="total, prev, pager, next"
          :total="lawyerRequest.total"
        >></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      form: {
        area: ""
      },
      value: "",
      list: [],
      areaRegionList: [],
      lawyerRequest: {
        pageNum: 1,
        pageSize: 12,
        total: 0,
        keyWord: "",
        sortModel: "1",
        sortType: "1"
      },
      lawList: [],
      adeptSpecialtyList: []
    };
  },
  created() {},
  mounted() {
    this.getValidLawyerList();
    this.getAreaList();
    this.getDictionaryList("shanchangzhuanye", "adeptSpecialtyList", true);
  },
  methods: {
    // 律师列表分页操作,pagesize改变时的
    handleSizeChange(val) {
      this.lawyerRequest.pageNum = val;
      this.getValidLawyerList();
    },
    // 分页操作触发，点击每页改变时触发
    handleCurrentChange(val) {
      console.log(999)
      this.lawyerRequest.pageNum = val;
      this.getValidLawyerList();
    },
    // 搜索查询列表的事件
    search() {
      this.lawyerRequest.pageNum = 1;
      this.getValidLawyerList();
    },
    // 字典表，查询擅长专业的list并手动添加全部选项
    getDictionaryList(dictCode, typeName, flag) {
      this.$ajaxPost("/support/getDictionaryList", {
        dictCode,
        userId: "1"
      }).then(({ data }) => {
        if (data.code == 200) {
          const defaultArr = flag
            ? [{ dictDataCode: "", dictDataName: "全部" }]
            : [];
          this[typeName] = defaultArr.concat(data.content.resultList);
        }
      });
    },
    // 查询律师列表中咨询量等的操作，动态添加class属性
    setClass(sortModel) {
      return {
        active: this.lawyerRequest.sortModel === sortModel,
        "sort-bottom":
          this.lawyerRequest.sortModel === sortModel &&
          this.lawyerRequest.sortType === "2"
      };
    },
    // 咨询量，满意度，接案率等的事件操作，同时改变律师的list
    searchSort(sortModel) {
      if (this.lawyerRequest.sortModel === sortModel) {
        this.lawyerRequest.sortType =
          this.lawyerRequest.sortType === "1" ? "2" : "1";
      } else {
        this.lawyerRequest.sortModel = sortModel;
        this.lawyerRequest.sortType = "1";
      }
      this.getValidLawyerList();
    },
    // 律师列表初始化，查询所有律师列表并分页
    getValidLawyerList() {
      this.$ajaxPost("/lawyer/getValidLawyerList", this.lawyerRequest).then(
        res => {
          const dataList = res.data.content.dataList;
          this.lawList = dataList;
          this.lawyerRequest.total = res.data.content.pageInfo.total;
        }
      );
    },
    // 搜索条件中所属区域的list，全部选项需要手动添加，同时使用数组reduce方法对数组进行过滤
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
    },
    // 点击每个律师，跳转到对应律师详细信息
    lawerClick(item) {
      this.$store.commit('lawyerItem', item);
      this.$router.push({ path: "/listLaywer/info", query: {id: item.lawyerId} });
    }
  }
};
</script>

<style lang='scss'>
.footPage {
  text-align: right;
  padding-bottom: 10px;
}
.lawer {
  width: 85%;
  margin: 0 auto;
  overflow: hidden;
  .lawer-menu {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .lawForm {
    padding-top: 22px;
    border: 1px solid #119dd2;
    background: #fff;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .formBtn {
    background: linear-gradient(to right, #109ed2, #1a7bc3);
    color: #fff;
    width: 90px;
    height: 40px;
    // margin-top: -10px;
  }
  .el-dropdown {
    margin-right: 30px;
  }
  .lawSec {
    margin-top: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    .lawSecFour {
      float: left;
      user-select: none;
      span {
        display: inline-block;
        padding: 0 10px 0 20px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        cursor: pointer;
        &.active {
          color: #1982c6;
        }
        &.sort-bottom {
          i {
            transform: rotate(180deg);
          }
        }
      }
    }
    .lawTotal {
      height: 30px;
      line-height: 30px;
      float: right;
    }
  }
}
.lawerList {
  padding-bottom: 20px;
  .lawerUl {
    overflow: hidden;
  }
  .lawerUl li {
    width: 33%;
    background: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding-top: 20px;
    float: left;
    margin-right: 0.5%;
    margin-bottom: 0.5%;
    font-size: 14px;
  }
  .lawerUl li:nth-of-type(3n) {
    margin-right: 0;
  }
  .lawerImg {
    overflow: hidden;
    display: flex;
    img {
      width: 110px;
      height: 130px;
      margin-right: 10px;
      margin-left: 15px;
    }
    .lawerInfo {
      box-sizing: border-box;
      width: 65%;
      position: relative;
      p:nth-of-type(1) {
        margin-bottom: 10px;
      }
      p:nth-of-type(2) {
        span {
          float: left;
        }
        span:nth-of-type(2) {
          width: 65%;
        }
      }
      h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
        span {
          font-weight: normal;
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }
  }
  .lawerExcu {
    overflow: hidden;
    // height: 40px;
    background: #e8f4fa;
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    div {
      float: left;
      width: 33%;
      text-align: center;
      p:nth-of-type(1) {
        font-weight: 600;
        font-size: 16px;
      }
    }
    div:nth-of-type(2) {
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
  }
}
#lawer .active {
  background: linear-gradient(to right, #0ea4d5, #1c78c2);
  color: #fff;
  font-weight: 600;
}
.shanchang{
  height: 40px;
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3; //需要控制的文本行数
overflow: hidden;
}
</style>
