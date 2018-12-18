<template>
    <view class="btn bigBtn" hover-class='self-hover' @tap="handleTap">{{txt}}</view>
  
</template>
<script>
export default {
  props:['txt'],
  methods:{
    handleTap(){
      this.$emit('v-tap')
    }
  }
}
</script>

<style lang="scss" scoped>
view.btn {
  height: 98upx;
  margin: 0 22upx;
  background: rgba(64, 157, 229, 1) !important;
  border-radius: 10upx;
  font-size: 32upx;
  color: rgba(255, 255, 255, 1);
  line-height: 98upx;
  text-align: center;
}
view.btn.bigBtn {
  color: #ededed;
  border-radius: 4upx;
}
</style>
