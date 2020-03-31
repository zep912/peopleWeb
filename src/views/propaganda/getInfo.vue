<template>
  <div class="getInfo">
      <iframe :src="src" frameborder="0" width="100%" height="100%" scrolling='auto'></iframe>
  </div>
</template>

<script>
export default {
    data(){
        return{
            id:'',
            src:''
        }   
    },
    created(){

    },
    mounted(){
        this.id = this.$router.currentRoute.query.id;
        this.getData()
    },
    methods:{
        // 详情，返回值是html网页，放置在iframe框架才能浏览
        getData(){
            let obj = {
                lawId:this.id
            }
            this.$ajaxPost('/doc/lawRegulations/getLawRegulationsDetail',obj).then(res=>{
                console.log(res)
                this.src = res.data.content.docUrl
            })
        }
    }
}
</script>

<style>
.getInfo{
    width: 85%;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    padding-top: 30px 40px;
    height: 800px;
}
</style>