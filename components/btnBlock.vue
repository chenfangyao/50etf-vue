<template>
  <view class=" bigBtn" hover-class='active' @tap="handleTap">{{txt}}</view>

</template>
<script>
export default {
  props: ['txt'],
  methods: {
    handleTap() {
      this.$emit('v-tap')
    }
  }
}
</script>

<style lang="scss" scoped>
view.bigBtn {
  height: 98upx;
  margin: 0 22upx;
  background: rgba(64, 157, 229, 1);
  border-radius: 10upx;
  font-size: 32upx;
  color: rgba(255, 255, 255, 1);
  line-height: 98upx;
  text-align: center;
}
view.bigBtn.active {
  background: darken(rgba(64, 157, 229, 1), 5%);
}
</style>
