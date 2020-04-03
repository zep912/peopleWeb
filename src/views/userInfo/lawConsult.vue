<template>
  <div class="userConsult">
    <div class="consultHead">
      <div class="stepTitle">
        <span v-for='(item,index) in form.flowAxis' :key='index'>[{{item.taskName}}]</span>
      </div>
      <el-steps :active="2" align-center :space="200">
        <el-step :title="item.disposeName" v-for='(item,index) in form.flowAxis' :key='index' :description='item.disposeTime.substring(0,10)' ></el-step>
      </el-steps>
    </div>
    <div style="width:100%;height:20px;"></div>
    <div class="userConsultContent">
      <!-- 免费咨询 -->
      <div class="freeConsult consultBox" style="margin-top:0">
        <h3>{{title}}</h3>
        <div class="freeBox borderTop">
          <el-form :model="form" label-width="110px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请人:">{{form.applyData.applyName!=null?form.applyData.applyName:''}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号:">{{form.applyData.idNumber?form.applyData.idNumber:''}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="单位或住址:">{{form.applyData.applyAddress?form.applyData.applyAddress:''}}</el-form-item>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="手机号码:">{{form.applyData.applyPhone?form.applyData.applyPhone:''}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预约时间:">{{form.applyData.appointmentDate}} {{form.applyData.appointmentTime}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='8'>
                  <el-form-item label="事项类型:">{{form.applyData.matterType}}</el-form-item>
              </el-col>
              <el-col :span='8'>
                  <el-form-item label="身份类别:">{{form.applyData.identityType?form.applyData.identityType:''}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="案情及申请理由">
                <el-input type="textarea" :rows="4" v-model="form.applyData.applyReason"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="证明材料:">
                <div>
                  <img :src="form.applyData.lawOrg.orgImg" alt />
                  <!-- <div>
                    <h4>{{form.applyData.lawOrg.orgName}}</h4>
                    <p>
                      <span>联系电话:</span>
                      <span>{{form.applyData.lawOrg.orgTelephone}}</span>
                    </p>
                    <p>
                      <span>联系地址:</span>
                      <span>{{form.applyData.lawOrg.orgAddress}}</span>
                    </p>
                  </div> -->
                </div>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </div>
      <!-- 调委会响应 -->
      <!-- <div class="lawerAnswer consultBox">
        <h3>调委会响应</h3>
        <div class="lawerAnwserBox borderTop">
          <el-form label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="响应结果:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">同意</el-radio>
                    <el-radio :label="2">不同意</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="指派调委会:">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-form-item label="意见建议:">
                <div></div>
                <el-input type="textarea" :rows="5"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </div> -->
      <!-- 调委会响应 -->
      <!-- <div class="seclectLawer consultBox">
        <h3>调委会响应</h3>
        <div class="borderTop">
          <div class="lawForm">
            <el-form :model="form" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="响应结果:">
                    <el-radio-group v-model="radio">
                      <el-radio :label="1">同意</el-radio>
                      <el-radio :label="2">不同意</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="指派人员:">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-form-item label="意见建议:">
                  <div></div>
                  <el-input type="textarea" :rows="5"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </div>
      </div> -->
    </div>
    <!-- <div class="consultBtn">
      <el-button class="save">提交</el-button>
      <el-button class="quit">取消</el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{
          
      
      },
      radio: 1,
      proposal: "",
      lawerList: [],
      formList: [],
      applyId: "",
      total:0,
      resultList:[],
      title:''
    };
  },
  created() {},
  mounted() {
    this.applyId = this.$router.currentRoute.query.applyId;
    this.getData()
    this.title = this.$router.currentRoute.query.title;
  },
  methods: {
      getDict() {
      let obj = {
        dictCode: "jiufenleixing",
        parentDictDataCode: "",
        userId: "111"
      };
      this.$ajaxPost("/support/getDictionaryList", obj).then(res => {
        this.resultList = res.data.content.resultList;
      });

    },
      getData(){
          let obj = {
              token:this.$store.state.token,
              applyId:this.applyId
          };
          this.$ajaxPost('/appointment/getLawAidDetail',obj).then(res =>{
            this.form = res.data.content
            console.log(this.form)
              // this.form.applyData = res.data.content.applyData;
          })
      }
  }
};
</script>

<style lang='scss'>
::-webkit-scrollbar {
  display: none;
}
.consultHead {
  background: #fff;
  text-align: left;
  padding-top: 20px;
  padding-bottom: 10px;
  overflow: hidden;
  .stepTitle {
    width:412px;
    display: flex;
    justify-content: space-between;
    span {
      width: 200px;
      display: inline-block;
      text-align: center;
    }
  }
  .el-steps {
    margin-top: 20px;
    position: relative;
    // float: left;
  }
  .el-step__icon:nth-of-type(1)::before {
    width: 5%;
    height: 1px;
    background: #ccc;
    display: inline-block;
    vertical-align: middle;
  }
}
.consultBtn {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
  .el-button {
    width: 120px;
    height: 44px;
  }
  .question {
    background: #33cc66;
    color: #fff;
  }
  .save {
    background: linear-gradient(to right, #009ccc, #0071cc);
    color: #fff;
  }
}
.userConsult {
  width: 85%;
  margin: 0 auto;
}
.userConsultContent {
  overflow-y: auto;
  // height: 800px;
  h3 {
    width: 220px;
    height: 44px;
    background: linear-gradient(to right, #00a0cc, #006dcc);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
    color: #fff;
  }
  .freeConsult {
    box-sizing: box-sizing;
  }
  .borderTop {
    border-top: 1px solid #006dcc;
    background: #fff;
    padding: 20px;
    padding-right: 50px;
    padding-left: 30px;
    box-sizing: border-box;
  }
  .consultBox {
    margin-top: 20px;
    box-sizing: border-box;
  }
}
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
