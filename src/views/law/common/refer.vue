<template>
  <el-tabs class="law-body" type="card" v-model="form.consultType" @tab-click="tabClick">
    <el-tab-pane label="免费咨询" name="1">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="questionTitle">
          <el-input v-model="form.questionTitle"></el-input>
        </el-form-item>
        <el-form-item label="问题类型" prop="questionType">
          <el-radio-group v-model="form.questionType">
            <el-radio
              v-for="item in questionTypeList"
              :key="item.dictDataCode"
              :label="item.dictDataCode"
            >{{item.dictDataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="问题描述" prop="questionDesc">
          <el-input type="textarea" v-model="form.questionDesc" :rows="5"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input type="phone" v-model="userInfo.mobilePhone" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提问者">
              <el-input v-model="userInfo.userName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="住所地">
          <el-row>
            <el-col :span="12">
              <area-list v-model="form.areaArray"></area-list>
            </el-col>
            <el-col :span="12">
              <el-input v-model="form.desc"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            :data="{token: form.token}"
            :show-file-list="false"
            action="http://59.44.27.201:9010/jjkj/sfj/api/support/uploadFileToLocal"
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit('1')">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="针对性咨询" name="2">
      <div class="payHelp" v-if="!form.lawyerId">
        <div class="lawForm">
          <el-form :model="lawyerRequest" label-width="80px">
            <el-row>
              <el-col :span="6">
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
              <el-col :span="6" :offset="1">
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
              <el-col :span="6" :offset="1">
                <el-form-item label="关键字:">
                  <el-input placeholder="输入查找的关键字" v-model="lawyerRequest.keyWord"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" :offset="1" style="margin-top:-3px">
                <el-button class="formBtn" size="medium" @click="search">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
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
        <div class="lawerList">
          <ul>
            <li v-for="item in lawList" :key="item.lawyerId">
              <div class="lawerImg">
                <img :src="item.photoUrl" alt />
                <div class="lawerInfo">
                  <div class="info-box">
                    <div class="info-left">
                      <h3 class="info-title">
                        {{item.lawyerName}}律师
                        <span>(执业{{item.operationYears}}年)</span>
                      </h3>
                      <div class="info-phone">
                        电话：
                        <span>{{item.lawyerPhone}}</span>
                      </div>
                    </div>
                    <div class="info-right">
                      <el-button @click="payRefer(item)">点击咨询</el-button>
                    </div>
                  </div>
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
          <el-pagination
            background
            layout="prev, pager, next"
            :total="lawyerRequest.total"
            @size-change="sizeChange"
          ></el-pagination>
        </div>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="payHelpClass"
        v-if="form.lawyerId"
      >
        <el-form-item label="意见律师" prop="lawyerId">
          <div class="lawerBox">
            <div class="lawerImg">
              <img :src="lawyerItem.photoUrl" alt />
              <div class="lawerInfo">
                <div class="info-box">
                  <div class="info-left">
                    <h3 class="info-title">
                      {{lawyerItem.lawyerName}}律师
                      <span>(执业{{lawyerItem.operationYears}}年)</span>
                    </h3>
                    <div class="info-phone">
                      电话：
                      <span>{{lawyerItem.lawyerPhone}}</span>
                    </div>
                  </div>
                </div>
                <p>
                  <span>擅长专业：</span>
                  <span>{{lawyerItem.content}}</span>
                </p>
              </div>
            </div>
            <div class="lawerExcu">
              <div>
                <p>{{lawyerItem.serviceData.consultAmount}}</p>
                <p>咨询量</p>
              </div>
              <div>
                <p>{{lawyerItem.serviceData.serviceAmount}}</p>
                <p>服务次数</p>
              </div>
              <div>
                <p>{{lawyerItem.serviceData.satisfaction.toFixed(2)}}</p>
                <p>满意度</p>
              </div>
            </div>
          </div>
          <el-button @click="modLawyer">修改</el-button>
        </el-form-item>
        <el-form-item label="标题" prop="questionTitle">
          <el-input v-model="form.questionTitle"></el-input>
        </el-form-item>
        <el-form-item label="咨询类型" prop="questionType">
          <el-radio-group v-model="form.questionType">
            <el-radio
              v-for="item in questionTypeList"
              :key="item.dictDataCode"
              :label="item.dictDataCode"
            >{{item.dictDataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="问题描述" prop="questionDesc">
          <el-input type="textarea" v-model="form.questionDesc" :rows="5"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input type="phone" v-model="userInfo.mobilePhone" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提问者">
              <el-input v-model="userInfo.userName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="住所地">
          <el-row>
            <el-col :span="12">
              <area-list v-model="form.areaArray"></area-list>
            </el-col>
            <el-col :span="12">
              <el-input v-model="form.desc"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit('2')">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import areaList from "@/components/areaList";
export default {
  name: "refer",
  components: { areaList },
  data() {
    return {
      questionTypeList: [],
      userInfo: {},
      form: {
        areaArray: [],
        token: "", //类型：String  必有字段  备注：用户身份标识
        consultType: "1", //类型：String  必有字段  备注：咨询类型 1：免费咨询；2：针对性咨询
        questionType: "", //类型：String  必有字段  备注：问题类型
        questionTitle: "", //类型：String  必有字段  备注：标题
        questionDesc: "", //类型：String  必有字段  备注：问题描述
        lawyerId: "", //类型：String  可有字段  备注：意向律师ID(当提交针对性咨询时，此字段必有，如果是免费咨询，后台要查出当前的值班律师ID)
        fileId: ""
      },
      rules: {
        questionTitle: [
          { required: true, message: "请填写标题", trigger: "change" }
        ],
        questionType: [
          { required: true, message: "请选择问题类型", trigger: "change" }
        ],
        questionDesc: [
          { required: true, message: "请填写问题描述", trigger: "change" }
        ],
        lawyerId: [{ required: true, message: "请选择律师", trigger: "change" }]
      },
      lawList: [],
      imageUrl: "",
      adeptSpecialtyList: [],
      areaRegionList: [],
      lawyerRequest: {
        pageNum: "1",
        pageSize: "12",
        total: 0,
        keyWord: "",
        sortModel: "1",
        sortType: "1"
      },
      lawyerItem: {
        serviceData: {
          satisfaction: 0
        }
      },
      lawyerId: ""
    };
  },
  methods: {
    // 字典表，方法查询问题类型，擅长专业的list字段
    // 同时添加全部选项。通过数组拼接的方式赋值给目标数组
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
    // 查询地址的方法，使用数组reduce方法来判断重组
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
    // 免费咨询，针对性咨询tab切换方法
    tabClick({ name }) {
      if (name === "2") {
        this.getDictionaryList("shanchangzhuanye", "adeptSpecialtyList", true);
        this.getAreaList();
        this.getValidLawyerList();
      }
    },
    // 律师列表的分页事件
    sizeChange(pageNum) {
      this.lawyerRequest.pageNum = pageNum;
      this.getValidLawyerList();
    },
    // 搜索的事件
    search() {
      this.lawyerRequest.pageNum = "1";
      this.getValidLawyerList();
    },
    // 动态给针对性咨询律师列表排序添加class属性。改变其样式
    setClass(sortModel) {
      return {
        active: this.lawyerRequest.sortModel === sortModel,
        "sort-bottom":
          this.lawyerRequest.sortModel === sortModel &&
          this.lawyerRequest.sortType === "2"
      };
    },
    // 此方法是针对性咨询点击咨询量，满意度等排序方法。
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
    // 律师列表数据
    getValidLawyerList() {
      this.$ajaxPost("/lawyer/getValidLawyerList", this.lawyerRequest).then(
        res => {
          const dataList = res.data.content.dataList;
          this.lawList = dataList;
          // for (let i = 0; i < 10; i++) {
          //   this.lawList = this.lawList.concat(dataList);
          // }
          this.lawyerRequest.total = res.data.content.pageInfo.total;
        }
      );
    },
    // 咨询，使用拷贝的方式给对象添加律师id值。
    payRefer(item) {
      this.lawyerItem = item;
      this.form = Object.assign({}, this.form, { lawyerId: item.lawyerId });
    },
    modLawyer() {
      this.form = Object.assign({}, this.form, { lawyerId: "" });
      this.getValidLawyerList();
    },
    cancel() {
      this.form = {
        areaArray: [],
        consultType: "2",
        fileId: ""
      };
    },
    // 图片上传成功的回调处理
    uploadSuccess(res, file) {
      if (res.code === 200) {
        this.form.fileId = res.content.fileList.map(item => item.fileId).join();
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
    // 图片上传之前的判断
    beforeAvatarUpload(file) {
      const isImg = file.type.indexOf("image/") > -1;
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (!isImg) {
        this.$message.error("只能上传照片");
      }
      if (!isLt100M) {
        this.$message.error("上传头像图片大小不能超过 100MB!");
      }
      return isImg && isLt100M;
    },
    // 提交的事件
    onSubmit(consultType) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const areaArray = this.form.areaArray;
          let form = Object.assign({}, this.form);
          if (areaArray && areaArray.length) {
            form.areaCityId = areaArray[0];
            form.areaRegionId = areaArray[1];
            form.areaStreetId = areaArray[2];
          }
          this.$ajaxPost("/consult/saveConsultOnline", form).then(
            ({ data }) => {
              if (data.code === 200) {
                this.form = {
                  token: this.$store.getters.token,
                  areaArray: [],
                  consultType
                };
                this.imageUrl = "";
                this.$nextTick(() => {
                  this.$refs["form"].clearValidate();
                });
                this.$message.success("提交成功", 3000);
              } else {
                this.$message.error(data.msg, 3000);
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.form.token = this.$Cookies.get("token");
    this.userInfo = this.$store.state.userInfo;
    this.getDictionaryList("wentileixing", "questionTypeList");
    if (this.$store.getters.refer.lawyerId) {
      this.form = Object.assign({}, this.form, this.$store.getters.refer);
      this.lawyerItem = this.$store.getters.lawyerItem;
      this.$store.commit('refer', {lawyerId: '', consultType: ''});
      this.$store.commit('lawyerItem', {});
    }
  }
};
</script>

<style lang="scss">
.law-body .el-tabs__header {
  border-bottom: 0 !important;
}
.el-tabs__item {
  background: #f1f1f1;
}
.payHelp {
  .lawForm {
    padding-top: 22px;
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
  overflow: hidden;
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
      flex: 1;
      .info-box {
        display: flex;
        .info-left {
          flex: 1;
          .info-title {
            span {
              font-size: 14px;
              font-weight: 400;
            }
          }
        }
        .info-right {
          margin: 0 10px 10px;
          .el-button {
            width: 70px;
            height: 70px;
            padding: 5px;
          }
        }
      }
    }
  }
  .lawerExcu {
    overflow: hidden;
    background: #e8f4fa;
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    div {
      float: left;
      width: 33%;
      text-align: center;
      line-height: 20px;
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
.payHelpClass {
  .el-form-item__content {
    /*line-height: initial;*/
  }
}
.law .law-body .el-tabs__item.is-active {
  background: linear-gradient(to right, #10a0d3, #1b79c3);
}
.lawerBox {
  width: 36%;
  background: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding-top: 20px;
  float: left;
  margin-right: 0.5%;
  margin-bottom: 0.5%;
  font-size: 14px;
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
      flex: 1;
      .info-box {
        display: flex;
        .info-left {
          flex: 1;
          .info-title {
            span {
              font-size: 14px;
              font-weight: 400;
            }
          }
        }
        .info-right {
          margin: 0 10px 10px;
          .el-button {
            width: 70px;
            height: 70px;
            padding: 5px;
          }
        }
      }
    }
  }
  .lawerExcu {
    overflow: hidden;
    background: #e8f4fa;
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    div {
      float: left;
      width: 33%;
      text-align: center;
      line-height: 20px;
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
