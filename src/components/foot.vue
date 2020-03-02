<template>
<div class="footer">
  <div class="foot">
      <div class="footLeft">
          <ul>
              <li>网站地图</li>
              <li>网站声明</li>
              <li>联系我们</li>
          </ul>
          <p>All Rights Reserved Copyright 2005-2018 辽阳市司法局 版权所有</p>
          <p>辽ICP 备12011155号-1</p>
      </div>
      <div class="footRight">
          <img src="/assets/img/982.png" alt="">
          <img src="assets/img/983.png" alt="">
      </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.footer{
    width: 100%;
    background: #fff
}
.foot{
    width: 85%;
    margin: 0 auto;
    margin-top: 10px;
    overflow: hidden;
    padding-top: 20px;
    padding-bottom: 10px;
    .footLeft{
        float: left;
        ul{
            overflow: hidden;
            margin-bottom: 8px;
            li{
                float: left;
            }
            li:nth-of-type(2):before,li:nth-of-type(2)::after{
                content:'';
                width: 1px;
                height: 14px;
                display: inline-block;
                background: #ccc;
                margin-right: 20px;
                margin-left: 20px;
            }
        }
        p{
            font-size: 14px;
            color: #999
        }
        p:nth-of-type(1){
            margin-bottom: 8px;
        }
    }
}
</style>