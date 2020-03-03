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
        <li v-for="(item,index) in list" :key="index" @click="lawerClick(item.id)">
          <div class="lawerImg">
            <img src alt />
            <div class="lawerInfo">
              <h3>
                {{item.name}}律师
                <span>(执业{{item.year}}年)</span>
              </h3>
              <p>电话：<span>{{item.mobile}}</span></p>
              <p><span>擅长专业：</span><span>{{item.content}}</span></p>
            </div>
          </div>
          <div class="lawerExcu">
            <div>
              <p>{{item.ConsultationVolume}}</p>
              <p>咨询量</p>
            </div>
            <div>
              <p>{{item.ServiceTimes}}</p>
              <p>服务次数</p>
            </div>
            <div>
              <p>{{item.SatisfactionDegree}}</p>
              <p>满意度</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footPage">
      <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 10000,
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
      list:[
        {
          name:'小小',
          year:1,
          mobile:'123456789',
          content:'知识产权，房产纠纷，劳动争议，债权债务，婚姻 家庭',
          ConsultationVolume:100,
          ServiceTimes:1000,
          SatisfactionDegree:5.4,
          id:2
        },
        {
          name:'小小',
          year:1,
          mobile:'123456789',
          content:'知识产权，房产纠纷，劳动争议，债权债务，婚姻 家庭',
          ConsultationVolume:100,
          ServiceTimes:1000,
          SatisfactionDegree:5.4,
          id:2
        },
        {
          name:'小小',
          year:1,
          mobile:'123456789',
          content:'知识产权，房产纠纷，劳动争议，债权债务，婚姻 家庭',
          ConsultationVolume:100,
          ServiceTimes:1000,
          SatisfactionDegree:5.4,
          id:2
        },
        {
          name:'小小',
          year:1,
          mobile:'123456789',
          content:'知识产权，房产纠纷，劳动争议，债权债务，婚姻 家庭',
          ConsultationVolume:100,
          ServiceTimes:1000,
          SatisfactionDegree:5.4,
          id:2
        },
        {
          name:'小小',
          year:1,
          mobile:'123456789',
          content:'知识产权，房产纠纷，劳动争议，债权债务，婚姻 家庭',
          ConsultationVolume:100,
          ServiceTimes:1000,
          SatisfactionDegree:5.4,
          id:2
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    lawerClick(id){
      console.log(id)
      this.$router.push({path:'/lawer/lawerInfo',query:{id:id}})
    }
  }
};
</script>

<style lang='scss'>
.footPage{
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
  ul{
    overflow: hidden;
  }
  ul li {
    width: 32%;
    background: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding-top: 20px;
    float: left;
    margin-right: 1%;
    margin-bottom: 1%;
    // padding-left: 20px;
  }
  ul li:nth-of-type(3n){
    margin-right: 0;
  }
  .lawerImg {
    overflow: hidden;
    img{
      width: 110px;
      height: 130px;
      margin-right: 10px;
      float: left;
    }
    .lawerInfo{
      box-sizing: border-box;
      float: left;
      width: 65%;
      p:nth-of-type(1){
        margin-bottom: 10px;
      }
      p:nth-of-type(2){
        span{
          float: left;
        }
        span:nth-of-type(2){
          width: 65%
        }
      }
      h3{
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
        span{
          font-weight: normal;
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }
  }
  .lawerExcu{
    overflow: hidden;
    // height: 40px;
    background: #e8f4fa;
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    div{
      float: left;
      width: 33%;
      text-align: center;
      p:nth-of-type(1){
        font-weight: 600;
        font-size: 16px;
      }
    }
    div:nth-of-type(2){
      border-right: 1px solid #ccc;
      border-left:1px solid #ccc
    }
  }
}
</style>