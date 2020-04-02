<template>
  <el-tabs class="law-body" type="card" v-model="tabName" @tab-click="tabClick">
    <el-tab-pane name="law" label="法律援助预约">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人">
              <el-input v-model="form.applyName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="applyPhone">
              <el-input v-model="form.applyPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="住所地" prop="areaArray">
              <area-list v-model="form.areaArray"></area-list>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详情地址" prop="areaAddress">
              <el-input v-model="form.areaAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="事件类别" prop="matterType">
          <el-radio-group v-model="form.matterType">
            <el-radio v-for="item in matterTypeList" :key="item.dictDataCode" :label="item.dictDataCode">{{item.dictDataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="受援人类别" prop="identityTypeList">
          <el-checkbox-group v-model="form.identityTypeList">
            <el-checkbox v-for="item in identityTypeList" :key="item.dictDataCode" :label="item.dictDataCode">{{item.dictDataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="经济困难情形" prop="difficultyType">
          <el-radio-group v-model="form.difficultyType">
            <el-radio v-for="item in difficultyTypeList" :key="item.dictDataCode" :label="item.dictDataCode">{{item.dictDataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="案情及申请理由" prop="applyReason">
          <el-input type="textarea" v-model="form.applyReason" :rows="5"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="imageUrls" :model="imageUrls" :rules="fileRules" :inline="true">
        <el-form-item label="证明材料" class="label-width" prop="idCard">
          <el-upload class="avatar-uploader" :data="{token: form.token}" :show-file-list="false"
                     action="http://59.44.27.201:9010/jjkj/sfj/api/support/uploadFileToLocal"
                     :on-success="uploadSuccessIdCard" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrls.idCard" :src="imageUrls.idCard" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="text">身份证</div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="dibao">
          <el-upload class="avatar-uploader" :data="{token: form.token}" :show-file-list="false"
                     action="http://59.44.27.201:9010/jjkj/sfj/api/support/uploadFileToLocal"
                     :on-success="uploadSuccessDibao" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrls.dibao" :src="imageUrls.dibao" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="text">低保证</div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="hard">
          <el-upload class="avatar-uploader" :data="{token: form.token}" :show-file-list="false"
                     action="http://59.44.27.201:9010/jjkj/sfj/api/support/uploadFileToLocal"
                     :on-success="uploadSuccessHard" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrls.hard" :src="imageUrls.hard" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="text">困难证明</div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="rest">
          <el-upload class="avatar-uploader" :data="{token: form.token}" :show-file-list="false"
                     action="http://59.44.27.201:9010/jjkj/sfj/api/support/uploadFileToLocal"
                     :on-success="uploadSuccessRest" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrls.rest" :src="imageUrls.rest" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="text">其他</div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="acceptance" class="form-item-center">
          <el-checkbox v-model="imageUrls.acceptance">本人承诺以上所填内容和提交的证件、证明材料均真实。</el-checkbox>
        </el-form-item>
        <el-form-item class="form-item-center">
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane name="people" label="人民调解预约">
      <el-form ref="appointment" :model="appointment" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人" prop="applyName">
              <el-input v-model="appointment.applyName" diabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="applyPhone">
              <el-input v-model="appointment.applyPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位或住址" prop="applyArray">
              <area-list v-model="appointment.applyArray"></area-list>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详情地址" prop="applyAddress">
              <el-input v-model="appointment.applyAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="被申请人" prop="appelleeName">
              <el-input v-model="appointment.appelleeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="appelleePhone">
              <el-input v-model="appointment.appelleePhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位或住址" prop="appelleeArray">
              <area-list v-model="appointment.appelleeArray"></area-list>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详情地址" prop="appelleeAddress">
              <el-input v-model="appointment.appelleeAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纠纷类型" prop="disputeType">
              <el-select v-model="appointment.disputeType" placeholder="请选择">
                <el-option v-for="item in disputeTypeList" :key="item.dictDataCode" :label="item.dictDataName" :value="item.dictDataCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="纠纷情况" prop="disputeDetail">
              <el-input type="textarea" v-model="appointment.disputeDetail" :rows="3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="预约调委会" prop="lawOrgId">
              <div class="lawOrgBox">
                <div class="lawOrg" :class="{active: appointment.lawOrgId === item.lawOrgId}" @click="setLawOrgId(item.lawOrgId)" v-for="item in mediateCommitteeList" :key="item.lawOrgId">
                  <div class="imgBox">
                    <img :src="item.orgImgUrl" alt="">
                  </div>
                  <div class="lawOrgContent">
                    <h3>{{item.orgName}}</h3>
                    <p>联系电话：<span>{{item.orgTelephone}}</span></p>
                    <p>办公时间：{{item.workTime}}</p>
                    <p>联系地址：{{item.areaAddress}}</p>
                  </div>
                </div>
              </div>
              <el-button type="text" @click="more">更多调委会</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预约日期" prop="appointmentDate">
              <el-date-picker v-model="appointment.appointmentDate" type="date" placeholder="选择日期" format='yyyy-MM-dd' value-format='yyyy-MM-dd'>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预约时间" prop="appointmentTime">
              <el-time-select v-model="appointment.appointmentTime" :picker-options="{start: '09:00', step: '01:00', end: '20:00'}" placeholder="选择时间">
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item style="text-align: center">
              <el-button type="primary" @click="onSubmit('appointment')">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import areaList from '@/components/areaList';
  export default {
    name: "booking",
    components: {areaList},
    data() {
      return {
        tabName: 'law',
        matterTypeList: [],
        identityTypeList: [],
        difficultyTypeList: [],
        form: {
          token: '',
          applyPhone: '',
          areaAddress: '',
          identityTypeList: [],
          areaArray: [],
          fileList: [],
        },
        fileObj: {
          idCard: {},
          dibao: {},
          hard: {},
          rest: {}
        },
        fileRules: {
          idCard: [
            {required: true, message: '请上传身份证', trigger: 'change'}
          ],
          dibao: [
            {required: true, message: '请上传低保证', trigger: 'change'}
          ],
          hard: [
            {required: true, message: '请上传困难证明', trigger: 'change'}
          ]
        },
        imageUrls: {
          acceptance: false,
          idCard: '',
          dibao: '',
          hard: '',
          rest: ''
        },
        rules: {
          applyPhone: [
            {required: true, message: '请填写手机号码', trigger: 'change'}
          ],
          areaArray: [
            {type: 'array', required: true, message: '请选择地址', trigger: 'change'}
          ],
          areaAddress: [
            {required: true, message: '请填写详细地址', trigger: 'change'}
          ],
          matterType: [
            {required: true, message: '请选择事项类别', trigger: 'change'}
          ],
          identityTypeList: [
            {type: 'array', required: true, message: '请选择受援人类别', trigger: 'change'}
          ],
          difficultyType: [
            {required: true, message: '请选择经济困难情形', trigger: 'change'}
          ],
          applyReason: [
            {required: true, message: '请填写案情及申请理由', trigger: 'change'}
          ],
          fileList: [
            {type: 'array', required: true, message: '请上传证明材料', trigger: 'change'}
          ],
          appointmentDate: [
            { required: true, message: '请选择预约日期', trigger: 'change'}
          ],
          appointmentTime: [
            {required: true, message: '请选择预约日期', trigger: 'change'}
          ],
          applyArray: [
            {type: 'array', required: true, message: '请选择地址', trigger: 'change'}
          ],
          applyAddress: [
            {required: true, message: '请填写详细地址', trigger: 'change'}
          ],
          appelleeName: [
            {required: true, message: '请填写被申请人姓名', trigger: 'change'}
          ],
          appelleePhone: [
            {required: true, message: '请填写被申请人电话', trigger: 'change'}
          ],
          appelleeArray: [
            {type: 'array', required: true, message: '请选择地址', trigger: 'change'}
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
          ]
        },
        disputeTypeList: [],
        params: {
          pageNum: 1,
          pageSize: 4,
          total: 0
        },
        mediateCommitteeList: [],
        appointment: {
          token: '',
          applyPhone: '',
          applyArray: [],
          appelleeArray: [],
        },
      }
    },
    methods: {
      // 字典表，方法查询事项列表，困难情况等数组的方法
      getDictionaryList(dictCode, typeName, flag) {
        this.$ajaxPost('/support/getDictionaryList', {dictCode, userId: '1'}).then(({data}) => {
          if (data.code == 200) {
            const defaultArr = flag ? [{dictDataCode: '', dictDataName: '全部'}] : [];
            this[typeName] = defaultArr.concat(data.content.resultList);
          }
        })
      },
      // 切换法律援助和人民调解的方法，并在每次切换的时候清除在对应tab下填写的内容
      tabClick({name}) {
        if (name !== 'law') this.getMediateCommitteeList();
        this.$nextTick(() => {
          this.$refs[this.tabName === 'law' ? 'form' : 'appointment'].clearValidate();
        });
      },
      uploadSuccessIdCard(res, file) {
        this.uploadSuccess(res, file, 'idCard');
      },
      uploadSuccessDibao(res, file) {
        this.uploadSuccess(res, file, 'dibao');
      },
      uploadSuccessHard(res, file) {
        this.uploadSuccess(res, file, 'hard');
      },
      uploadSuccessRest(res, file) {
        this.uploadSuccess(res, file, 'rest');
      },
      // 上传成功的回调。并回显图片地址
      uploadSuccess(res, file, type) {
        if (res.code === 200) {
          this.$refs['imageUrls'].clearValidate([type]);
          const fileTypeEnum = {
            idCard: '身份证',
            dibao: '低保证',
            hard: '困难证明',
            rest: '其他'
          };
          const fileType = fileTypeEnum[type];
          this.fileObj[type] = {
            fileType,
            fileId: res.content.fileList.map(item => item.fileId).join()
          };
          // URL.createObjectURL获取当前文件的一个内存url
          this.imageUrls[type] = URL.createObjectURL(file.raw);
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
      // 获取预约调委会的数据
      getMediateCommitteeList() {
        this.$ajaxPost('/lawOrg/getMediateCommitteeList', Object.assign({token: this.form.token}, this.params)).then(({data}) => {
          if (data.code === 200) {
            this.params.total = data.content.pageInfo.total;
            this.mediateCommitteeList = data.content.dataList;
          }
        })
      },
      // 加载更多，分页展示。每次页码加1，
      more() {
        let {pageNum, pageSize, total} = this.params;
        this.params.pageNum = total > pageNum * pageSize ? pageNum + 1 : 1;
        this.getMediateCommitteeList();
        this.setLawOrgId('');
      },
      // 点击调委会，清除校验数据
      setLawOrgId(lawOrgId) {
        this.appointment = Object.assign({}, this.appointment, {lawOrgId});
        this.$nextTick(() => {
          this.$refs['appointment'].validateField(['lawOrgId']);
        });
      },
      // 提交并判断
      async onSubmit(formName) {
        if (formName === 'form') {
          this.$refs['form'].validate((val) => {
            if (val) {
              this.$refs['imageUrls'].validate((valid) => {
                if (valid) {
                  if (!this.imageUrls.acceptance) {
                    this.$message.warning('请勾选承诺书');
                    return false
                  }
                  const areaArray = this.form.areaArray;
                  let form = Object.assign({}, this.form);
                  form.identityTypeList = this.form.identityTypeList.map(item => {
                    return {matterType: item}
                  });
                  if (areaArray && areaArray.length) {
                    form.areaCityId = areaArray[0];
                    form.areaRegionId = areaArray[1];
                    form.areaStreetId = areaArray[2];
                  }
                  delete form.areaArray;
                  form.fileList = Object.values(this.fileObj);
                  form.identityType = this.form.identityTypeList[0];
                  form.appointmentDate = '2020-03-03';
                  form.appointmentTime = '08:00';
                  this.submit(formName, form);
                }
              });
            }
          });
        } else {
          let appointment = Object.assign({}, this.appointment);
          const {appointmentDate, appointmentTime, token, lawOrgId} = appointment;
          // 注意，如果这里对时间做处理，需要注意两个点，第一个就是html上指定时间格式
          // 指定时间格式，如果对时间做了校验type为date时，会报错。因为下面这个是对字符串的操作，上面默认了是时间对象格式
          // 所以最后处理的办法，就是取消了校验中type为date。并在html上设置默认的时间格式
          appointment.appointmentDate = appointment.appointmentDate.slice(0, 10);
          const res = await this.$ajaxPost('/appointment/getAppointmentTime', {appointmentDate, appointmentTime, lawOrgId, token});
          if (res.data.code === 200) {
            if (res.data.dataList && res.data.dataList.length && res.data.dataList[0].appointmentCount > 0) {
              const applyArray = this.appointment.appelleeArray;
              const appelleeArray = this.appointment.appelleeArray;
              if (applyArray && applyArray.length) {
                appointment.applyCityId = applyArray[0];
                appointment.applyRegionId = applyArray[1];
                appointment.applyStreetId = applyArray[2];
              }
              if (appelleeArray && appelleeArray.length) {
                appointment.appelleeCityId = appelleeArray[0];
                appointment.appelleeRegionId = appelleeArray[1];
                appointment.appelleeStreetId = appelleeArray[2];
              }
              this.submit(formName, appointment);
            } else {
              this.$message.error('该机构这个时间已约满');
              return false;
            }
          } else {
            return false;
          }
        }
      },
      submit(formName, form) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajaxPost(`/appointment/${formName === 'form' ? 'saveLawAidAppointment' : 'saveAppointmentMediate'}`, form).then(({data}) => {
              if (data.code === 200) {
                const {applyName, applyPhone} = form;
                if (formName === 'form') {
                  this.form = {token: this.$store.getters.token, applyName, applyPhone, identityTypeList: [], areaArray: [], fileList: []};
                  this.imageUrls = {idCard: '', dibao: '', hard: '', rest: ''};
                  this.fileObj = {idCard: {}, dibao: {}, hard: {}, rest: {}};
                } else {
                  this.appointment = {token: this.$store.getters.token, applyName, applyPhone, aplayArray: [], appelleeArray: []};
                  this.params = {pageNum: 1, pageSize: 4, total: 0};
                }
                this.$nextTick(() => {
                  this.$refs[formName].clearValidate();
                });
                this.$message.success('提交成功', 3000);
              } else {
                this.$message.error(data.msg, 3000);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted() {
      this.getDictionaryList('shixiangleibie', 'matterTypeList');
      this.getDictionaryList('shenfenleibie', 'identityTypeList');
      this.getDictionaryList('kunnanqingxing', 'difficultyTypeList');
      this.getDictionaryList('jiufenqingkuang', 'disputeTypeList');
      this.form.token = this.$Cookies.get('token');
      const {userName, mobilePhone} = this.$store.state.userInfo;
      this.form.applyName = userName;
      this.form.applyPhone = mobilePhone;
      this.appointment.applyName = userName;
      this.appointment.applyPhone = mobilePhone;
      this.appointment.token = this.$Cookies.get('token');
      this.$nextTick(() => {
        this.$refs[this.tabName === 'law' ? 'form' : 'appointment'].clearValidate();
      });
    },
    watch: {
      'form': function(val){
        if (val) this.$refs['form'].validateField(['areaArray']);
      },
      'appointment': function(val){
        if (val) this.$refs['appointment'].validateField(['applyArray']);
        if (val) this.$refs['appointment'].validateField(['appelleeArray']);
      },
    }
  }
</script>

<style lang="scss">
.law-body {
  .el-radio-group {
    line-height: inherit!important;
    .el-radio {
      width: 220px;
    }
  }
  .el-checkbox-group {
    line-height: inherit!important;
    .el-checkbox {
      width: 220px;
    }
  }
  .label-width {
    .el-form-item__label {
      width: 140px;
    }
  }
  .form-item-center {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 0;
    .el-form-item__error {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .avatar-uploader {
    .text {
      margin-top: 10px;
    }
  }
}
.lawOrgBox {
  .lawOrg {
    box-sizing: border-box;
    width: 360px;
    height: 200px;
    border: 1px solid #ccc;
    padding: 20px;
    display: inline-flex;
    margin: 0 20px 20px 0;
    cursor: pointer;
    &.active {
      border-color: #158CCB;
    }
    .imgBox {
      width: 100px;
      background-color: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .lawOrgContent {
      padding-left: 10px;
      line-height: 28px;
      flex: 1;
      h3 {
        color: #158CCB;
      }
      p {
        span {
          color: #158CCB;
        }
      }
    }
  }
}
</style>
