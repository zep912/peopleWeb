<template>
  <div class="jud">
    <div class="jud-box">
      <el-form label-width="80px" :model="form">
        <el-row>
          <el-col :span="9">
            <el-form-item label="课件类型:">
              <el-select v-model="form.couType" placeholder="请选择">
                <el-option
                  v-for="item in videoOrWordList"
                  :key="item.id"
                  :label="item.dictDataName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="知识范围:">
              <el-select v-model="form.knowledgeScope" placeholder="请选择">
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
              <el-select v-model="form.contentType" placeholder="请选择">
                <el-option
                  v-for="item in contentTypeList"
                  :key="item.id"
                  :label="item.dictDataName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="课件名称:">
              <el-input v-model="form.couName" placeholder="输入查找的关键字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button @click="search" class="search">搜索</el-button>
      </el-form>
    </div>
    <div class="jud-play">
      <div class="jud-drop">
        <div>
          <el-dropdown @command="handCommand">
            <span class="el-dropdown-link">
              播放量
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">由低到高</el-dropdown-item>
              <el-dropdown-item command="2">由高到低</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown @command="handDateCommand">
            <span class="el-dropdown-link">
              日期
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">由低到高</el-dropdown-item>
              <el-dropdown-item command="2">由高到低</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="jud-total">
        <div>
          <span>共计:</span>
          <span>{{pageform.total}}个</span>
        </div>
        <div class="jud-imgs">
          <span class="jud-img1" @click="tabListChange">
            <img :src="img1" alt v-show="imgShow" />
            <img :src="img3" alt v-show="!imgShow" />
          </span>
          <span class="jud-img2" @click="tabListChange">
            <img :src="img2" alt v-show="imgShow" />
            <img :src="img4" alt v-show="!imgShow" />
          </span>
        </div>
      </div>
    </div>
    <ul class="judicial-ul">
      <li
        v-for="(item,index) in list"
        :key="index"
        ref="judLi"
        :class="imgShow?'':'lump'"
        @click="toVideo(item.planId)"
      >
        <img :src="item.couCover?item.couCover:''" alt />
        <div class="judi-cours">
          <p>
            <span v-show="imgShow">课件标题:</span>
            <span>{{item.couName}}</span>
          </p>

          <div class="judic-info" v-show="imgShow">
            <span>课件简介:</span>
            <span>{{item.cusDesc}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div style="text-align:right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageform.pageNum"
        :page-size="pageform.pageSize"
        layout="total, prev, pager, next"
        :total="pageform.total"
      >></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img1: require("../../assets/img/u2893.png"),
      img2: require("../../assets/img/u2896.png"),
      img3: require("../../assets/img/u2900.png"),
      img4: require("../../assets/img/u2903.png"),
      videoOrWordList: [],
      scopeList: [],
      contentTypeList: [],
      form: {
        couType: "",
        knowledgeScope: "",
        contentType: "",
        couName: "",
        orderModel: "",
        orderType: ""
      },
      imgShow: true,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10
      },
      pageform: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    };
  },
  created() {},
  mounted() {
    this.getData();
    this.initData();
  },
  methods: {
    handleSizeChange(val) {
      this.pageform.pageNum = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageform.pageNum = val;
      // this.active = this.proIndex
      this.getData();
    },
    handCommand(command) {
      this.form.orderModel = "1";
      this.form.orderType = command;
      this.getData();
    },
    handDateCommand(command) {
      this.form.orderModel = "2";
      this.form.orderType = command;
      this.getData();
    },
    tabListChange() {
      this.imgShow = !this.imgShow;
    },
    search() {
      this.getData();
    },
    initData() {
      let obj = {
        dictCode: "neirongfenlei",
        userId: "111",
        parentDictDataCode: ""
      };
      this.$ajaxPost("/support/getDictionaryList", obj).then(res => {
        this.contentTypeList = res.data.content.resultList;
      });
      let obj2 = {
        dictCode: "kejianleixing",
        userId: "111",
        parentDictDataCode: ""
      };
      this.$ajaxPost("/support/getDictionaryList", obj2).then(res => {
        this.videoOrWordList = res.data.content.resultList;
      });
      let obj3 = {
        dictCode: "zhishifanwei",
        userId: "111",
        parentDictDataCode: ""
      };
      this.$ajaxPost("/support/getDictionaryList", obj3).then(res => {
        this.scopeList = res.data.content.resultList;
      });
      console.log(this.scopeList, 111);
    },
    getData() {
      let obj = {
        ...this.form,
        ...this.page
      };
      this.$ajaxPost("/train/getPublicTrainList", obj).then(res => {
        console.log(res, 111);
        this.list = res.data.content.dataList

      });
    },
    toVideo(id) {
      console.log(id);
      this.$router.push({ path: "/propaganda/video", query: { id: id } });
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
    .jud-imgs {
      .jud-img1,
      .jud-img2 {
        display: inline-block;
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        padding: 5px;
        border: 1px solid #ccc;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.judicial-ul {
  margin-top: 20px;
  overflow: hidden;
  .lump {
    width: 32%;
    float: left;
    background: #fff;
    padding: 0;
    padding-bottom: 10px;
    border-top: 0;
    border-bottom:0;
    overflow: hidden;
    padding-top: 10px;
    .judi-cours {
      margin-left: 0;
    }
  }
  .lump:nth-of-type(3n-1) {
    margin-right: 2%;
    margin-left: 2%;
  }
  li {
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 10px 15px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .judi-cours {
    float: left;
    margin-left: 20px;
    p span:nth-of-type(2) {
      font-weight: 600;
      margin-left: 10px;
    }
  }
  .judic-info {
    margin-top: 10px;
    span:nth-of-type(2) {
      margin-left: 10px;
    }
  }
}
.judicial-ul li img {
  width: 150px;
  height: 150px;
  float: left;
}
.judicial-ul .lump img {
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
  float: initial;
  margin-bottom: 10px;
  // float: left;
}
</style>