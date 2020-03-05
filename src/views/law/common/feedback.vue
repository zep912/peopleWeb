<template>
  <el-tabs class="law-body" type="card">
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
</template>

<script>
  export default {
    name: "feedback",
    data() {
      return {
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
      }
    }
  }
</script>

<style lang="scss">

</style>
