<template>
  <div class="a1" @click.self="closeMe">
    <div :class="{show}" >
      <img src="../../../assets/assetsImg/help2.png" v-if="imgI" >
      <img src="../../../assets/assetsImg/help1.png" v-else  >
      <div class="closeIcom" @click="closeMe">
        <img src="../../../assets/holdingImg/popClose.png" >
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props:['imgI'],
  data(){
    return{
      show:false
    }
  },
  created() {
    setTimeout(
      () => { this.show = true }, 10
    )
  },
  methods:{
    closeMe(){
      this.$emit('close-me')
    }
  }
}
</script>
<style lang='scss' scoped>
div.a1{
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  >div{
    transform: scale(0, 0);
    transition: transform 300ms;
    text-align: center;
    position: absolute;
    left: 0.58rem;
    right: 0.58rem;
    top:0.64rem;
    div.closeIcom{
      margin-top: 0.3rem;
      img{
        width: 0.72rem;
        height: 0.72rem;
      }
    }
  }
  >div.show{
    transform: scale(1, 1);
  }
}
img{
  width:100%;
}
</style>
