<template>
  <div class="lawerInfos">
    <div class="lawerInfoTop">
      <img :src="form.baseInfo.photoUrl?form.baseInfo.photoUrl:''" alt />
      <div class="lawerList">
        <div class="lawerInfobox">
          <h3>
            {{form.lawyerName}}律师
            <span>(执业{{form.baseInfo.operationYears}}年)</span>
          </h3>
          <p>
            电话：
            <span>{{form.baseInfo.lawyerPhone}}</span>
          </p>
          <p>
            <span>擅长专业：</span>
            <span>{{form.baseInfo.adeptSpecialtys}}</span>
          </p>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress">
        <div class="progressBox">
          <p>咨询量</p>
          <el-progress type="circle" :percentage="10" :stroke-width=20 color="#0da9d7"></el-progress>
        </div>
        <div class="progressBox">
          <p>满意度</p>
          <el-progress type="circle" :percentage="form.evaluationResult.satisfaction" :stroke-width=20 color="#66cccc"></el-progress>
        </div>
        <div class="progressBox">
          <p>接案率</p>
          <el-progress type="circle" :percentage="form.evaluationResult.acceptRate" :stroke-width=20 color="#ff9933"></el-progress>
        </div>
        <div class="progressBox">
          <p>结案率</p>
          <el-progress type="circle" :percentage="form.evaluationResult.settleRate" :stroke-width=20 color="#ff6060"></el-progress>
        </div>
      </div>
      <div class="wx">
        <img src="../../assets/img/wx.png" alt />
        <p>微信扫码，及时咨询</p>
      </div>
    </div>

    <div class="lawerMsg">
      <el-button class="lawerMsg-btn">针对性咨询</el-button>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form :model="form" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名:">{{form.baseInfo.lawerName}}</el-form-item>
                <el-form-item label="性别:">{{form.baseInfo.sexDesc}}</el-form-item>
                <el-form-item label="居住地址:">{{form.baseInfo.fullAreaAddres}}</el-form-item>
                <el-form-item label="政治面貌:">{{form.baseInfo.politicsStatusDesc}}</el-form-item>
                <el-form-item label="学历:">{{form.baseInfo.educationCertificationDesc}}</el-form-item>
                <el-form-item label="专业:">{{form.baseInfo.major}}</el-form-item>
                <el-form-item label="执行类别:">{{form.baseInfo.professionTypeDesc}}</el-form-item>
                <el-form-item label="资格证类型:">{{form.baseInfo.certificationTypeDesc}}</el-form-item>
                <el-form-item label="首次执业:">{{form.baseInfo.firstOperation}}</el-form-item>
                <el-form-item label="执业机构:">{{form.baseInfo.orgName}}</el-form-item>
                <el-form-item label="人员类型:">{{form.baseInfo.lawerName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执业证书:">{{form.baseInfo.credentialCode}}</el-form-item>
                <el-form-item label="出生日期:">{{form.baseInfo.birthdayDesc}}</el-form-item>
                <el-form-item label></el-form-item>
                <el-form-item label="民族:">{{form.baseInfo.nationCodeDesc}}</el-form-item>
                <el-form-item label="学位:">{{form.baseInfo.degreeDesc}}</el-form-item>
                <el-form-item label="人事档案:">{{form.baseInfo.lawyerRecord}}</el-form-item>
                <el-form-item label></el-form-item>
                <el-form-item label="资格证号">{{form.baseInfo.certificationCode}}</el-form-item>
                <el-form-item label="现职称:">{{form.baseInfo.professionTitle}}</el-form-item>
                <el-form-item label="进所时间:">{{form.baseInfo.joinTimeDesc}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="诚信信息:">
                <el-table :data="form.faithList" style="width: 100%" border>
                  <el-table-column prop="date" label="序号" width="180"></el-table-column>
                  <el-table-column prop="awardName" label="授予机构" width="180"></el-table-column>
                  <el-table-column prop="awardDate" label="授予日期"></el-table-column>
                  <el-table-column prop="awardContent" label="授予内容"></el-table-column>
                  <el-table-column prop="commendLevel" label="表彰级别"></el-table-column>
                </el-table>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="失信信息"></el-form-item>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="服务记录" name="second">
          <el-table :data="form.faithList" style="width: 100%" border>
            <el-table-column prop="date" label="序号" width="80"></el-table-column>
            <el-table-column prop="name" label="服务类型" width="180"></el-table-column>
            <el-table-column prop="address" label="服务人员"></el-table-column>
            <el-table-column prop="address" label="时间"></el-table-column>
            <el-table-column prop="address" label="状态"></el-table-column>
            <el-table-column prop="address" label="满意度"></el-table-column>
            <el-table-column prop="address" label="服务评价"></el-table-column>
          </el-table>
          <div class="page">
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        year: 0,
        mobile: "",
        content: "知识产权，房产纠纷，劳动争议，债权债务，婚姻 家庭",
        id: 2
      },
      activeName: "first",
      tableData: [
        {
          date: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      id:''
    };
  },
  created() {},
  mounted() {
    console.log(this.$router)
    this.id = this.$router.currentRoute.query.id;
    this.getLawerInfo()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getLawerInfo(){
      let obj = {
        lawyerId:this.id
      }
      this.$ajaxPost('/lawyer/getValidLawyerInfo',obj).then(res=>{
        this.form = res.data.content
      })
    }
  }
};
</script>

<style lang='scss'>
.page {
  text-align: right;
  margin-top: 20px;
}
.lawerMsg {
  background: #fff;
  margin-top: 20px;
  padding: 20px;
  position: relative;
}
.lawerInfos {
  width: 85%;
  margin: 0 auto;
  border-top: 1px solid #1885c8;
  .lawerInfoTop {
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding-top: 20px;
    padding-left: 30px;
    overflow: hidden;
    padding-bottom: 20px;
    img {
      float: left;
      margin-right: 20px;
    }
  }
}
.lawerList {
  padding-bottom: 20px;
  float: left;
  .lawerInfobox {
    box-sizing: border-box;
    float: left;
    p:nth-of-type(1) {
      margin-bottom: 10px;
    }
    p:nth-of-type(2) {
      overflow: hidden;
      span {
        float: left;
      }
    }
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #158ccb;
      span {
        font-weight: normal;
        font-size: 14px;
        margin-left: 5px;
        color: #333;
      }
    }
  }
}
.progress {
  float: left;
  overflow: hidden;
  margin-left: 80px;
  margin-top: 30px;
  .progressBox {
    float: left;
    margin-right: 20px;
    text-align: center;
    p {
      margin-bottom: 10px;
    }
  }
}
.el-progress-circle {
  width: 70px !important;
  height: 70px !important;
}
.wx {
  float: left;
  margin-left: 30px;
  text-align: center;
  img {
    width: 130px;
    height: 130px;
    margin-bottom: 10px;
  }
}
.lawerMsg-btn{
  position: absolute;
  right: 22px;
  top: 10px;
  width: 120px;
  height: 44px;
  background: linear-gradient(to right,#10a1d4,#1b7bc3);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.lawerMsg .el-tabs__item{
  border: none
}
.lawerMsg .is-active{
  background: #10a1d4;
  color: #fff
}
.lawerMsg .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border: 0
}
</style>