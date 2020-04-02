<template>
  <div class="lawerInfos">
    <div class="lawerInfoTop">
      <img :src="form.baseInfo?form.baseInfo.photoUrl:''" alt class="photo" />
      <div class="lawerList">
        <div class="lawerInfobox">
          <h3>
            {{form.baseInfo.lawyerName}}律师
            <span>(执业{{form.baseInfo?form.baseInfo.operationYears:''}}年)</span>
          </h3>
          <p>
            电话：
            <span>{{form.baseInfo?form.baseInfo.lawyerPhone:''}}</span>
          </p>
          <p>
            <span>擅长专业：</span>
            <span>{{form.baseInfo?form.baseInfo.adeptSpecialtys:''}}</span>
          </p>
        </div>
      </div>
      <div class="wx">
        <img src="../../assets/img/wx.png" alt />
        <p>微信扫码，及时咨询</p>
      </div>
      <!-- 进度条 -->
      <div class="progress">
        <div class="progressBox">
          <p>咨询量</p>
          <p
            style="margin-top:37px"
          >{{form.evaluationResult?form.evaluationResult.consultAmount:''}}</p>
          <!-- <el-progress type="circle" :percentage="10" :stroke-width=20 color="#0da9d7"></el-progress> -->
        </div>
        <div class="progressBox">
          <p>满意度</p>
          <el-progress
            type="circle"
            :percentage="form.evaluationResult?form.evaluationResult.satisfaction:0"
            :stroke-width="20"
            color="#66cccc"
          ></el-progress>
        </div>
        <div class="progressBox">
          <p>接案率</p>
          <el-progress
            type="circle"
            :percentage="form.evaluationResult?form.evaluationResult.acceptRate:0"
            :stroke-width="20"
            color="#ff9933"
          ></el-progress>
        </div>
        <div class="progressBox">
          <p>结案率</p>
          <el-progress
            type="circle"
            :percentage="form.evaluationResult?form.evaluationResult.settleRate:0"
            :stroke-width="20"
            color="#ff6060"
          ></el-progress>
        </div>
      </div>
    </div>

    <div class="lawerMsg">
      <el-button type="primary" class="lawerMsg-btn" @click="focusComment">针对性咨询</el-button>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本信息" name="first">
          <el-form :model="form" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名:">{{form.baseInfo?form.baseInfo.lawyerName:''}}</el-form-item>
                <el-form-item label="性别:">{{form.baseInfo?form.baseInfo.sexDesc:''}}</el-form-item>
                <el-form-item label="居住地址:">{{form.baseInfo?form.baseInfo.fullAreaAddres:''}}</el-form-item>
                <el-form-item label="政治面貌:">{{form.baseInfo?form.baseInfo.politicsStatusDesc:''}}</el-form-item>
                <el-form-item
                  label="学历:"
                >{{form.baseInfo?form.baseInfo.educationCertificationDesc:''}}</el-form-item>
                <el-form-item label="专业:">{{form.baseInfo?form.baseInfo.major:''}}</el-form-item>
                <el-form-item label="执行类别:">{{form.baseInfo?form.baseInfo.professionTypeDesc:''}}</el-form-item>
                <el-form-item
                  label="资格证类型:"
                >{{form.baseInfo?form.baseInfo.certificationTypeDesc:''}}</el-form-item>
                <el-form-item label="首次执业:">{{form.baseInfo?form.baseInfo.firstOperation:''}}</el-form-item>
                <el-form-item label="执业机构:">{{form.baseInfo?form.baseInfo.orgName:''}}</el-form-item>
                <!-- <el-form-item label="人员类型:">{{form.baseInfo.lawerName}}</el-form-item> -->
              </el-col>
              <el-col :span="12">
                <el-form-item label="执业证书:">{{form.baseInfo?form.baseInfo.credentialCode:''}}</el-form-item>
                <el-form-item label="出生日期:">{{form.baseInfo?form.baseInfo.birthdayDesc:''}}</el-form-item>
                <el-form-item label></el-form-item>
                <el-form-item label="民族:">{{form.baseInfo?form.baseInfo.nationCodeDesc:''}}</el-form-item>
                <el-form-item label="学位:">{{form.baseInfo?form.baseInfo.degreeDesc:''}}</el-form-item>
                <el-form-item label="人事档案:">{{form.baseInfo?form.baseInfo.lawyerRecord:''}}</el-form-item>
                <el-form-item label></el-form-item>
                <el-form-item label="资格证号">{{form.baseInfo?form.baseInfo.certificationCode:''}}</el-form-item>
                <el-form-item label="现职称:">{{form.baseInfo?form.baseInfo.professionTitle:''}}</el-form-item>
                <el-form-item label="进所时间:">{{form.baseInfo?form.baseInfo.joinTimeDesc:''}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="诚信信息:">
                <el-table :data="form.faithList" style="width: 100%" border>
                  <el-table-column type="index" label="序号" width="180"></el-table-column>
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
          <el-table :data="formItem.consultByLawerList" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="consultType" label="服务类型" width="180"></el-table-column>
            <el-table-column prop="consultPhone" label="服务人员"></el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
            <el-table-column prop="consultStatus" label="状态">
              <template slot-scope="scope">
                <p>{{consultStatus(scope.row.consultStatus)}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="satisfaction" label="满意度"></el-table-column>
            <el-table-column prop="evaResult" label="服务评价"></el-table-column>
          </el-table>
          <div class="page">
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
        baseInfo: {},
        faithList: []
      },
      formItem:{
        consultByLawerList: [],
      },
      activeName: "first",
      tableData: [],
      page: {
        pageSize: 10,
        pageNum: 1
      },
      pageform: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    };
  },
  created() {},
  mounted() {
    this.getLawerInfo();
    this.getConsultByLawyer();
  },
  methods: {
    // 分页改变pagesize时触发的方法
    handleSizeChange(val) {
      this.pageform.pageNum = val;
      this.getConsultByLawyer();
    },
    // 点击分页每一个页码，触发的方法，同时初始化数据
    handleCurrentChange(val) {
      this.pageform.pageNum = val;
      this.getConsultByLawyer();
    },
    // 律师详情的数据，保存律师详情为了跳转到针对性咨询页面
    getLawerInfo() {
      let obj = {
        lawyerId: this.$route.query.id
      };
      this.$ajaxPost("/lawyer/getValidLawyerInfo", obj).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.content;
          const breadcrumbList = this.$store.state.breadcrumbList;
          // 点击返回键，返回到对应的律师信息下，通过vuex的方法保存律师信息。通过判断路由，来设置面包屑导航
          if (breadcrumbList[breadcrumbList.length - 1].path !== '/listLaywer/info') {
            breadcrumbList.push({path: '/listLaywer/info', name: `${this.form.baseInfo.lawyerName}律师详情`});
            this.$store.commit('breadcrumbList', breadcrumbList);
          }
        }
      });
    },
    // 服务记录的数据
    getConsultByLawyer() {
      let _this = this;
      let obj = {
        lawyerId: _this.$route.query.id,
        ..._this.pageform
      };

      _this.$ajaxPost("/consult/getConsultByLawyer", obj).then(res => {
        _this.formItem.consultByLawerList = res.data.content.dataList;
        _this.pageform.total = res.data.content.pageInfo.total;
      });
    },
    // 此方法为了判断服务记录中状态值
    consultStatus(n) {
      switch (n) {
        case 1:
          return "待确认";
        case 2:
          return "解答中";
        case 3:
          return "待评价";
        case 4:
          return "已评价";
        case 5:
          return "律师拒绝";
      }
    },
    // 针对性咨询跳转页面，跳转的页面通过状态，id去匹配到底是哪个tab选项，哪个律师
    focusComment() {
      this.$store.commit("refer", {
        consultType: "2",
        lawyerId: this.$route.query.id
      });
      this.$router.push({ path: "/law" });
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
  z-index: 999;
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
    .photo {
      float: left;
      margin-right: 20px;
      width: 200px;
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
.wx {
  float: right;
  margin-right: 130px;
  text-align: center;
  img {
    width: 130px;
    height: 130px;
    margin-bottom: 10px;
  }
}
.progress {
  float: right;
  overflow: hidden;
  margin-right: 110px;
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

.lawerMsg-btn {
  position: absolute;
  right: 22px;
  top: 10px;
  cursor: pointer;
  z-index: 99;
}
.lawerMsg .el-tabs__item {
  border: none;
}
.lawerMsg .is-active {
  background: #10a1d4;
  color: #fff;
}
.lawerMsg .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 0;
}
</style>
