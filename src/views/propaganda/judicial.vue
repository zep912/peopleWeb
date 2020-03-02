<template>
  <div class="jud">
    <div class="jud-box">
      <el-form label-width="80px" :model="form">
        <el-row>
          <el-col :span="9">
            <el-form-item label="课件类型:">
              <el-select v-model="form.value1" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="知识范围:">
              <el-select v-model="form.value2" placeholder="请选择">
                <el-option
                  v-for="item in scopeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="内容分类:">
              <el-select v-model="form.value3" placeholder="请选择">
                <el-option
                  v-for="item in content"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="课件名称:">
              <el-input v-model="form.name" placeholder="输入查找的关键字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button @click="search" class="search">搜索</el-button>
      </el-form>
    </div>
    <div class="jud-play">
      <div class="jud-drop">
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              播放量
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              日期
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="jud-total">
        <div>
          <span>共计:</span>
          <span>{{num}}个</span>
        </div>
        <div>
          <el-button-group>
            <el-button type="primary" icon="el-icon-s-fold" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-menu" size="mini"></el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <img :src="item.img" alt />
        <div>
          <h3>{{item.title}}</h3>
          <div>
            <span>课件简介:</span>
            <span>{{item.content}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "视频"
        },
        {
          value: "2",
          label: "文档"
        }
      ],
      scopeList: [
        {
          value: "全部",
          label: "司法解释"
        }
      ],
      content: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "刑法",
          label: "刑法"
        },
        {
          value: "三国",
          label: "三国"
        },
        {
          value: "民法",
          label: "民法"
        },
        {
          value: "行政",
          label: "行政"
        },
        {
          value: "刑诉",
          label: "刑诉"
        },
        {
          value: "商经",
          label: "商经"
        },
        {
          value: "理论",
          label: "理论"
        },
        {
          value: "民诉",
          label: "民诉"
        }
      ],
      form: {
        value1: "",
        value2: "",
        value3:''
      },
      num: 10000,
      list: [
        {
          img: "~/assets/img/u2937.png",
          title: "施工安全生产责任和安全生产教育培训制度",
          content: "XXXXX"
        }
      ],
      page:{
         pageNum:1,
        pageSize:10
      }
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    search() {},
    getData() {
      let obj = {
        token: "64d1d05f5ccb4670a6d342f3b3c002ce", //类型：String  可有字段  备注：token 用户身份标识
        couType: this.form.value1, //类型：String  可有字段  备注：课件类型 1：视频；2：文档；
        knowledgeScope:this.form.value2, //类型：String  可有字段  备注：知识范围
        contentType: this.form.value3, //类型：String  可有字段  备注：内容分类
        couName:this.form.name, //类型：String  可有字段  备注：课件名称
        orderModel: "1", //类型：String  可有字段  备注：排序方式 1：播放量；2：时间
        orderType: "1", //类型：String  可有字段  备注：排序类型 1：由高到低；2：由低到高；
        ...this.page
      };
      this.$ajaxPost('/train/getPublicTrainList',obj).then((res)=>{
          console.log(res)
      })
    }
  }
};
</script>

<style lang='scss'>
.jud-box {
  border: 1px solid #1491cd;
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
  position: relative;
  .el-row:nth-of-type(2) {
    margin-top: 20px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .search {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 100px;
    height: 100px;
    background: #168aca;
    color: #fff;
    font-size: 16px;
    text-align: center;
    border-radius: 5px;
  }
}
.jud {
  margin-left: 30px;
}
.jud-play {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .jud-drop {
    display: flex;
    justify-content: flex-start;
    div:nth-of-type(1) {
      margin-right: 10px;
    }
  }
  .jud-total {
    display: flex;
    justify-content: flex-end;
    div:nth-of-type(1) {
      margin-right: 10px;
    }
  }
}
</style>