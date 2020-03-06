<template>
  <div class="mailbox">

    <div class="mailForm">
       <div class="mail-box">
      <span>局长信箱</span>
    </div>
      <el-form label-width="80px" :model="form" :rules="rules" ref="form">
        <el-form-item label="问题类型" prop="feeType">
          <el-radio-group v-model="form.feeType">
            <el-radio v-for="item in feeTypeList" :key="item.dictDataCode" :label="item.dictDataCode">{{item.dictDataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题" prop="feeTitle">
          <el-input v-model="form.feeTitle"></el-input>
        </el-form-item>
        <el-form-item label="内容描述" prop="feeContent">
          <el-input v-model="form.feeContent" type="textarea" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="上传照片">
          <el-upload
            class="avatar-uploader"
            :data="{token: form.token}" :show-file-list="false"
            action="http://59.44.27.201:9010/jjkj/sfj/api/support/uploadFileToLocal"
            :on-success="uploadSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-col :span="9">
            <el-form-item label="发信人">
              <el-input v-model="userInfo.userName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item label="手机号码">
              <el-input v-model="userInfo.mobilePhone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="住所地">
          <el-row>
            <el-col :span="8">
              <area-list v-model="form.areaArray"></area-list>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-input placeholder="请输入" v-model="form.areaAddress"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmit">发送</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import areaList from '@/components/areaList';
export default {
  components: {areaList},
  data() {
    return {
      userInfo: {},
      feeTypeList: [],
      form: {
        token: '',
        feeTitle: "",
        feeType: "",
        feeContent: "",
        feeModel: '2',
        areaArray: []
      },
      rules: {
        feeTitle: [
          {required: true, message: '请填写标题', trigger: 'change'}
        ],
        feeType: [
          {required: true, message: '请选择问题类型', trigger: 'change'}
        ],
        feeContent: [
          {required: true, message: '请填写内容描述', trigger: 'change'}
        ],
      },
      imageUrl: "",
    };
  },
  mounted() {
    this.form.token = this.$store.getters.token;
    this.userInfo = this.$store.state.userInfo;
    this.getDictionaryList();
  },
  methods: {
    uploadSuccess(res, file) {
      if (res.code === 200) {
        this.form.fileList = res.content.fileList.map(item => item.fileId);
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
    beforeAvatarUpload(file) {
      const isImg = file.type.indexOf("image/") > -1;
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (!isImg) {
        this.$message.error("只能上传照片", 3000);
      }
      if (!isLt100M) {
        this.$message.error("上传头像图片大小不能超过 100MB!", 3000);
      }
      return isImg && isLt100M;
    },
    getDictionaryList() {
      this.$ajaxPost('/support/getDictionaryList', {dictCode: 'fankuileixing', userId: '1'}).then(({data}) => {
        if (data.code == 200) {
          this.feeTypeList = data.content.resultList;
        }
      })
    },
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
          this.$ajaxPost('/suggest/saveSuggestForDirector', form).then(({data}) => {
            if (data.code === 200) {
              this.form = {token: this.$store.getters.token, areaArray: []};
              this.imageUrl = "";
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
  }
};
</script>

<style lang='scss'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.mailbox {
  width: 85%;
  margin: 0 auto;
  .mailForm {
    background: #fff;
    padding: 20px;
    .el-form-item__label {
      text-align-last: justify;
      text-align: justify;
    }
  }
}
.mail-box {
  text-align: left;
  margin-bottom: 20px;
  span {
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background: #1980c6;
    box-sizing: border-box;
    color: #fff;
  }
}
</style>
