<template>
  <div class="self-mask" v-if="showMine">
    <div class="popParent black1">
      <div class="close"><img src="../../assets/indexTabImg/close.png" v-vtap="{method:close}"></div>
      <div class="logoimg">
        <img src="../../assets/indexTabImg/notice.png">
      </div>
      <div class="title textc1">{{noticObj.title}}</div>
      <div class="content textc2" v-html="noticObj.content"></div>
      <div class="button" v-vtap="{method:go}">更多详情</div>
    </div>
  </div>
</template>
<script>
export default {
  props: { noticObj: { default() { return [] } } },
  data(){return{
    showMine:false,
  }},
  watch:{
    noticObj(val){
     this.showMine= val?true:false
    }
  },
  methods:{
    close(){
      this.$emit('show-again')
    },
    go(){
      this.showMine=false
      this.$navigateTo({
        query:{id:this.noticObj.id, pop:true},
        url: '/pages/index_sub/new_xiang_qing/new_xiang_qing'
      });
    }
    
  }
}
</script>
<style lang="scss" scoped>
div.popParent {
  background-color: #fff;
  position: absolute;
  left: 1.13rem;
  right: 1.13rem;
  top: 50%;
  transform: translateY(-50%);
  div.close {
    height: 0.27rem;
    margin-top: 0.21rem;
    padding-right: 0.21rem;
    img {
      float: right;
      width: 0.27rem;
      height: 0.27rem;
    }
  }
  div.logoimg {
    text-align: center;
    img {
      width: 2.16rem;
      height: 2.13rem;
    }
  }
  div.title {
    font-size: 15px;
    font-weight: bold;
    color: #333;
    width: 3.58rem;
    line-height: 17px;
    margin: 0 auto;
    text-align: center;
    text-overflow: ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  div.content {
    width: 4.7rem;
    margin: 0.28rem auto 0;
    // padding-bottom: 15px;
    overflow: hidden;
    height: 1.44rem;
  }
  div.button {
    text-align: center;
    background-color: #00a0ff;
    color: #fff;
    font-size: 15px;
    height: 0.86rem;
    line-height: 0.86rem;
    margin-top: 10px;
  }
}
</style>
