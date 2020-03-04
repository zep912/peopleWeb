<template>
  <div class="refer">
    <div class="referTop">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="问题类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1" class="referInput">
            <el-input placeholder="请输入" style="width:220px"></el-input>
            <el-button class="referBtn">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="homeBox">
      <div class="homeAt">
        <span class="homeNear">针对性咨询</span>
        <span class="homeAccout">
          共有：
          <span>{{num}}篇</span>
        </span>
      </div>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <span>{{item.title}}</span>
          <span class="time">{{item.time}}</span>

          <span class="type" :class="item.type==1?'active':''">{{type(item.type)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "refer",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: "",
      num: 11111,
      list: [
        {
          title: "123",
          time: "2020-01-01",
          type: 1
        },
        {
          title: "123",
          time: "2020-01-01",
          type: 2
        },
        {
          title: "123",
          time: "2020-01-01",
          type: 3
        },
        {
          title: "123",
          time: "2020-01-01",
          type: 4
        }
      ]
    };
  },
  methods: {
    type(n) {
      switch (n) {
        case 1:
          return "已完结";
        case 2:
          return "待响应";
        case 3:
          return "解答中";
        case 4:
          return "待评价";
      }
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
  ul {
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
