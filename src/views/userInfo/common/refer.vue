<template>
  <div class="refer">
    <div class="referTop">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="问题类型">
              <el-select v-model="form.questionType" placeholder="请选择">
                <el-option
                  v-for="item in questionTypeList"
                  :key="item.dictDataCode"
                  :label="item.dictDataName"
                  :value="item.dictDataCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="form.consultStatus" placeholder="请选择">
                <el-option
                  v-for="item in consultStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1" class="referInput">
            <el-input placeholder="请输入" v-model="form.questionTitle"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button class="referBtn" @click="search">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="homeBox">
      <div class="homeAt">
        <span class="homeNear">免费咨询</span>
        <span class="homeAccout">
          共有：
          <span>{{pageform.total}}篇</span>
        </span>
      </div>
      <ul class="referUl">
        <li v-for="(item,index) in list" :class="{cursor: [2, 3].includes(item.consultStatus)}" :key="index" @click="referConsultClick(item.consultId,item.consultStatus)">
          <span>{{item.questionTitle}}</span>
          <span class="time">{{item.createTime}}</span>

          <span class="type" :class="item.consultStatus==4?'active':''">{{type(item.consultStatus)}}</span>
        </li>
      </ul>
      <div class="footPage">
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
  </div>
</template>

<script>
export default {
  name: "refer",
  data() {
    return {
      form: {
        questionType: "",
        questionTitle: "",
        consultStatus: ''
      },
      total: 0,
      questionTypeList: [],
      list: [],
      consultStatus: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "待确认",
          value: "1"
        },
        {
          label: "解答中",
          value: "2"
        },
        {
          label: "待评价",
          value: "3"
        },
        {
          label: "已完结",
          value: "4"
        },
        {
          label: "律师拒绝",
          value: "5"
        },
        {
          label: "系统拒绝",
          value: "6"
        }
      ],
      page: {
        pageSize: 10,
        pageNum: 1
      },
      pageform: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    };
  },
  mounted() {
    this.getDictionaryList("wentileixing", "questionTypeList", true);
    this.getOwnerConsultList();
  },
  methods: {
    search() {},
    handleSizeChange(val) {
      this.pageform.pageNum = val;
      this.getOwnerConsultList();
    },
    handleCurrentChange(val) {
      this.pageform.pageNum = val;
      this.getOwnerConsultList();
    },
    getOwnerConsultList() {
      let obj = {
        token: this.$store.state.token,
        consultType: "1",
        ...this.form,
        consultStatus: "",
        createTime: "", //类型：String  可有字段  备注：咨询时间 格式yyyy-MM-dd
        pageNum:this.pageform.pageNum,
        pageSize:this.pageform.pageSize,
      };
      this.$ajaxPost("/consult/getOwnerConsultList", obj).then(res => {
        console.log(res);
        this.list = res.data.content.dataList;
        this.pageform.total = res.data.content.pageInfo.total;
      });
    },
    referConsultClick(id, status){
      if ([2, 3].includes(status)) this.$router.push({path:'/user/consult',query:{id, status, isPay: false}})
    },
    type(n) {
      switch (n) {
        case 1:
          return "待确认";
        case 2:
          return "解答中";
        case 3:
          return "待评价";
        case 4:
          return "已完结";
        case 5:
          return "律师拒绝";
        case 6:
          return "系统拒绝";
      }
    },
    getDictionaryList(dictCode, typeName, flag) {
      this.$ajaxPost("/support/getDictionaryList", {
        dictCode,
        userId: "1"
      }).then(({ data }) => {
        if (data.code == 200) {
          const defaultArr = flag
            ? [{ dictDataCode: "", dictDataName: "全部" }]
            : [];
          this[typeName] = defaultArr.concat(data.content.resultList);
        }
      });
    }
  }
};
</script>

<style lang="scss" scope>
.footPage {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: right;
}
.refer {
  margin-left: 20px;
  .referTop {
    background: #fff;
    .el-form {
      padding-top: 20px;
    }
    .referInput {
      .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0;
      }
    }

    .referBtn {
      background: linear-gradient(to right, #10a1d4, #1b7bc3);
      color: #fff;
      border-radius: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      width: 100px;
    }
  }
}
.homeBox {
  background: #fff;
  border-top: 1px solid #1787c8;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px;
  .homeAt {
    width: 100%;
    background: #fff;
    .homeNear {
      display: inline-block;
      width: 120px;
      height: 44px;
      background: linear-gradient(to right, #10a1d4, #1b7bc3);
      color: #fff;
      font-size: 16px;
      line-height: 44px;
      text-align: center;
      margin-right: 20px;
    }
  }
  .referUl {
    margin-top: 20px;
    li {
      height: 44px;
      line-height: 44px;
      overflow: hidden;
      border-bottom: 1px dashed #ccc;
      box-sizing: border-box;
      // padding-right: 20px;
      .type {
        float: right;
        margin-right: 200px;
        color: #ff9900;
      }
      .active {
        color: #999;
      }
      .time {
        float: right;
        color: #999;
      }
    }
    li:before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #000;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
</style>
