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
        <img src="../../assets/svg/sfks.svg" alt="">
        <div>司法考试</div>
      </div>
      <div class="law-content" :class="{active: active === 4}" @click="active = 4">
        <img src="../../assets/svg/qzyj.svg" alt="">
        <div>群众批评意见</div>
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
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="form.desc"></el-input>
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
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="form.desc"></el-input>
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
      <el-tab-pane label="人民调解预约">
        针对性咨询
      </el-tab-pane>
    </el-tabs>
    <el-tabs class="law-body" type="card" v-if="active === 3">
      <el-tab-pane label="群众批评意见">
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
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="form.desc"></el-input>
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
    </el-tabs>
    <el-tabs class="law-body" type="card" v-if="active === 4">
      <el-tab-pane label="考试动态">
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
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="form.desc"></el-input>
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
    </el-tabs>
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
      rules: {
        questionTitle: [
          {required: true, message: '请输入标题', trigger: 'change'}
        ],
        consultType: [
          {required: true, message: '请选择咨询类型', trigger: 'change'}
        ],
        questionDesc: [
          {required: true, message: '请输入问题描述', trigger: 'change'}
        ]
      },
      imageUrl: ''
    }
  }
}
</script>

<style scoped lang="scss">
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
        margin: 0;
      }
    .el-tabs__item {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 700;
        &.is-active {
          color: #fff;
          background: #409EFF;
        }
      }
  }
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
