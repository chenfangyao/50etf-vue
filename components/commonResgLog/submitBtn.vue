<template>
  <view :class="['btn',{verifyOk}]" hover-class='tap-hover' @tap='doWhat'>{{btnTxt}}</view>
</template>
<script>
export default {
  props:['btnTxt','verifyOk'],
  methods:{
    doWhat(){
        console.log('verifyOk',this.verifyOk)
      if(this.verifyOk){
        this.$emit('v-tap')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
view.btn {
  height: 96upx;
  background: rgba(24, 144, 255, .3);
  border-radius: 8upx;
  font-size: 18px;
  color: rgba(248, 247, 247, 1);
  line-height: 96upx;
  text-align: center;
  letter-spacing: 12upx;
  margin-bottom: 52upx;
}
view.btn.verifyOk{
  background: rgba(24, 144, 255, 1);

}
view.btn.tap-hover.verifyOk {
  background-color: darken(rgb(24, 144, 255), 5%);
}
</style>
