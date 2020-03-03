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
                  :key="item.id"
                  :label="item.dictDataName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="知识范围:">
              <el-select v-model="form.value2" placeholder="请选择">
                <el-option
                  v-for="item in scopeList"
                  :key="item.id"
                  :label="item.dictDataName"
                  :value="item.id"
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
                  :key="item.id"
                  :label="item.dictDataName"
                  :value="item.id"
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
              <el-dropdown-item>由低到高</el-dropdown-item>
              <el-dropdown-item>由高到低</el-dropdown-item>
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
        <div class="jud-imgs">
            <span class="jud-img1"  @click="tabListChange">
                <img :src="img1" alt="" v-show='imgShow'>
                <img :src="img3" alt="" v-show='!imgShow'>
            </span>
            <span class="jud-img2"  @click="tabListChange">
                <img :src="img2" alt=""  v-show='imgShow'>
                <img :src="img4" alt=""  v-show='!imgShow'>
            </span>
        </div>
      </div>
    </div>
    <ul class="judicial-ul">
      <li v-for="(item,index) in list" :key="index" ref='judLi' :class='imgShow?"":"lump"'>
        <img :src="item.img" alt />
        <div class="judi-cours">
            <p>
              <span  v-show='imgShow'>课件标题:</span>
              <span>{{item.title}}</span>
            </p>

          <div class='judic-info'  v-show='imgShow'>
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
        img1:require('../../assets/img/u2893.png'),
        img2:require('../../assets/img/u2896.png'),
        img3:require('../../assets/img/u2900.png'),
        img4:require('../../assets/img/u2903.png'),
      options: [],
      scopeList: [],
      content: [],
      form: {
        value1: "",
        value2: "",
        value3: ""
      },
      imgShow:true,
      num: 10000,
      list: [
        {
          img:
            "http://59.44.27.201:8888/group1/M00/00/70/wKgAaF41W06APFbDAA5Ar5VE-d0142.jpg    ",
          title: "施工安全生产责任和安全生产教育培训制度",
          content: "XXXXX"
        },
        {
          img:
            "http://59.44.27.201:8888/group1/M00/00/70/wKgAaF41W06APFbDAA5Ar5VE-d0142.jpg    ",
          title: "施工安全生产责任和安全生产教育培训制度",
          content: "XXXXX"
        },
        {
          img:
            "http://59.44.27.201:8888/group1/M00/00/70/wKgAaF41W06APFbDAA5Ar5VE-d0142.jpg    ",
          title: "施工安全生产责任和安全生产教育培训制度",
          content: "XXXXX"
        },
        {
          img:
            "http://59.44.27.201:8888/group1/M00/00/70/wKgAaF41W06APFbDAA5Ar5VE-d0142.jpg    ",
          title: "施工安全生产责任和安全生产教育培训制度",
          content: "XXXXX"
        },
        {
          img:
            "http://59.44.27.201:8888/group1/M00/00/70/wKgAaF41W06APFbDAA5Ar5VE-d0142.jpg    ",
          title: "施工安全生产责任和安全生产教育培训制度",
          content: "XXXXX"
        }
      ],
      page: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {},
  mounted() {
    this.getData();
    this.initData()
  },
  methods: {
      tabListChange(){
          this.imgShow = !this.imgShow
      },
    search() {},
    initData(){
        let obj = {
            dictCode:'neirongfenlei',
            userId:'111',
            parentDictDataCode:''
        }
        this.$ajaxPost('/support/getDictionaryList',obj).then(res=>{
            this.content = res.data.content.resultList
        })
        let obj2 = {
            dictCode:'kejianleixing',
            userId:'111',
            parentDictDataCode:''
        }
        this.$ajaxPost('/support/getDictionaryList',obj2).then(res=>{
            this.options = res.data.content.resultList
        })
        let obj3 = {
            dictCode:'zhishifanwei',
            userId:'111',
            parentDictDataCode:''
        }
        this.$ajaxPost('/support/getDictionaryList',obj3).then(res=>{
            this.scopeList = res.data.content.resultList
        })
        console.log(this.scopeList,111)
    },
    getData() {
      let obj = {
        token: "64d1d05f5ccb4670a6d342f3b3c002ce", //类型：String  可有字段  备注：token 用户身份标识
        couType: this.form.value1, //类型：String  可有字段  备注：课件类型 1：视频；2：文档；
        knowledgeScope: this.form.value2, //类型：String  可有字段  备注：知识范围
        contentType: this.form.value3, //类型：String  可有字段  备注：内容分类
        couName: this.form.name, //类型：String  可有字段  备注：课件名称
        orderModel: "1", //类型：String  可有字段  备注：排序方式 1：播放量；2：时间
        orderType: "1", //类型：String  可有字段  备注：排序类型 1：由高到低；2：由低到高；
        ...this.page
      };
      this.$ajaxPost("/train/getPublicTrainList", obj).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang='scss' scope>
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
    .jud-imgs{
        .jud-img1,.jud-img2{
            display: inline-block;
            width: 25px;
            height: 25px;
            box-sizing: border-box;
            padding: 5px;
            border: 1px solid #ccc;
            text-align: center;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
  }
}
.judicial-ul{
    margin-top: 20px;
    .lump{
        width: 32%;
        float: left;
        background: inherit;
        padding: 0;
        .judi-cours{
            margin-left: 0;
        }
    }
    .lump:nth-of-type(3n-1){
        margin-right: 2%;
        margin-left:2%;
        
    }
    li{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding: 10px 15px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    .judi-cours{
        float: left;
        margin-left: 20px;
        p span:nth-of-type(2){
            font-weight: 600;
            margin-left: 10px;
        }

    }
    .judic-info{
        margin-top: 10px;
        span:nth-of-type(2){
            margin-left: 10px;
        }
    }
}
.judicial-ul li img {
    width: 250px;
    height: 150px;
    float: left;
  }
</style>