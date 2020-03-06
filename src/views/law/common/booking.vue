<template>
  <el-tabs class="law-body" type="card">
    <el-tab-pane label="法律援助预约">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人" prop="questionTitle">
              <el-input v-model="form.questionTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="applyPhone">
              <el-input v-model="form.applyPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="住所地" prop="areaStreetId">
              <el-row>
                <el-col :span="8">
                  <el-select v-model="form.areaCityId" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="form.areaRegionId" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="form.areaStreetId" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详情地址" prop="areaAddress">
              <el-input v-model="form.areaAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事件类别" prop="matterType">
              <el-radio-group v-model="form.matterType">
                <el-radio label="离婚" name="1"></el-radio>
                <el-radio label="交通事故" name="2"></el-radio>
                <el-radio label="刑事辩护" name="3"></el-radio>
                <el-radio label="婚姻家庭" name="4"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="受援人类别" prop="identityTypeList">
              <el-checkbox-group v-model="form.identityTypeList">
                <el-checkbox label="离婚" name="1"></el-checkbox>
                <el-checkbox label="交通事故" name="2"></el-checkbox>
                <el-checkbox label="刑事辩护" name="3"></el-checkbox>
                <el-checkbox label="婚姻家庭" name="4"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="经济困难情形" prop="difficultyType">
              <el-radio-group v-model="form.difficultyType">
                <el-radio label="离婚" name="1"></el-radio>
                <el-radio label="交通事故" name="2"></el-radio>
                <el-radio label="刑事辩护" name="3"></el-radio>
                <el-radio label="婚姻家庭" name="4"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="案情及申请理由" prop="applyReason">
              <el-input type="textarea" v-model="form.applyReason"></el-input>
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
              <el-radio-group v-model="form.acceptance">
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
</template>

<script>
  export default {
    name: "booking",
    data() {
      return {
        form: {
          identityTypeList: []
        },
        params: {
          pageNum: 1,
          pageSize: 4,
          total: 0
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
        imageUrl: '',
        appointment: {},
      }
    },
    methods: {
      // getMediateCommitteeList() {
      //   this.$ajaxPost('/lawOrg/getMediateCommitteeList', this.params).then(({data}) => {
      //     if (data.code === 200) {
      //       console.log(data);
      //     }
      //   })
      // },
      // getAppointmentTime() {
      //   this.$ajaxPost('/appointment/getAppointmentTime', this.appointment).then(({data}) => {
      //     if (data.code === 200) {
      //       console.log(data);
      //     }
      //   })
      // }
    }
  }
</script>

<style scoped>

</style>
