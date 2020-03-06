<template>
  <el-tabs class="law-body" type="card">
    <el-tab-pane label="群众批评意见">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
        <el-form-item label="反馈部门" prop="deptName">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
        <el-form-item label="反馈事项" prop="feeTitle">
          <el-input v-model="form.feeTitle"></el-input>
        </el-form-item>
        <el-form-item label="问题描述" prop="feeContent">
          <el-input type="textarea" v-model="form.feeContent"></el-input>
        </el-form-item>
        <el-form-item label="意见和建议" prop="feeSuggest">
          <el-input type="textarea" v-model="form.feeSuggest"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="反馈人">
              <el-input v-model="userInfo.userName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="personPhone">
              <el-input v-model="form.personPhone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="住所地">
          <el-row>
            <el-col :span="12">
              <area-list v-model="form.areaArray"></area-list>
            </el-col>
            <el-col :span="12">
              <el-input v-model="form.areaAddress"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import areaList from '@/components/areaList';
  export default {
    name: "feedback",
    components: {areaList},
    data() {
      return {
        userInfo: {},
        form: {
          token: '',
          feeModel: '3'
        },
        rules: {
          deptName: [
            {required: true, message: '请填写反馈部门', trigger: 'change'}
          ],
          feeTitle: [
            {required: true, message: '请填写事项', trigger: 'change'}
          ],
          feeContent: [
            {required: true, message: '请填写遇到的问题', trigger: 'change'}
          ],
          personPhone: [
            {required: true, message: '请填写手机号码', trigger: 'change'}
          ]
        },
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const areaArray = this.form.areaArray;
            let form = Object.assign({}, this.form);
            if (areaArray && areaArray.length) {
              form.areaCityId = areaArray[0];
              form.areaRegionId = areaArray[1];
              form.areaStreetId = areaArray[2];
            }
            this.$ajaxPost('/suggest/saveSuggestCriticism', form).then(({data}) => {
              if (data.code === 200) {
                this.form = {token: this.$store.getters.token, areaArray: []};
                this.$nextTick(() => {
                  this.$refs['form'].clearValidate();
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
      this.form.token = this.$Cookies.get('token');
      this.userInfo = this.$store.state.userInfo;
      this.form.personPhone = this.userInfo.mobilePhone;
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      });
    }
  }
</script>

<style lang="scss">

</style>
