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
        console.log(this.$router.currentRoute.query.id)
        this.id = this.$router.currentRoute.query.id;
        this.getData()
    },
    methods:{
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