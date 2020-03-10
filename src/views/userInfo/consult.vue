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
      <!-- 我的咨询问题 -->
      <div class="freeConsult consultBox" style="margin-top:0">
        <h3>{{$route.query.isPay ? '针对咨询' : '免费咨询'}}</h3>
        <div class="freeBox borderTop">
          <el-form :model="form" label-width="80px">
            <el-row>
              <el-form-item label="标题:">{{form.consultInfo.questionTitle}}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="问题类型:">{{form.consultInfo.questionType}}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="问题描述:">
                <el-input type="textarea" :rows="6" disabled v-model="form.consultInfo.questionDesc"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名:">{{}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机号码:">{{form.consultInfo.personPhone}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="住址:">{{}}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="照片:">
                <img :src="item" alt v-for="(item,index) in imgList" :key="index" />
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </div>
      <!-- 律师确认 -->
      <div class="lawerAnswer consultBox" v-if="$route.query.isPay">
        <h3>律师确认</h3>
        <div class="lawerAnwserBox borderTop">
          <el-form label-width="80px">
            <el-form-item label="确认结果:">{{consultStatusEnum[form.consultInfo.consultStatus - 1]}}</el-form-item>
            <el-row v-if="form.consultInfo.consultStatus < 5">
              <el-col :span="12">
                <el-form-item label="答复方式:">{{form.consultAnswer.answerModel == '1' ? '即时答复' : '指定咨询时间'}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="咨询时间:">{{form.consultInfo.createTime}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="律师解答:">
                  <el-input type="textarea" disabled v-model="form.consultAnswer.answerContent" :rows="10"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <!-- 选择咨询律师 -->
      <div class="seclectLawer consultBox" v-if="$route.query.isPay && $route.query.status > 4">
        <h3>选择咨询律师</h3>
        <div class="borderTop">
          <div class="lawForm">
            <el-form :model="form" label-width="80px">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="所属区域:">
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
                <el-col :span="5" :offset="2">
                  <el-form-item label="擅长专业:">
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
                <el-col :span="5" :offset="2">
                  <el-form-item label="关键字:">
                    <el-input placeholder="输入查找的关键字" v-model="lawyerRequest.keyWord"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" style="margin-top:-3px">
                  <el-button class="formBtn" size="medium" type="primary" @click="search">搜索</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!-- 选择咨询律师 -->
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
            <ul>
              <li v-for="(item,index) in lawList" :key="index">
                <div class="lawerImg">
                  <img :src="item.photoUrl" alt />
                  <div class="lawerInfo">
                    <p class="lawerTitle">
                      {{item.lawyerName}}律师
                      <span>(执业{{item.operationYears}}年)</span>
                    </p>
                    <div class="info-right" @click="payRefer(item)">
                      <span>针对性</span>
                      <span>咨询</span>
                    </div>
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
      </div>
      <!-- 咨询沟通 -->
      <div class="lawerAnswer consultBox" v-if="$route.query.isPay && $route.query.status <= 4">
        <h3>咨询沟通</h3>
        <div class="lawerAnwserBox borderTop">
          <el-form label-width="80px">
            <el-form-item
              :label="item.type==1?'我的追问':'律师回复'"
              v-for="(item,index) in formList"
              :key="index"
            >{{item.content}}</el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 律师解答 -->
      <div class="lawerAnswer consultBox" v-if="!$route.query.isPay">
        <h3>律师解答</h3>
        <div class="lawerAnwserBox borderTop">
          <el-form label-width="80px">
            <el-form-item label="审核结果:">{{form.result}}</el-form-item>
            <el-form-item label="律师解答:">
              <el-input type="textarea" v-model="form.lawerAnwer" :rows="10"></el-input>
            </el-form-item>
            <ul>
              <li v-for="(item,index) in lawerList" :key="index">
                <el-form>
                  <el-form-item :label="item.title">{{item.content}}</el-form-item>
                </el-form>
              </li>
            </ul>
            <el-input
              type="textarea"
              :rows="6"
              v-model="form.lawerContent"
              style="margin-left:80px;width:80%"
            ></el-input>
          </el-form>
        </div>
      </div>
      <!-- 服务评价 -->
      <div class="evaluate consultBox" v-if="!$route.query.isPay || $route.query.status == 4">
        <h3>服务评价</h3>
        <div class="borderTop consultEva">
          <el-form label-width="80px">
            <el-form-item label="满意度:">
              <el-radio-group v-model="radio">
                <el-radio :label="1">非常满意</el-radio>
                <el-radio :label="2">满意</el-radio>
                <el-radio :label="3">一般</el-radio>
                <el-radio :label="4">不满意</el-radio>
                <el-radio :label="5">非常不满意</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="意见建议:">
              <el-input type="textarea" :rows="6" v-model="proposal"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="consultBtn">
      <el-button class="question" @click="nextQuery" v-if="$route.query.status == 2">追问律师</el-button>
      <el-button class="save" @click="save">提交</el-button>
      <el-button class="quit" @click="quit">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        flowAxis: [],
        consultInfo: {
          consultStatus: 0
        },
        consultAnswer: {},
        msgRecordList: []
      },
      radio: 1,
      proposal: "",
      lawerList: [],
      list: [],
      options: [],
      total: 0,
      formList: [
        {
          type: 1,
          content: "你的阿的发送到发送到"
        },
        {
          type: 2,
          content: "阿斯顿发送到大幅度"
        }
      ],
      adeptSpecialtyList: [],
      lawyerRequest: {
        pageNum: 1,
        pageSize: 12,
        total: 0,
        keyWord: "",
        sortModel: "1",
        sortType: "1"
      },
      lawList: [],
      areaRegionList: [],
      imgList: [],
      consultStatusEnum: ['待确认', '解答中', '待评价', '已评价', '律师拒绝', '系统拒绝']
    };
  },
  created() {},
  mounted() {
    this.getData();
    //  1：待确认；2：解答中；3；待评价；4：已评价；5：律师拒绝；6：系统拒绝；
    if (this.$route.query.status > 4) {
      this.getValidLawyerList();
      this.getAreaList();
      this.getDictionaryList("shanchangzhuangye", "adeptSpecialtyList", true);
    }
  },
  methods: {
    payRefer(item) {
      console.log(item);
      this.lawyerId = item.lawyerId;
      // this.form = Object.assign({},this.form, {lawyerId: item.lawyerId});
    },
    quit() {
      this.$router.back();
    },
    getData() {
      let obj = {
        token: this.$store.state.token,
        consultId: this.$route.query.id
      };
      this.$ajaxPost("/consult/getConsultDetail", obj).then(res => {
        this.form = res.data.content;
        if (this.content.consultInfo) {
          this.imgList = this.content.consultInfo.imgList;
        }
      });
    },
    getValidLawyerList() {
      this.$ajaxPost("/lawyer/getValidLawyerList", this.lawyerRequest).then(
        res => {
          const dataList = res.data.content.dataList;
          this.lawList = dataList;
          this.lawyerId = dataList[0].lawyerId;
          this.lawyerRequest.total = res.data.content.pageInfo.total;
        }
      );
    },
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
    search() {
      this.lawyerRequest.pageNum = "1";
      this.getValidLawyerList();
    },
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
    setClass(sortModel) {
      return {
        active: this.lawyerRequest.sortModel === sortModel,
        "sort-bottom":
          this.lawyerRequest.sortModel === sortModel &&
          this.lawyerRequest.sortType === "2"
      };
    },
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
    saveInteractionMsg() {

    },
    nextQuery() {

    },
    save() {

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
    width: 600px;
    display: flex;
    // justify-content: space-between;
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
  height: 800px;
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
.borderTop .footPage {
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
  // padding-bottom: 20px;
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
    margin-bottom: 20px;
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
        // span {
        //   float: left;
        // }
        span:nth-of-type(2) {
          width: 65%;
        }
      }
      .lawerTitle {
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
.lawSec {
  overflow: hidden;
  margin-bottom: 20px;
  .lawTotal {
    float: right;
  }
}
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
.lawerInfo .info-right {
  float: right;
  margin: 10px;
  margin-top: -20px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  flex-wrap: wrap;
  span {
    display: block;
  }
  &.info-right:hover {
    background: linear-gradient(#109ed2, #1a7bc3);
    color: #fff;
    cursor: pointer;
  }
  // line-height: 70px;
}
</style>
