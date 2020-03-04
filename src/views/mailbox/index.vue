<template>
  <div class="mailbox">
   
    <div class="mailForm">
       <div class="mail-box">
      <span>局长信箱</span>
    </div>
      <el-form label-width="80px" :model="form">
        <el-form-item label="问题类型:">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">意见建议</el-radio>
            <el-radio :label="2">反映情况</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容描述:">
          <el-input v-model="form.title" type="textarea" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="上传照片:">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发信人:" style="width:80%">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码:" style="width:80%">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>
        <el-form-item label="住所地:">
          <el-row>
            <el-col :span="4">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" style='margin-left:10px;margin-right:10px'>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" style='margin-right:10px'>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

            </el-col>
                          <el-col :span="7">
                <el-input placeholder="请输入"></el-input>
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
export default {
  data() {
    return {
      form: {
        name: "",
        sex: "",
        title: ""
      },
      imageUrl: "",
      options:[],
      value:''
    };
  },
  mounted() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onSubmit() {}
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