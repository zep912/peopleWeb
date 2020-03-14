<template>
  <div class="info">
    <span class="title">个人信息</span>
    <el-button @click="isMod = true" v-if="!isMod">修改</el-button>
    <el-form label-width="80px" v-if="!isMod">
      <el-form-item label='群众姓名:'>{{form.personName}}</el-form-item>
      <el-form-item label='身份证号:'>{{form.idNumber}}</el-form-item>
      <el-form-item label='手机号码:'>{{form.cellphone}}</el-form-item>
      <el-form-item label='性别:'>{{form.sexDesc}}</el-form-item>
      <el-form-item label='出生日期:'>{{form.birthday}}</el-form-item>
      <el-form-item label='所属地区:'>{{form.addressDetail}}</el-form-item>
    </el-form>
    <el-form label-width="100px" ref="form" class="mod-form" v-show="isMod" :model="form" :rules="rules">
      <el-form-item label='群众姓名:' prop="personName">
        <el-input v-model="form.personName"></el-input>
      </el-form-item>
      <el-form-item label='身份证号:' prop="idNumber">
        <el-input v-model="form.idNumber"></el-input>
      </el-form-item>
      <el-form-item label='手机号码:' prop="cellphone">
        <el-input v-model="form.cellphone"></el-input>
      </el-form-item>
      <el-form-item label='性别:' prop="sexDesc">
        <el-input v-model="form.sexDesc"></el-input>
      </el-form-item>
      <el-form-item label='出生日期:' prop="birthday">
        <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label='所属地区:' prop="areaPositionId">
            <el-select v-model="form.areaPositionId" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in areaRegionList" :key="item.areaId"
                         :label="item.areaName"
                         :value="item.areaId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="not-label" prop="areaAddress">
            <el-input v-model="form.areaAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="isMod = false">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "info",
    data() {
      return {
        isMod: false,
        form:{
          personName:'',
          idNumber:'',
          cellphone:'',
          sexDesc:'',
          birthday:'',
          addressDetail:''
        },
        rules: {
          personName: [
            {required: true, message: '请填写群众姓名', trigger: 'change'}
          ],
          idNumber: [
            {required: true, message: '请填写身份证号码', trigger: 'change'}
          ],
          cellphone: [
            {required: true, message: '请填写手机号码', trigger: 'change'}
          ],
          sexDesc: [
            {required: true, message: '请填写性别', trigger: 'change'}
          ],
          birthday: [
            {required: true, message: '请选择出生日期', trigger: 'change'}
          ],
          areaPositionId: [
            {required: true, message: '请选择所属地区', trigger: 'change'}
          ],
          areaAddress: [
            {required: true, message: '请填写详细地址', trigger: 'change'}
          ]
        },
        areaRegionList: []
      }
    },
    mounted(){
      this.getAreaList();
      this.getUserInfo();
    },
    methods: {
      getUserInfo(){
        this.$ajaxPost('/citizen/getCitizenInfo',{'token':this.$store.state.token}).then(res=>{
          this.form = res.data.content;
        })
      },
      getAreaList() {
        this.$ajaxPost('/support/getAreaList', {areaLevel: '3'}).then(({data}) => {
          if (data.code === 200) {
            this.areaRegionList = data.content.dataList.reduce((res, item) => {
              if (!res.some(val => val.areaId === item.areaId)) {
                item.leaf = item.areaLevel === '4';
                res.push(item)
              }
              return res;
            }, []);
          }
        })
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.psersonName = this.form.personName;
            this.$ajaxPost('/citizen/saveCitizenInfo', Object.assign({token: this.$store.state.token}, this.form)).then(({data}) => {
              if (data.code == 200) {
                this.$message.success('保存成功');
                this.isMod = false;
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .info {
    width: 100%;
    background: #fff;
    border-top: 1px solid #1787c8;
    box-sizing: border-box;
    margin-left: 20px;
    padding: 20px;
    .title {
      display: inline-block;
      width: 120px;
      height: 44px;
      background: linear-gradient(to right, #10a1d4, #1b7bc3);
      color: #fff;
      font-size: 16px;
      line-height: 44px;
      text-align: center;
    }
    .el-form{
      margin-top: 20px;
      .el-form-item{
        margin-bottom: 0;
      }
      .btn-box {
        text-align: center;
      }
      &.mod-form {
        .el-form-item {
          margin-bottom: 20px;
          &.not-label {
            .el-form-item__content {
              margin-left: 0!important;
            }
          }
        }
      }
    }
    > .el-button--default {
      float: right;
    }
  }
</style>
