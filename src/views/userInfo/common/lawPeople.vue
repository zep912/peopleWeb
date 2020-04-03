<template>
  <div class="refer">
    <div class="referTop">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="纠纷种类">
              <el-select v-model="form.matterType" placeholder="请选择">
                <el-option
                  v-for="item in resultList"
                  :key="item.dictDataCode"
                  :label="item.dictDataName"
                  :value="item.dictDataCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="状态">
              <el-select v-model="form.applyStatus" placeholder="请选择">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1" class="referInput">
            <el-input placeholder="请输入" style="flex: 1" v-model="form.questionTitle"></el-input>
            <el-button class="referBtn">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="homeBox">
      <div class="homeAt">
        <span class="homeNear">人民调解预约</span>
        <span class="homeAccout">
          共有：
          <span>{{pageform.total}}篇</span>
        </span>
      </div>
      <ul class="homeUl">
        <li v-for="(item,index) in list" :key="index" @click="lawClick(item.applyId)">
          <span class="title">{{item.disputeDetail}}</span>
          <span class="time">{{item.appointmentDate}}</span>
          <span class="type" :class="item.applyStatus=='2'?'active':''">{{type(item.applyStatus)}}</span>
        </li>
      </ul>
      <div style="text-align:right;margin-top:20px">
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
        matterType: "",
        applyStatus: "",
        questionTitle: ""
      },
      statusList: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "待响应",
          value: "1"
        },
        {
          label: "预约成功",
          value: "2"
        },
        {
          label: "预约失败",
          value: "3"
        }
      ],
      resultList: [],
      value: "",
      list: [],
      pageform: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
    };
  },
  mounted() {
    this.getDict(true);
    this.getData();
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
    type(n) {
      switch (n) {
        case 1:
          return "待响应";
        case 2:
          return "预约成功";
        case 3:
          return "预约失败";
      }
    },
    getDict(flag) {
      let obj = {
        dictCode: "jiufenleixing",
        parentDictDataCode: "",
        userId: "111"
      };
      this.$ajaxPost("/support/getDictionaryList", obj).then(res => {
        const defaultArr = flag ? [{ dictDataCode: "", dictDataName: "全部" }] : [];
        this.resultList = defaultArr.concat(res.data.content.resultList);
      });
    },
    getData() {
      let obj = {
        token: this.$store.state.token,
        applyDate: "",
        applyStartDate: "",
        applyEndDate: "",
        ...this.form,
        ...this.page
      };
      this.$ajaxPost("/appointment/getOwnerMediateList", obj).then(res => {
        this.list = res.data.content.dataList;
        this.pageform.total = res.data.content.pageInfo.total;
      });
    },
    lawClick(id){
      this.$router.push({path:'/user/lawConsult',query:{applyId:id,title:'人民调解预约'}})
    }
  }
};
</script>

<style lang="scss">
.refer {
  margin-left: 20px;
  .referTop {
    background: #fff;
    .el-form {
      padding-top: 20px;
    }
    .referInput {
      display: flex;
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
  .homeUl {
    margin-top: 20px;
    li {
      height: 44px;
      line-height: 44px;
      overflow: hidden;
      border-bottom: 1px dashed #ccc;
      box-sizing: border-box;
      cursor: pointer;
      // padding-right: 20px;
      .title {
        color: #10a1d4;
        text-decoration: underline;
      }
      .type {
        float: right;
        margin-right: 200px;
        color: #ff9900;
      }
      .active {
        color: rgba(21, 207, 21);
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
