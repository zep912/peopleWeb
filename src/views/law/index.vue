<template>
  <div class="law">
    <div class="law-header">
      <div class="law-content" :class="{active: active === 1}" @click="active = 1">
        <img src="../../assets/svg/zxzx.svg" alt="">
        <div>在线咨询</div>
      </div>
      <div class="law-content" :class="{active: active === 2}" @click="active = 2">
        <img src="../../assets/svg/zxyy.svg" alt="">
        <div>在线预约</div>
      </div>
      <div class="law-content" :class="{active: active === 3}" @click="active = 3">
        <img src="../../assets/svg/qzyj.svg" alt="">
        <div>群众批评意见</div>
      </div>
      <div class="law-content" :class="{active: active === 4}" @click="active = 4">
        <img src="../../assets/svg/sfks.svg" alt="">
        <div>司法考试</div>
      </div>
    </div>
    <el-tabs class="law-body" type="card" v-if="active === 1">
      <el-tab-pane label="免费咨询">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
              <el-col :span="6">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-input v-model="form.desc"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload class="avatar-uploader" :show-file-list="false" action="">
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
        针对性咨询
      </el-tab-pane>
    </el-tabs>
    <el-tabs class="law-body" type="card" v-if="active === 2">
      <el-tab-pane label="法律援助预约">
        <el-form ref="lawAidAppointment" :model="lawAidAppointment" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请人" prop="questionTitle">
                <el-input v-model="lawAidAppointment.questionTitle"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="applyPhone">
                <el-input v-model="lawAidAppointment.applyPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="住所地" prop="areaStreetId">
                <el-row>
                  <el-col :span="8">
                    <el-select v-model="lawAidAppointment.areaCityId" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="lawAidAppointment.areaRegionId" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="lawAidAppointment.areaStreetId" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详情地址" prop="areaAddress">
                <el-input v-model="lawAidAppointment.areaAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="事件类别" prop="matterType">
                <el-radio-group v-model="lawAidAppointment.matterType">
                  <el-radio label="离婚" name="1"></el-radio>
                  <el-radio label="交通事故" name="2"></el-radio>
                  <el-radio label="刑事辩护" name="3"></el-radio>
                  <el-radio label="婚姻家庭" name="4"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="受援人类别" prop="identityTypeList">
                <el-checkbox-group v-model="lawAidAppointment.identityTypeList">
                  <el-checkbox label="离婚" name="1"></el-checkbox>
                  <el-checkbox label="交通事故" name="2"></el-checkbox>
                  <el-checkbox label="刑事辩护" name="3"></el-checkbox>
                  <el-checkbox label="婚姻家庭" name="4"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="经济困难情形" prop="difficultyType">
                <el-radio-group v-model="lawAidAppointment.difficultyType">
                  <el-radio label="离婚" name="1"></el-radio>
                  <el-radio label="交通事故" name="2"></el-radio>
                  <el-radio label="刑事辩护" name="3"></el-radio>
                  <el-radio label="婚姻家庭" name="4"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="案情及申请理由" prop="applyReason">
                <el-input type="textarea" v-model="lawAidAppointment.applyReason"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="证明材料" prop="fileList">
                <el-col :span="4">
                  <el-upload class="avatar-uploader" :show-file-list="false" action="">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    身份证
                  </el-upload>
                </el-col>
                <el-col :span="4">
                  <el-upload class="avatar-uploader" :show-file-list="false" action="">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    低保证
                  </el-upload>
                </el-col>
                <el-col :span="4">
                  <el-upload class="avatar-uploader" :show-file-list="false" action="">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    困难证明
                  </el-upload>
                </el-col>
                <el-col :span="4">
                  <el-upload class="avatar-uploader" list-type="picture-card" :show-file-list="false" action="">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
            </el-form-item>
            </el-col>
            <el-col :span="24" style="text-align: center">
              <el-form-item>
                <el-radio-group v-model="lawAidAppointment.acceptance">
                  <el-radio :label="1">本人承诺以上所填内容和提交的证件、证明材料均真实。</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align: center">
            <el-button type="primary">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="人民调解预约">
        <el-form ref="appointment" :model="appointment" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="12">
            <el-form-item label="申请人" prop="questionTitle">
              <el-input v-model="appointment.questionTitle"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="applyPhone">
                <el-input v-model="appointment.applyPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="住所地" prop="areaStreetId">
                <el-row>
                  <el-col :span="8">
                    <el-select v-model="appointment.areaCityId" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="appointment.areaRegionId" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="appointment.areaStreetId" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详情地址" prop="areaAddress">
                <el-input v-model="appointment.areaAddress"></el-input>
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
            <el-col :span="24">
              <el-form-item label="住所地" prop="appelleeStreetId">
                <el-row>
                  <el-col :span="8">
                    <el-select v-model="appointment.appelleeCityId" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="appointment.appelleeRegionId" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="appointment.appelleeStreetId" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详情地址" prop="appelleeAddress">
                <el-input v-model="appointment.appelleeAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="纠纷类型" prop="disputeType">
                <el-select v-model="appointment.disputeType" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="纠纷情况" prop="disputeDetail">
                <el-input type="textarea" v-model="appointment.disputeDetail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="预约调委会" prop="lawOrgId">
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预约日期" prop="appointmentDate">
                <el-date-picker v-model="appointment.appointmentDate" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预约时间" prop="appointmentTime">
                <el-time-select v-model="appointment.appointmentTime" :picker-options="{start: '08:30', step: '00:30', end: '18:30'}" placeholder="选择时间">
                </el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align: center">
            <el-button type="primary">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-tabs class="law-body" type="card" v-if="active === 3">
      <el-tab-pane label="群众批评意见">
        <el-form ref="suggestCriticism" :model="suggestCriticism" :rules="rules" label-width="80px">
          <el-form-item label="反馈部门" prop="deptName">
            <el-select v-model="suggestCriticism.deptName" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="反馈事项" prop="feeTitle">
            <el-input v-model="suggestCriticism.feeTitle"></el-input>
          </el-form-item>
          <el-form-item label="问题描述" prop="feeContent">
            <el-input type="textarea" v-model="suggestCriticism.feeContent"></el-input>
          </el-form-item>
          <el-form-item label="意见和建议" prop="feeContent">
            <el-input type="textarea" v-model="suggestCriticism.feeContent"></el-input>
          </el-form-item>
          <el-form-item label="反馈人" prop="feeContent">
            <el-input v-model="suggestCriticism.feeContent"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="personPhone">
            <el-input v-model="suggestCriticism.personPhone"></el-input>
          </el-form-item>
          <el-form-item label="住所地" prop="areaStreetId">
            <el-row>
              <el-col :span="8">
                <el-select v-model="suggestCriticism.areaCityId" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="suggestCriticism.areaRegionId" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="suggestCriticism.areaStreetId" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="详细地址" prop="areaAddress">
            <el-input v-model="suggestCriticism.areaAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="lawArt" v-if="active === 4">
      <div class="lawTitle">
        <span class="lawTitles">考试动态</span>
        <span>
                共计：
                <span>{{num}}</span>篇
              </span>
      </div>
      <ul class="lawUl">
        <li v-for="(item,index) in list" :key="index">
          <span>{{item.newsTitle}}</span>
          <span class="time">{{item.publishTime}}</span>
        </li>
      </ul>
      <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      form: {
        token: "64d1d05f5ccb4670a6d342f3b3c002ce",                //类型：String  必有字段  备注：用户身份标识
        consultType: "",                //类型：String  必有字段  备注：咨询类型 1：免费咨询；2：针对性咨询
        questionType: "2",                //类型：String  必有字段  备注：问题类型
        questionTitle: "",                //类型：String  必有字段  备注：标题
        questionDesc: "",                //类型：String  必有字段  备注：问题描述
        lawyerId: "f17ec6da26f3457a9476d0845f2d21e5",                //类型：String  可有字段  备注：意向律师ID(当提交针对性咨询时，此字段必有，如果是免费咨询，后台要查出当前的值班律师ID)
        fileId: "gcled0d99c3433a9b09218e599dhwq03,gcled0d99c3433a9b09218e5assqwq01"
      },
      lawAidAppointment: {
        identityTypeList: []
      },
      appointment: {},
      suggestCriticism: {},
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
      num: "1000",
      list: [],
      total:0,
      imageUrl: ''
    }
  }
}
</script>

<style lang="scss">
.law {
  width: 85%;
  margin: 0 auto;
  .law-header {
    .law-content {
      width: 120px;
      display: inline-block;
      box-sizing: border-box;
      padding: 20px 10px;
      margin-right: 20px;
      text-align: center;
      border: 1px solid #ddd;
      cursor: pointer;
      img {
        width: 36px;
      }
      div {
        padding: 5px 0;
      }
      &.active {
        background: #3ba6d5;
        font-weight: 700;
      }
    }
  }
  .law-body {
    margin-top: 10px;
    width: 100%;
    background-color: #fff;
    padding: 15px!important;
    border-top: 2px solid #449efe;
    box-sizing: border-box;
    .el-tabs__header {
        margin: 0 0 15px;
      }
    .el-tabs__item {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 700;
        &.is-active {
          color: #fff;
          background: #409EFF;
        }
      }
  }
}
.avatar-uploader {
  .avatar, .el-upload {
    width: 120px;
    height: 120px;
    display: block;
    border: 1px dashed #d9d9d9;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    box-sizing: border-box;
    line-height: 120px;
    text-align: center;
  }
}
.lawArt {
  margin-top: 15px;
  padding: 20px;
  background: #fff;
  border-top: 1px solid #0ea5d5;
  .lawTitles {
    display: inline-block;
    width: 150px;
    height: 40px;
    background: linear-gradient(to right, #10a0d3, #1b79c3);
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    margin-right: 30px;
    color: #fff;
  }
  .lawUl {
    margin-top: 10px;
    margin-bottom: 20px;
    li {
      height: 50px;
      width: 100%;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      list-style: none;
    }
    li span:nth-of-type(1)::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #000;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .el-pagination {
    text-align: right;
  }
}
.el-select {
  width: 100%;
}
</style>
