<template>
<view>

  <view class="uni-flex container">
    <view>总计：{{total}}笔</view>
    <image class="right" @tap="showDatepick" src='/static/mineImg/datePicker.png' />
  </view>
  <date-pick v-if="showPick" @select-complete='getTime'></date-pick>

</view>
</template>
<script>
import datePick from '@/components/datePick.vue'

export default {
  components: { datePick },
  props:['total'],
  data() {
    return {
      showPick: false
    }
  },
  methods: {
    showDatepick() {
      this.showPick = true
    },
    getTime(times) {
      console.log(times);
    }
  }
}
</script>
<style lang='scss' scoped>
view.container {
  justify-content: space-between;
  padding: 0 24upx;
  font-size: 14px;
  height: 88upx;
  color: rgba(153, 153, 153, 1);
  align-items: center;
  image {
    width: 45upx;
    height: 45upx;
  }
}
</style>
