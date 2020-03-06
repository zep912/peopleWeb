<template>
  <el-tabs class="law-body" type="card">
    <el-tab-pane label="免费咨询">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="questionTitle">
          <el-input v-model="form.questionTitle"></el-input>
        </el-form-item>
        <el-form-item label="问题类型" prop="consultType">
          <el-radio-group v-model="form.consultType">
            <el-radio label="离婚" name="1"></el-radio>
            <el-radio label="交通事故" name="2"></el-radio>
            <el-radio label="刑事辩护" name="3"></el-radio>
            <el-radio label="婚姻家庭" name="4"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="问题描述" prop="questionDesc">
          <el-input type="textarea" v-model="form.questionDesc"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input type="phone" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="提问者">
          <el-input type="textarea" v-model="form.questionName"></el-input>
        </el-form-item>
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
          <el-upload class="avatar-uploader" :data="{token: form.token}" :show-file-list="false"
                     action="http://59.44.27.201:9010/jjkj/sfj/api/support/uploadFileToLocal"
                     :on-preview="uploadSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="针对性咨询">
      <div class="payHelp" v-if="!form.lawyerId">
        <div class="lawForm">
          <el-form :model="lawyerRequest" label-width="80px">
            <el-row>
              <el-col :span="5">
                <el-form-item label="所属区域:">
                  <el-select v-model="lawyerRequest.areaRegionList" multiple placeholder="请选择">
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
                  <el-select v-model="lawyerRequest.adeptSpecialtyList" multiple placeholder="请选择">
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
                  <el-input placeholder="输入查找的关键字" v-model="lawyerRequest.keyWord"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" :offset="1" style="margin-top:-3px">
                <el-button class="formBtn" size="medium">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
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
        <div class="lawerList">
          <ul>
            <li v-for="(item,index) in lawList" :key="index">
              <div class="lawerImg">
                <img :src="item.photoUrl" alt />
                <div class="lawerInfo">
                  <div class="info-box">
                    <div class="info-left">
                      <h3 class="info-title">{{item.lawyerName}}律师<span>(执业{{item.operationYears}}年)</span></h3>
                      <div class="info-phone">电话：<span>{{item.lawyerPhone}}</span></div>
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
          <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
        </div>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-if="form.lawyerId">
        <el-form-item label="意见律师" prop="lawyerId">
          <div class="lawerList">
            <ul>
              <li style="width: 36%">
                <div class="lawerImg">
                  <img :src="lawyerItem.photoUrl" alt />
                  <div class="lawerInfo">
                    <div class="info-box">
                      <div class="info-left">
                        <h3 class="info-title">{{lawyerItem.lawyerName}}律师<span>(执业{{lawyerItem.operationYears}}年)</span></h3>
                        <div class="info-phone">电话：<span>{{lawyerItem.lawyerPhone}}</span></div>
                      </div>
                      <div class="info-right">
                        <el-button @click="modLawyer">修改</el-button>
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
              </li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item label="标题" prop="questionTitle">
          <el-input v-model="form.questionTitle"></el-input>
        </el-form-item>
        <el-form-item label="咨询类型" prop="consultType">
          <el-radio-group v-model="form.consultType">
            <el-radio label="离婚" name="1"></el-radio>
            <el-radio label="交通事故" name="2"></el-radio>
            <el-radio label="刑事辩护" name="3"></el-radio>
            <el-radio label="婚姻家庭" name="4"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="问题描述" prop="questionDesc">
          <el-input type="textarea" v-model="form.questionDesc"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input type="phone" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="提问者">
          <el-input type="textarea" v-model="form.questionName"></el-input>
        </el-form-item>
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
        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import areaList from '@/components/areaList';
  export default {
    name: "refer",
    components: {areaList},
    data() {
      return {
        form: {
          areaArray: [],
          token: "",                //类型：String  必有字段  备注：用户身份标识
          consultType: "",                //类型：String  必有字段  备注：咨询类型 1：免费咨询；2：针对性咨询
          questionType: "2",                //类型：String  必有字段  备注：问题类型
          questionTitle: "",                //类型：String  必有字段  备注：标题
          questionDesc: "",                //类型：String  必有字段  备注：问题描述
          lawyerId: "",                //类型：String  可有字段  备注：意向律师ID(当提交针对性咨询时，此字段必有，如果是免费咨询，后台要查出当前的值班律师ID)
          fileId: ""
        },
        rules: {
          questionTitle: [
            {required: true, message: '请填写标题', trigger: 'change'}
          ],
          consultType: [
            {required: true, message: '请选择咨询类型', trigger: 'change'}
          ],
          questionDesc: [
            {required: true, message: '请填写问题描述', trigger: 'change'}
          ],
          applyPhone: [
            {required: true, message: '请填写手机号码', trigger: 'change'}
          ],
          areaCityId: [
            {required: true, message: '请选择市', trigger: 'change'}
          ],
          areaRegionId: [
            {required: true, message: '请选择区', trigger: 'change'}
          ],
          areaStreetId: [
            {required: true, message: '请选择街道', trigger: 'change'}
          ],
          areaAddress: [
            {required: true, message: '请填写地址', trigger: 'change'}
          ],
          matterType: [
            {required: true, message: '请选择事项类别', trigger: 'change'}
          ],
          identityTypeList: [
            {required: true, message: '请选择受援人类别', trigger: 'change'}
          ],
          difficultyType: [
            {required: true, message: '请选择经济困难情形', trigger: 'change'}
          ],
          applyReason: [
            {required: true, message: '请填写案情及申请理由', trigger: 'change'}
          ],
          fileList: [
            {required: true, message: '请上传证明材料', trigger: 'change'}
          ],
          appelleeName: [
            {required: true, message: '请填写被申请人姓名', trigger: 'change'}
          ],
          appelleePhone: [
            {required: true, message: '请填写被申请人电话', trigger: 'change'}
          ],
          appelleeCityId: [
            {required: true, message: '请选择市', trigger: 'change'}
          ],
          appelleeRegionId: [
            {required: true, message: '请选择区', trigger: 'change'}
          ],
          appelleeStreetId: [
            {required: true, message: '请选择街道', trigger: 'change'}
          ],
          appelleeAddress: [
            {required: true, message: '请填写地址', trigger: 'change'}
          ],
          disputeType: [
            {required: true, message: '请选择纠纷类型', trigger: 'change'}
          ],
          disputeDetail: [
            {required: true, message: '请填写纠纷情况', trigger: 'change'}
          ],
          lawOrgId: [
            {required: true, message: '请选择预约委员会', trigger: 'change'}
          ],
          deptName: [
            {required: true, message: '请选择反馈部门', trigger: 'change'}
          ],
          feeTitle: [
            {required: true, message: '请填写反馈事项', trigger: 'change'}
          ],
          feeContent: [
            {required: true, message: '请填写遇到的问题', trigger: 'change'}
          ],
          personPhone: [
            {required: true, message: '请填写手机号码', trigger: 'change'}
          ]
        },
        lawList: [],
        total:0,
        imageUrl: '',
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          }
        ],
        lawyerRequest: {
          areaRegionList: [],
          adeptSpecialtyList: []
        },
        lawyerItem: {
          serviceData: {
            satisfaction: 0
          }
        },
        lawyerId: ''
      }
    },
    methods: {
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
            this.lawList = this.lawList.concat(dataList);
          }
          this.total = res.data.content.pageInfo.total
        })
      },
      payRefer(item) {
        this.lawyerItem = item;
        this.form = Object.assign({},this.form, {lawyerId: item.lawyerId});
      },
      modLawyer() {
        this.form = Object.assign({},this.form, {lawyerId: ''});
      },
      cancel() {
        this.form = {
          areaArray: [],
          questionType: "2",                //类型：String  必有字段  备注：问题类型
          fileId: ''
        };
      },
      // 图片上传成功的回调处理
      uploadSuccess(res, file) {
        console.log(res);
        if (res.code === 200) {
          this.form.fileId = res.content.fileList.map(item => item.fileId).join();
          this.imageUrl = URL.createObjectURL(file.raw);
        }
      }
    },
    mounted() {
      this.form.token = this.$Cookies.get('token');
      this.getData();
    }
  }
</script>

<style lang="scss">
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
          margin: 0 10px;
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
