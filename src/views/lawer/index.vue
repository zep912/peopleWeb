<template>
  <div class="lawer">
    <div class="lawForm">
      <el-form :model="form" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="所属区域:">
              <el-select v-model="form.area" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="2">
            <el-form-item label="擅长专业:">
              <el-select v-model="form.area" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="2">
            <el-form-item label="关键字:">
              <el-input placeholder="输入查找的关键字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1" style="margin-top:-3px">
            <el-button class="formBtn" size="medium">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 选择 -->
    <div class="lawSec">
      <div class="lawSecFour">
        <el-dropdown>
          <span class="el-dropdown-link">
            咨询量
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            满意度
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            接案率
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            结案率
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="lawTotal">
        <span>共计：</span>
        <span>{{total}}个</span>
      </div>
    </div>
    <!-- 律师信息 -->
    <div class="lawerList">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="lawerClick(item.lawyerId)">
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
                <span>{{item.content}}</span>
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
    </div>
    <div class="footPage">
      <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: "",
      list: [],
      page:{
        pageSize:10,
        pageNum:1
      }
    };
  },
  created() {},
  mounted() {
    this.getData()
  },
  methods: {
    lawerClick(id) {
      this.$router.push({ path: "/lawer/lawerInfo", query: { id: id } });
    },
    getData() {
      let obj = {
        areaRegionId: "",
        areaRegionList: [{
            areaRegionId: "102030"
          }
        ],
        adeptSpecialty: "2",
        adeptSpecialtyList: [
          {
            adeptSpecialty: "1"
          }
        ],
        keyWord: "",
        sortModel: "1", //类型：String  可有字段  备注：排序主体 1：咨询量；2：满意度；3：接案率；4：结案率
        sortType: "1", //类型：String  可有字段  备注：排序方式 1：由高到低(默认)；2：由低到高；
        ...this.page
      };
      this.$ajaxPost('/lawyer/getValidLawyerList',obj).then(res=>{
        const dataList = res.data.content.dataList;
        for (let i = 0; i < 10; i++) {
          this.list = this.list.concat(dataList);
        }
        this.total = res.data.content.pageInfo.total
      })
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
    }
    .lawTotal {
      float: right;
    }
  }
}
.lawerList {
  padding-bottom: 20px;
  ul {
    overflow: hidden;
  }
  ul li {
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
  ul li:nth-of-type(3n) {
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
</style>
