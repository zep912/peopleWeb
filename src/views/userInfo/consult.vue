<template>
  <div class="userConsult">
    <div class="consultHead">
      <div class="stepTitle">
        <span>[免费咨询]</span>
        <span>[律师解答]</span>
        <span>[服务评价]</span>
      </div>
      <el-steps :active="2" align-center :space='200'>
        <el-step title="张三" description="2020-01-01 10:10"></el-step>
        <el-step title="李晓航律师" description="2020-01-01 10:10"></el-step>
        <el-step title="张三" description="2020-01-01 10:10"></el-step>
        <div style=""></div>
      </el-steps>
    </div>
    <div class="userConsultContent">
      <div class="freeConsult consultBox">
        <h3>免费咨询</h3>
        <div class="freeBox borderTop">
          <el-form :model="form" label-width="80px">
            <el-row>
              <el-form-item label="标题:">{{form.title}}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="问题类型">{{form.type}}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="问题描述">
                <el-input teyp="textara" :rows="10" v-model="form.content"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名:">{{form.name}}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item lable="手机号码:">{{form.mobile}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="住址:">{{form.address}}</el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="照片:">
                <img :src="form.img" alt />
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </div>
      <!-- 律师解答 -->
      <div class="lawerAnswer consultBox">
        <h3>律师解答</h3>
        <div class="lawerAnwserBox borderTop">
          <el-form label-width="80px">
            <el-form-item label="审核结果:">{{form.result}}</el-form-item>
            <el-form-item label="律师解答:">
              <el-input type="textarea" v-model="form.lawerAnwer" :rows="10"></el-input>
            </el-form-item>
            <ul>
              <li v-for="(item,index) in lawerList" :key="index">
                <el-form>
                  <el-form-item :label="item.title">{{item.content}}</el-form-item>
                </el-form>
              </li>
            </ul>
            <el-input
              type="textarea"
              :rows="6"
              v-model="form.lawerContent"
              style="margin-left:80px;width:80%"
            ></el-input>
          </el-form>
        </div>
      </div>
      <!-- 服务评价 -->
      <div class="evaluate consultBox">
        <h3>服务评价</h3>
        <div class="borderTop consultEva">
          <el-form label-width="80px">
            <el-form-item label="满意度:">
              <el-radio-group v-model="radio">
                <el-radio :label="1">非常满意</el-radio>
                <el-radio :label="2">满意</el-radio>
                <el-radio :label="3">一般</el-radio>
                <el-radio :label="4">不满意</el-radio>
                <el-radio :label="5">非常不满意</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="意见建议:">
              <el-input type="textarea" :rows="6" v-model="proposal"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="consultBtn">
      <el-button class="question">追问律师</el-button>
      <el-button class="save">提交</el-button>
      <el-button class="quit">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        type: "",
        content: "",
        name: "",
        mobile: "",
        address: ""
      },
      radio: 1,
      proposal: "",
      lawerList: []
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang='scss'>
.consultHead{
  background: #fff;
  text-align: left;
  padding-top: 20px;
  padding-bottom: 10px;
  overflow: hidden;
  .stepTitle{
    width: 600px;
    display: flex;
    justify-content: space-between;
    span{
      width: 200px;
      display: inline-block;
      text-align: center;
    }
  }
  .el-steps{
    margin-top: 20px;
    position: relative;
    // float: left;
  }
  .el-step__icon:nth-of-type(1)::before{
    width: 5%;
    height: 1px;
    background: #ccc;
    display: inline-block;
    vertical-align: middle;
  }
}
.consultBtn {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
  .el-button {
    width: 120px;
    height: 44px;
  }
  .question {
    background: #33cc66;
    color: #fff;
  }
  .save {
    background: linear-gradient(to right, #009ccc, #0071cc);
    color: #fff;
  }
}
.userConsult {
  width: 85%;
  margin: 0 auto;
}
.userConsultContent {
  overflow-y: auto;
  h3 {
    width: 220px;
    height: 44px;
    background: linear-gradient(to right, #00a0cc, #006dcc);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
    color: #fff;
  }
  .freeConsult {
    box-sizing: box-sizing;
  }
  .borderTop {
    border-top: 1px solid #006dcc;
    background: #fff;
    padding: 20px;
    padding-right: 50px;
    padding-left: 30px;
    box-sizing: border-box;
  }
  .consultBox {
    margin-top: 20px;
    box-sizing: border-box;
  }
}
</style>